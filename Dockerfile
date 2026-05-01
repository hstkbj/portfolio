FROM php:8.2-fpm-alpine AS base

# Dépendances système + extensions PHP
RUN apk add --no-cache nginx curl zip unzip git nodejs npm \
    libpng-dev libjpeg-turbo-dev freetype-dev libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql zip gd

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copier les fichiers
COPY . .

# Build Vue.js
RUN npm install && npm run build

# Installer les dépendances PHP
RUN composer install --optimize-autoloader --no-dev

# Permissions storage
RUN mkdir -p storage/framework/sessions \
    storage/framework/cache \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Config Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["sh", "-c", "\
    mkdir -p /tmp/portfolio-storage/framework/sessions \
    /tmp/portfolio-storage/framework/cache \
    /tmp/portfolio-storage/framework/views \
    /tmp/portfolio-storage/logs \
    && chmod -R 777 /tmp/portfolio-storage \
    && ln -sfn /tmp/portfolio-storage storage \
    && php artisan config:clear \
    && php artisan config:cache \
    && php artisan migrate --force \
    && php-fpm -D \
    && nginx -g 'daemon off;'"]
