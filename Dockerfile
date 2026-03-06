# Étape 1 : Utiliser une image officielle PHP avec CLI et extensions nécessaires
FROM php:8.2-cli

# Installer des dépendances système pour Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    zip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# Installer Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Définir le dossier de travail
WORKDIR /app

# Copier tous les fichiers du projet (sans node_modules ni build)
COPY . .

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Donner les permissions correctes pour Laravel
RUN chmod -R 775 storage bootstrap/cache

# Exposer le port que Laravel utilise
EXPOSE 10000

# Commande de démarrage du serveur Laravel
CMD php artisan migrate --force && php artisan db:seed --force && php artisan serve --host=0.0.0.0 --port=10000