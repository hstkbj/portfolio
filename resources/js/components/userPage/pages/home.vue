<template>

  <!-- Hero Section -->
  <section id="hero" class="hero section">

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row gy-4 align-items-center">
        <div class="col-lg-6 order-2 order-lg-1">
          <div class="hero-content">
            <h1 data-aos="fade-up" data-aos-delay="200">Bonjour, je suis <span class="highlight">Holmes SOHE</span></h1>
            <h2 data-aos="fade-up" data-aos-delay="300">
              <span class="typed">Développeur web full-stack</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="400"> En tant que développeur web full-stack et concepteur de
              solutions SaaS spécialisé en Laravel et Vue.js, je développe des applications sécurisées et performantes
              adaptées aux besoins des entreprises.</p>
            <div class="hero-actions" data-aos="fade-up" data-aos-delay="500">
              <a href="#portfolio" class="btn btn-primary">Voir mon portfolio</a>
              <a href="#contact" class="btn btn-outline">Me contacter</a>
            </div>
            <div class="social-links" data-aos="fade-up" data-aos-delay="600">
              <a href="https://www.linkedin.com/in/holmes-sohe-86753b260" target="_blank"><i
                  class="fa-brands fa-linkedin-in"></i></a>
              <a href="https://github.com/Marcssarutobi" target="_blank"><i class="fa-brands fa-github"></i></a>
              <a href="https://www.facebook.com/profile.php?id=61580410003642" target="_blank"><i
                  class="fa-brands fa-facebook-f"></i></a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <div class="hero-image" data-aos="zoom-in" data-aos-delay="300">
            <div class="image-wrapper">
              <img src="assets/img/profile/profile.jpg" alt="Sarah Mitchell" class="img-fluid">
              <div class="floating-elements">
                <div class="floating-card design" data-aos="fade-left" data-aos-delay="700">
                  <i class="fa-regular fa-palette"></i>
                  <span>Design</span>
                </div>
                <div class="floating-card code" data-aos="fade-right" data-aos-delay="800">
                  <i class="fa-regular fa-code"></i>
                  <span>Code</span>
                </div>
                <div class="floating-card creativity" data-aos="fade-up" data-aos-delay="900">
                  <i class="fa-regular fa-lightbulb"></i>
                  <span>Idées</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section><!-- /Hero Section -->
  <hr>
  <!-- About Section -->
  <section id="about" class="about section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>À propos</h2>
      <p>Construire des solutions numériques fiables conçues pour durer.</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <!-- Intro + Photo -->
      <div class="row align-items-center justify-content-between gy-5 mb-5">
        <div class="col-lg-7" data-aos="fade-right" data-aos-delay="150">
          <div class="intro-content">
            <span class="eyebrow">Bonjour</span>
            <h2 class="headline">Salut, je suis Holmes, développeur web passionné par la création d'expériences
              numériques simples, fluides et efficaces.</h2>
            <p class="lead">
              J'aime concevoir des applications qui combinent performance, sécurité et élégance, tout en restant
              focalisé sur les besoins réels des utilisateurs.
            </p>
            <p>
              Spécialisé en Laravel et Vue.js, je travaille sur des projets web et SaaS en mettant l'accent sur la
              qualité du code, l'architecture et l'expérience utilisateur. Mon objectif : transformer les idées en
              solutions numériques fiables et durables.
            </p>

            <div class="cta-group">
              <a href="#portfolio" class="btn-ghost">
                Voir mon portfolio <i class="fa-regular fa-arrow-up-right"></i>
              </a>
              <a href="assets/doc/TKBJ011-SOHE.HSO_20230501.pdf" target="_blank" download class="link-underline">
                Télécharger mon CV <i class="fa-regular fa-download"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="col-lg-5" data-aos="zoom-in" data-aos-delay="250">
          <figure class="profile-figure text-center text-lg-end">
            <img src="assets/img/profile/profile.jpg" alt="Portrait of Alex" class="img-fluid profile-photo">
          </figure>
        </div>
      </div>
      <!-- End Intro + Photo -->

    </div>

  </section><!-- /About Section -->

  <hr>

  <!-- Services Section -->
  <section id="services" class="services section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Services</h2>
      <p>Solutions numériques personnalisées conçues pour répondre aux besoins réels des entreprises et soutenir leur
        croissance.</p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row justify-content-center g-5">

        <div class="col-md-6" data-aos="fade-right" data-aos-delay="100">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-code"></i>
            </div>
            <div class="service-content">
              <h3>Développement d'applications web</h3>
              <p>Conception d'applications web personnalisées et haute performance adaptées aux besoins des entreprises.
              </p>
              <a @click.prevent="selectService('Développement d\'applications web')" class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

        <div class="col-md-6" data-aos="fade-left" data-aos-delay="100">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-cloud"></i>
            </div>
            <div class="service-content">
              <h3>Création de solutions SaaS</h3>
              <p>Développement de plates-formes SaaS complètes et évolutives conçues pour la gestion multi-utilisateurs.
              </p>
              <a @click.prevent="selectService('Création de solutions SaaS')" class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

        <div class="col-md-6" data-aos="fade-right" data-aos-delay="200">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-plug"></i>
            </div>
            <div class="service-content">
              <h3>Développement d'API REST</h3>
              <p>Création d'API sécurisées pour connecter les applications, les services tiers et les interfaces
                modernes.</p>
              <a @click.prevent="selectService('Développement d\'API REST')"  class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

        <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-mobile-screen"></i>
            </div>
            <div class="service-content">
              <h3>Développement d'applications mobiles</h3>
              <p>Création d'applications mobiles modernes et haute performance connectées à des API sécurisées.</p>
              <a @click.prevent="selectService('Développement d\'applications mobiles')" class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

        <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-layer-group"></i>
            </div>
            <div class="service-content">
              <h3>Interfaces modernes avec Vue.js</h3>
              <p>Création d'interfaces dynamiques, fluides et intuitives pour une expérience utilisateur optimale.</p>
              <a @click.prevent="selectService('Interfaces modernes avec Vue.js')" class="service-link cursor-pointer">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

        <div class="col-md-6" data-aos="fade-left" data-aos-delay="200">
          <div class="service-item">
            <div class="service-icon">
              <i class="fa-solid fa-gears"></i>
            </div>
            <div class="service-content">
              <h3>Automatisation et outils métier</h3>
              <p>Implémentation d'outils et processus automatisés pour simplifier et accélérer les tâches métier.</p>
              <a href="service-details.html" class="service-link">
                <span>Soumettre une demande</span>
                <i class="fa-regular fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div><!-- End Service Item -->

      </div>

    </div>

  </section><!-- /Services Section -->

  <hr>

  <!-- Portfolio Section -->
  <section id="portfolio" class="portfolio section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Découvrez mes projets récents de développement web et mobile, combinant performance, design et technologies
        modernes.
      </p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
        

        <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
          <div v-for="(prf,index) in porfolio" :key="index" class="col-lg-4 col-md-6 portfolio-item isotope-item filter-strategy">
            <div class="portfolio-card">
              <div class="portfolio-img">
                <img :src="prf.image_path" style="min-height: 277px;" alt="Portfolio Item" class="img-fluid">
                <div class="portfolio-overlay">
                  <RouterLink :to="'/projectDetail/' + prf.slug" class=""><i class="fa-regular fa-eye"></i></RouterLink>
                  <a :href="prf.link" target="_blank" class="portfolio-details-link"><i
                      class="fa-regular fa-link"></i></a>
                </div>
              </div>
              <div class="portfolio-info">
                <RouterLink :to="'/projectDetail/' + prf.slug">
                  <h4>{{ prf.title }}</h4>
                </RouterLink>
                <p class="text-justify">{{ prf.description }}</p>
              </div>
            </div>
          </div>
        </div><!-- End Portfolio Items Container -->

      </div>

      <div class="text-center mt-5" data-aos="fade-up" data-aos-delay="400">
        <RouterLink to="/portfolio" class="btn btn-primary">Voir plus <i class="fas fa-arrow-right"></i></RouterLink>
      </div>

    </div>

  </section><!-- /Portfolio Section -->

  <hr>

  <!-- Contact Section -->
  <section id="contact" class="contact section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Contact</h2>
      <p>Avez-vous un projet ou une idée ? Discutons-en et trouvons la solution qui correspond le mieux à vos besoins.
      </p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="row g-4 g-lg-5">
        <div class="col-lg-5">
          <div class="info-box" data-aos="fade-up" data-aos-delay="200">
            <h3>Informations de contact</h3>
            <p>Vous trouverez ici toutes les informations dont vous avez besoin pour me contacter rapidement et
              facilement.</p>

            <div class="info-item" data-aos="fade-up" data-aos-delay="300">
              <div class="icon-box">
                <i class="fa-regular fa-location-dot"></i>
              </div>
              <div class="content">
                <h4>Localisation</h4>
                <p>Cotonou, Bénin</p>
              </div>
            </div>

            <div class="info-item" data-aos="fade-up" data-aos-delay="400">
              <div class="icon-box">
                <i class="fa-regular fa-phone"></i>
              </div>
              <div class="content">
                <h4>Numéro de téléphone</h4>
                <p>+229 019 667 5942</p>
                <p>+229 014 071 9329</p>
              </div>
            </div>

            <div class="info-item" data-aos="fade-up" data-aos-delay="500">
              <div class="icon-box">
                <i class="fa-regular fa-envelope"></i>
              </div>
              <div class="content">
                <h4>Adresse e-mail</h4>
                <p><a href="mailto:soheholmes7@gmail.com" class="__cf_email__"
                    data-cfemail="e980878f86a98c91888499858cc78a8684">soheholmes7@gmail.com</a></p>
                <p><a href="mailto:holmes.sohe@outlook.com" class="__cf_email__"
                    data-cfemail="ef8c80819b8e8c9baf8a978e829f838ac18c8082">holmes.sohe@outlook.com</a></p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-7">
          <div class="contact-form" data-aos="fade-up" data-aos-delay="300">
            <h3>Restez en contact</h3>
            <p>Veuillez remplir le formulaire ci-dessous et je vous répondrai dès que possible avec une solution
              adaptée.</p>

            <form @submit.prevent="AddContactFunction" class="php-email-form" data-aos="fade-up"
              data-aos-delay="200">
              <div class="row gy-4">

                <div class="col-md-6">
                  <input type="text" v-model="data.name"  name="name" class="form-control" placeholder="Votre nom" required="">
                </div>

                <div class="col-md-6 ">
                  <input type="email" v-model="data.email" class="form-control" name="email" placeholder="Votre e-mail" required="">
                </div>

                <div class="col-md-6">
                  <input type="text" v-model="data.subject" class="form-control" name="subject" placeholder="Sujet" required="">
                </div>
                <div class="col-md-6">
                  <input type="text" v-model="data.phone" @input="onlyNumbers" class="form-control" name="phone" placeholder="+229 XX XX XX XX XX" required="">
                </div>

                <div class="col-12">
                  <textarea class="form-control" v-model="data.message" name="message" maxlength="1500" rows="6" placeholder="Message" required=""></textarea>
                  <div class="text-end mt-1">
                    <span class=" text-white">{{ data.message.length }}/1500</span>
                  </div>
                </div>

                <div class="col-12 text-center">
                  <div class="error-message"></div>
                  <div class="sent-message">Votre message a été envoyé. Merci !</div>

                  <div v-if="alertMsg" class="alert" :class="alertType" role="alert">
                    {{ alertMsg }}
                  </div>
                  
                  <div v-if="isLoader" class="loading"></div>
                  <button  type="submit" class="btn btn-primary" :disabled="isLoader">
                    {{ isLoader ? 'Chargement...' : 'Envoyer le message' }} 
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>

      </div>

    </div>

  </section><!-- /Contact Section -->

