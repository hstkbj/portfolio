<template>
  <section id="hero" class="hero section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row gy-4 align-items-center">
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="hero-content">
            <h1 data-aos="fade-up" data-aos-delay="200">
              Bonjour, je suis <span class="highlight">Holmes SOHE</span>
            </h1>
            <h2 data-aos="fade-up" data-aos-delay="300">
              <span
                class="typed"
                data-typed-items="Developpeur web full-stack,Concepteur SaaS avec Laravel et Vue.js"
              >
                Developpeur web full-stack
              </span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="400">
              Je conçois des applications web et SaaS fiables, securisees et performantes,
              avec une approche orientee resultat et experience utilisateur.
            </p>
            <div class="hero-actions" data-aos="fade-up" data-aos-delay="500">
              <a href="#portfolio" class="btn btn-primary">Voir mon portfolio</a>
              <a href="#contact" class="btn btn-outline">Me contacter</a>
            </div>
            <div class="social-links" data-aos="fade-up" data-aos-delay="600">
              <a href="https://www.linkedin.com/in/holmes-sohe-86753b260" target="_blank"><i class="bi bi-linkedin"></i></a>
              <a href="https://github.com/Marcssarutobi" target="_blank"><i class="bi bi-github"></i></a>
              <a href="https://www.facebook.com/profile.php?id=61580410003642" target="_blank"><i class="bi bi-facebook"></i></a>
            </div>
          </div>
        </div>

        <div class="col-lg-6 order-1 order-lg-2">
          <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
            <div class="image-wrapper">
              <img src="assets/img/profile/profile.jpg" alt="Holmes SOHE" class="img-fluid">
              <div class="floating-elements">
                <div class="floating-card design" data-aos="fade-left" data-aos-delay="700">
                  <i class="bi bi-palette"></i>
                  <span>Design</span>
                </div>
                <div class="floating-card code" data-aos="fade-right" data-aos-delay="800">
                  <i class="bi bi-code-slash"></i>
                  <span>Code</span>
                </div>
                <div class="floating-card creativity" data-aos="fade-up" data-aos-delay="900">
                  <i class="bi bi-lightbulb"></i>
                  <span>Idees</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr>

  <section id="about" class="about section">
    <div class="container section-title" data-aos="fade-up">
      <h2>A propos</h2>
      <p>Construire des solutions numeriques fiables, utiles et durables.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row align-items-center justify-content-between gy-5 mb-5">
        <div class="col-lg-7" data-aos="fade-right" data-aos-delay="150">
          <div class="intro-content">
            <span class="eyebrow">Bonjour</span>
            <h2 class="headline">
              Je transforme des besoins metier en experiences web fluides, simples a utiliser et solides techniquement.
            </h2>
            <p class="lead">
              Specialise en Laravel et Vue.js, je developpe des interfaces modernes et des API robustes
              pour accompagner la croissance des entreprises.
            </p>
            <p>
              Mon objectif est de livrer des produits qui restent maintenables dans le temps,
              sans sacrifier la performance ni la clarte de l'experience utilisateur.
            </p>

            <div class="cta-group">
              <a href="#portfolio" class="btn-ghost">
                Voir mon portfolio <i class="bi bi-eye"></i>
              </a>
              <a href="https://comeup.com/fr/@holmessohe" target="_blank" class="btn-ghost">
                Service ComeUp <i class="bi bi-globe2"></i>
              </a>
              <a href="assets/doc/TKBJ011-SOHE.HSO_20230501.pdf" target="_blank" download class="link-underline">
                Telecharger mon CV <i class="bi bi-download"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="col-lg-5" data-aos="zoom-in" data-aos-delay="250">
          <figure class="profile-figure text-center text-lg-end">
            <img src="assets/img/profile/profile.jpg" alt="Portrait de Holmes SOHE" class="img-fluid profile-photo">
          </figure>
        </div>
      </div>
    </div>
  </section>

  <hr>

  <section id="services" class="services section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>Des solutions sur mesure pour accelerer vos projets web, SaaS et API.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row justify-content-center g-5">
        <div v-for="service in services" :key="service.title" class="col-md-6" :data-aos="service.aos" :data-aos-delay="service.delay">
          <div class="service-item">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <div class="service-content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <a @click.prevent="selectService(service.title)" class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <hr>

  <section id="portfolio" class="portfolio section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Decouvrez quelques realisations recentes en developpement web et mobile.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
        <LoadingState v-if="isLoadingPortfolio" label="Chargement des derniers projets..." />

        <div v-else-if="portfolioError" class="empty-state-card text-center">
          <h4>Impossible de charger le portfolio</h4>
          <p class="text-muted mb-3">{{ portfolioError }}</p>
          <button class="btn btn-outline-primary" @click="loadLatestPortfolios">Reessayer</button>
        </div>

        <div v-else-if="porfolio.length" class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
          <div v-for="project in porfolio" :key="project.id" class="col-lg-4 col-md-6 portfolio-item isotope-item filter-strategy">
            <div class="portfolio-card">
              <div class="portfolio-img">
                <img :src="project.image_path" style="min-height: 277px;" :alt="project.title" class="img-fluid">
                <div class="portfolio-overlay">
                  <RouterLink :to="'/projectDetail/' + project.slug"><i class="bi bi-eye"></i></RouterLink>
                  <a :href="project.link" target="_blank" class="portfolio-details-link"><i class="bi bi-link-45deg"></i></a>
                </div>
              </div>
              <div class="portfolio-info">
                <RouterLink :to="'/projectDetail/' + project.slug">
                  <h4>{{ project.title }}</h4>
                </RouterLink>
                <p class="text-justify">{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state-card text-center">
          <h4>Aucun projet disponible</h4>
          <p class="text-muted mb-0">Ajoutez un portfolio depuis l'administration pour l'afficher ici.</p>
        </div>
      </div>

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="400">
        <RouterLink to="/portfolio" class="btn btn-primary">
          Voir plus <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <hr>

  <section id="contact" class="contact section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Parlons de votre projet et trouvons une solution adaptee a vos objectifs.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="row g-4 g-lg-5">
        <div class="col-lg-5">
          <div class="info-box" data-aos="fade-up" data-aos-delay="200">
            <h3>Informations de contact</h3>
            <p>Vous trouverez ici toutes les informations utiles pour me joindre rapidement.</p>

            <div class="info-item" data-aos="fade-up" data-aos-delay="300">
              <div class="icon-box">
                <i class="bi bi-geo-alt"></i>
              </div>
              <div class="content">
                <h4>Localisation</h4>
                <p>Cotonou, Benin</p>
              </div>
            </div>

            <div class="info-item" data-aos="fade-up" data-aos-delay="400">
              <div class="icon-box">
                <i class="bi bi-telephone"></i>
              </div>
              <div class="content">
                <h4>Numero de telephone</h4>
                <p>+229 019 667 5942</p>
                <p>+229 014 071 9329</p>
              </div>
            </div>

            <div class="info-item" data-aos="fade-up" data-aos-delay="500">
              <div class="icon-box">
                <i class="bi bi-envelope"></i>
              </div>
              <div class="content">
                <h4>Adresse e-mail</h4>
                <p><a href="mailto:soheholmes7@gmail.com">soheholmes7@gmail.com</a></p>
                <p><a href="mailto:holmes.sohe@outlook.com">holmes.sohe@outlook.com</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="contact-form" data-aos="fade-up" data-aos-delay="300">
            <h3>Restons en contact</h3>
            <p>Remplissez le formulaire ci-dessous et je vous repondrai avec une proposition adaptee.</p>

            <form @submit.prevent="submitContactForm" class="php-email-form" data-aos="fade-up" data-aos-delay="200">
              <div class="row gy-4">
                <div class="col-md-6">
                  <input v-model="data.name" type="text" name="name" class="form-control" placeholder="Votre nom" required>
                </div>

                <div class="col-md-6">
                  <input v-model="data.email" type="email" class="form-control" name="email" placeholder="Votre e-mail" required>
                </div>

                <div class="col-md-6">
                  <input v-model="data.subject" type="text" class="form-control" name="subject" placeholder="Sujet" required>
                </div>

                <div class="col-md-6">
                  <input
                    v-model="data.phone"
                    type="text"
                    class="form-control"
                    name="phone"
                    placeholder="+229 XX XX XX XX XX"
                    required
                    @input="onlyNumbers"
                  >
                </div>

                <div class="col-12">
                  <textarea
                    v-model="data.message"
                    class="form-control"
                    name="message"
                    maxlength="1500"
                    rows="6"
                    placeholder="Message"
                    required
                  ></textarea>
                  <div class="text-end mt-1">
                    <span class="text-white">{{ data.message.length }}/1500</span>
                  </div>
                </div>

                <div class="col-12 text-center">
                  <div class="error-message"></div>
                  <div class="sent-message">Votre message a ete envoye. Merci !</div>

                  <div v-if="alertMsg" class="alert" :class="alertType" role="alert">
                    {{ alertMsg }}
                  </div>

                  <div v-if="isSubmittingContact" class="loading"></div>
                  <button type="submit" class="btn btn-primary" :disabled="isSubmittingContact">
                    {{ isSubmittingContact ? 'Chargement...' : 'Envoyer le message' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { LatestPortFolio } from '../../adminPage/api/portfolioapi';
import { ThemeMain } from '../../plugins/themeMain';
import { AddContactMessage } from '../../adminPage/api/contact';
import LoadingState from '../../shared/LoadingState.vue';

const services = [
  {
    title: "Developpement d'applications web",
    description: "Conception d'applications web sur mesure, performantes et adaptees a vos processus.",
    icon: 'bi bi-code-slash',
    aos: 'fade-right',
    delay: '100',
  },
  {
    title: 'Creation de solutions SaaS',
    description: 'Developpement de plateformes SaaS evolutives et pensees pour le multi-utilisateur.',
    icon: 'bi bi-cloud',
    aos: 'fade-left',
    delay: '100',
  },
  {
    title: "Developpement d'API REST",
    description: 'Mise en place d’API securisees pour connecter vos applications et services tiers.',
    icon: 'bi bi-plug',
    aos: 'fade-right',
    delay: '200',
  },
  {
    title: "Developpement d'applications mobiles",
    description: 'Creation d’applications mobiles modernes connectees a des services web robustes.',
    icon: 'bi bi-phone',
    aos: 'fade-left',
    delay: '200',
  },
  {
    title: 'Interfaces modernes avec Vue.js',
    description: 'Des interfaces dynamiques, fluides et intuitives pour une meilleure experience utilisateur.',
    icon: 'bi bi-layers',
    aos: 'fade-right',
    delay: '300',
  },
  {
    title: 'Automatisation et outils metier',
    description: 'Automatisation des processus repetitifs et mise en place d’outils utiles au quotidien.',
    icon: 'bi bi-gear-wide-connected',
    aos: 'fade-left',
    delay: '300',
  },
];

const porfolio = ref([]);
const isLoadingPortfolio = ref(true);
const portfolioError = ref('');

const data = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
});

const isSubmittingContact = ref(false);
const alertMsg = ref('');
const alertType = ref('');

async function loadLatestPortfolios() {
  try {
    isLoadingPortfolio.value = true;
    portfolioError.value = '';
    porfolio.value = await LatestPortFolio();
    await nextTick();
    ThemeMain();
  } catch (error) {
    porfolio.value = [];
    portfolioError.value = "Les projets n'ont pas pu etre charges pour le moment.";
  } finally {
    isLoadingPortfolio.value = false;
  }
}

function onlyNumbers(event) {
  event.target.value = event.target.value.replace(/\D+/g, '');
  data.value.phone = event.target.value;
}

async function submitContactForm() {
  const isComplete = Object.values(data.value).every((value) => String(value).trim().length > 0);

  if (!isComplete) {
    alertMsg.value = 'Veuillez remplir tous les champs du formulaire.';
    alertType.value = 'alert-danger';
    return;
  }

  try {
    isSubmittingContact.value = true;
    await AddContactMessage(data.value);

    data.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };

    alertMsg.value = 'Votre message a ete envoye. Merci !';
    alertType.value = 'alert-success';
  } catch (error) {
    alertMsg.value = "Une erreur s'est produite. Veuillez reessayer plus tard.";
    alertType.value = 'alert-danger';
  } finally {
    isSubmittingContact.value = false;
  }
}

function selectService(serviceName) {
  data.value.subject = `Demande de service : ${serviceName}`;

  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }

  history.pushState(null, null, '#contact');
}

onMounted(() => {
  loadLatestPortfolios();

  const hash = window.location.hash;
  if (!hash.includes('contact')) {
    return;
  }

  const urlParams = new URLSearchParams(hash.split('?')[1]);
  const service = urlParams.get('service');

  if (!service) {
    return;
  }

  const serviceNames = {
    'developpement-applications-web': "Developpement d'applications web",
    'creation-solutions-saas': 'Creation de solutions SaaS',
    'developpement-api-rest': "Developpement d'API REST",
    'developpement-applications-mobiles': "Developpement d'applications mobiles",
    'interfaces-vuejs': 'Interfaces modernes avec Vue.js',
    'automatisation-outils-metier': 'Automatisation et outils metier',
  };

  const serviceName = serviceNames[service];
  if (!serviceName) {
    return;
  }

  data.value.subject = `Demande de service : ${serviceName}`;

  setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
});
</script>
