<template>
  <section id="portfolio" class="portfolio section">
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Decouvrez mes projets de developpement web et mobile, classes par ordre recent.</p>
    </div>

    <div class="container" data-aos="fade-up" data-aos-delay="100">
      <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
        <LoadingState v-if="loading" label="Chargement du portfolio..." />

        <div v-else-if="errorMessage" class="empty-state-card text-center">
          <h4>Impossible de charger les projets</h4>
          <p class="text-muted mb-3">{{ errorMessage }}</p>
          <button class="btn btn-outline-primary" @click="loadPortfolios(currentPage)">Reessayer</button>
        </div>

        <div v-else-if="allporfolio.length" class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
          <div
            v-for="project in allporfolio"
            :key="project.id"
            class="col-lg-4 col-md-6 portfolio-item isotope-item filter-strategy"
          >
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
                <p class="text-justify desc">{{ project.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state-card text-center">
          <h4>Aucun projet disponible</h4>
          <p class="text-muted mb-0">Le portfolio sera affiche ici des qu'un projet sera publie.</p>
        </div>

        <div v-if="lastPage > 1 && !loading && !errorMessage" class="d-flex justify-content-center mt-5">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link btn btn-primary me-3" href="#" @click.prevent="goToPage(currentPage - 1)">
                <i class="bi bi-arrow-left"></i>
              </a>
            </li>

            <li v-if="showLeftDots" class="page-item">
              <a class="page-link" href="#" @click.prevent="goToPage(1)">1</a>
            </li>

            <li v-if="showLeftDots" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <li v-for="page in paginationPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">
                {{ page }}
              </a>
            </li>

            <li v-if="showRightDots" class="page-item disabled">
              <span class="page-link">...</span>
            </li>

            <li v-if="showRightDots" class="page-item">
              <a class="page-link" href="#" @click.prevent="goToPage(lastPage)">
                {{ lastPage }}
              </a>
            </li>

            <li class="page-item" :class="{ disabled: currentPage === lastPage }">
              <a class="page-link btn btn-primary" href="#" @click.prevent="goToPage(currentPage + 1)">
                <i class="bi bi-arrow-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { AllPorfolioUser } from '../../adminPage/api/portfolioapi';
import { ThemeMain } from '../../plugins/themeMain';
import LoadingState from '../../shared/LoadingState.vue';

const allporfolio = ref([]);
const loading = ref(true);
const errorMessage = ref('');
const pagination = ref({
  current_page: 1,
  last_page: 1,
});

async function loadPortfolios(page = 1) {
  try {
    loading.value = true;
    errorMessage.value = '';

    const res = await AllPorfolioUser(page);
    allporfolio.value = res.data ?? [];
    pagination.value.current_page = res.current_page ?? 1;
    pagination.value.last_page = res.last_page ?? 1;

    await nextTick();
    ThemeMain();
  } catch (error) {
    allporfolio.value = [];
    errorMessage.value = "Le portfolio n'a pas pu etre charge pour le moment.";
  } finally {
    loading.value = false;
  }
}

const currentPage = computed(() => pagination.value.current_page);
const lastPage = computed(() => pagination.value.last_page);
const windowSize = 2;

const paginationPages = computed(() => {
  if (lastPage.value <= 1) {
    return [1];
  }

  const pages = [];
  const start = Math.max(1, currentPage.value - windowSize);
  const end = Math.min(lastPage.value, currentPage.value + windowSize);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  return pages;
});

const showLeftDots = computed(() => currentPage.value > windowSize + 1);
const showRightDots = computed(() => currentPage.value < lastPage.value - windowSize);

function goToPage(page) {
  if (page < 1 || page > lastPage.value || page === currentPage.value) {
    return;
  }

  loadPortfolios(page);
}

onMounted(() => {
  loadPortfolios();
});
</script>

<style scoped>
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