</template>

<script setup>

import { computed, nextTick, onMounted, ref } from 'vue';
import { LatestPortFolio } from '../../adminPage/api/portfolioapi';
import { ThemeMain } from '../../plugins/themeMain'
import { AddContactMessage } from '../../adminPage/api/contact';

const porfolio = ref([]);

const data = ref({
  name:'',
  email:'',
  phone:'',
  subject:'',
  message:''
})

const isEmpty = ref({})
const msgInput = ref({})
const isLoader = ref(false)
const alertMsg = ref('')
const alertType = ref('')

async function LatestFunction() {
  porfolio.value= await LatestPortFolio()
  await nextTick(); // attendre que le DOM se mette à jour
  ThemeMain();
}

function onlyNumbers(e) {
    e.target.value = e.target.value.replace(/\D+/g, '')
    data.value.phone = e.target.value
}

async function AddContactFunction() {
  for (const field in data.value) {
      isEmpty.value[field] = !data.value[field]
      msgInput.value[field] = `Veuillez remplir ce champs`;
  }

  const allEmpty = Object.values(isEmpty.value).every(value => value === false)

  if (allEmpty){
    isLoader.value = true
    await AddContactMessage(data.value).then(()=>{
      isLoader.value = false
      for (const field in data.value) {
        data.value[field] = ''
      }
      alertMsg.value = 'Votre message a été envoyé. Merci !'
      alertType.value = 'alert-success'
    }).catch(err => {
        isLoader.value = false
        alertMsg.value = "Une erreur s'est produite. Veuillez réessayer plus tard."
        alertType.value = 'alert-danger'
    }).finally(() => {
        isLoader.value = false
    })
  }
}

// 🔥 Fonction pour sélectionner un service
const selectService = (serviceName) => {
  data.value.subject = `Demande de service : ${serviceName}`
  
  // Scroll vers la section contact
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Mise à jour de l'URL
  history.pushState(null, null, '#contact')
}


onMounted(() => {
  LatestFunction();

  const hash = window.location.hash
  if (hash.includes('contact')) {
    const urlParams = new URLSearchParams(hash.split('?')[1])
    const service = urlParams.get('service')
    
    if (service) {
      const serviceNames = {
        'developpement-applications-web': 'Développement d\'applications web',
        'creation-solutions-saas': 'Création de solutions SaaS',
        'developpement-api-rest': 'Développement d\'API REST',
        'developpement-applications-mobiles': 'Développement d\'applications mobiles',
        'interfaces-vuejs': 'Interfaces modernes avec Vue.js',
        'automatisation-outils-metier': 'Automatisation et outils métier'
      }
      
      const serviceName = serviceNames[service]
      if (serviceName) {
        data.value.subject = `Demande de service : ${serviceName}`
        
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

});



</script>

<style></style>