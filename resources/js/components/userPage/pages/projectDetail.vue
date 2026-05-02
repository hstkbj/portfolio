<template>
  <section id="portfolio-details" class="portfolio-details section">
    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <LoadingState v-if="loading" label="Chargement du projet..." />

      <template v-else-if="project">
        <div class="row gy-4">
          <div class="col-lg-8">
            <div class="portfolio-details-img">
              <img :src="project.image_path" :alt="project.title" class="img-fluid">
            </div>
          </div>

          <div class="col-lg-4" data-aos="fade-up">
            <div class="portfolio-details-content">
              <h3>{{ project.title }}</h3>
              <p class="portfolio-description">{{ project.description }}</p>

              <div v-if="project.link" class="portfolio-meta">
                <div class="meta-item">
                  <h5>Lien</h5>
                  <a :href="project.link" target="_blank" class="btn btn-primary btn-sm mt-2">
                    <i class="bi bi-box-arrow-up-right"></i> Visiter le projet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-5">
          <div class="col-lg-12" data-aos="fade-up">
            <div class="portfolio-content">
              <h4>Details du projet</h4>
              <div v-html="project.content" class="project-content"></div>
            </div>
          </div>
        </div>

        <div class="row mt-5 pt-5 border-top">
          <div class="col-12">
            <nav class="portfolio-nav">
              <RouterLink to="/portfolio" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left"></i> Retour au portfolio
              </RouterLink>
            </nav>
          </div>
        </div>
      </template>

      <div v-else class="empty-state-card text-center">
        <h3>Projet non trouve</h3>
        <p class="text-muted mb-3">Le projet demande est introuvable ou n'est plus disponible.</p>
        <RouterLink to="/portfolio" class="btn btn-primary">
          Retour au portfolio
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { SinglePortfolioSlug } from '../../adminPage/api/portfolioapi';
import { ThemeMain } from '../../plugins/themeMain';
import LoadingState from '../../shared/LoadingState.vue';

const route = useRoute();
const project = ref(null);
const loading = ref(true);

async function loadProject() {
  try {
    loading.value = true;
    const slug = route.params.slug;
    project.value = await SinglePortfolioSlug(slug);
    await nextTick();
    ThemeMain();
  } catch (error) {
    project.value = null;
  } finally {
    loading.value = false;
  }
}

watch(() => route.params.slug, loadProject);

onMounted(() => {
  loadProject();
});
</script>

<style>
.portfolio-details-img {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.portfolio-details-img img {
  width: 100%;
  height: auto;
  display: block;
}

.portfolio-details-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 30px !important;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.portfolio-details-content h3 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.portfolio-description {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.portfolio-meta {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.meta-item h5 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.portfolio-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.portfolio-content h4 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
}

.project-content {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8) !important;
}

.project-content p {
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.8) !important;
}

.project-content p span {
  color: #fff !important;
  font-size: 15px !important;
}

.project-content ul,
.project-content ol {
  margin-left: 20px;
  margin-bottom: 15px;
}

.portfolio-nav {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-outline-secondary {
  color: rgba(255, 255, 255, 0.8);
  border-color: rgba(255, 255, 255, 0.2);
}

.btn-outline-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}

@media (max-width: 768px) {
  .portfolio-details-content {
    margin-top: 30px;
  }

  .portfolio-content {
    padding: 20px;
  }
}
</style>
