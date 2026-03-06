<template>

  <!-- Portfolio Section -->
  <section id="portfolio" class="portfolio section">

    <!-- Section Title -->
    <div class="container section-title" data-aos="fade-up">
      <h2>Portfolio</h2>
      <p>Découvrez mes projets de développement web et mobile, combinant performance, design et technologies modernes.
      </p>
    </div><!-- End Section Title -->

    <div class="container" data-aos="fade-up" data-aos-delay="100">

      <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">


        <div class="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
          <div v-for="(prf, index) in allporfolio" :key="index"
            class="col-lg-4 col-md-6 portfolio-item isotope-item filter-strategy">
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
                <p class="text-justify desc">{{ prf.description }}</p>
              </div>
            </div>
          </div>
        </div><!-- End Portfolio Items Container -->

        <div class="d-flex justify-content-center mt-5">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link btn btn-primary me-3" href="#" @click.prevent="goToPage(currentPage - 1)">
                <i class="fas fa-arrow-left"></i>
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
                <i class="fas fa-arrow-right"></i>
              </a>
            </li>
          </ul>
        </div>

      </div>

    </div>

  </section><!-- /Portfolio Section -->

</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { AllPorfolioUser } from '../../adminPage/api/portfolioapi';
import { ThemeMain } from '../../plugins/themeMain'


const allporfolio = ref([]);
const pagination = ref({
  current_page: 1,
  last_page: 1
})


async function AllPorfolioFunction(page = 1) {

  const res = await AllPorfolioUser(page)
  allporfolio.value = res.data;
  pagination.value.current_page = res.current_page
  pagination.value.last_page = res.last_page

  await nextTick(); // attendre que le DOM se mette à jour
  ThemeMain();

}

const currentPage = computed(() => pagination.value.current_page)
const lastPage = computed(() => pagination.value.last_page)
const windowSize = 2

const paginationPages = computed(() => {
  const pages = []
  const start = Math.max(2, currentPage.value - windowSize)
  const end = Math.min(lastPage.value - 1, currentPage.value + windowSize)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const showLeftDots = computed(() => {
  return currentPage.value > windowSize + 2
})

const showRightDots = computed(() => {
  return currentPage.value < lastPage.value - windowSize - 1
})

const goToPage = (page) => {
  if (
    page < 1 ||
    page > lastPage.value ||
    page === currentPage.value
  ) return

  AllPorfolioFunction(page)
}

onMounted(() => {
  AllPorfolioFunction();
});

</script>

<style scoped>
.desc {
    display: -webkit-box;        /* Nécessaire pour limiter le nombre de lignes */
    -webkit-box-orient: vertical; 
    -webkit-line-clamp: 3;       /* Nombre de lignes à afficher */
    overflow: hidden;             /* Masquer le reste */
    text-overflow: ellipsis;      /* Afficher "…" */
}
</style>