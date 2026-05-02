<template>
  <div class="main-content">
    <div class="page-header d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="text-muted mb-0">Vue d'ensemble de votre portfolio et de vos messages recents.</p>
      </div>
      <RouterLink to="/admins/portfolio" class="btn btn-primary btn-sm">
        <i class="bi bi-plus-lg me-1"></i> Ajouter un portfolio
      </RouterLink>
    </div>

    <LoadingState v-if="loading" label="Chargement du dashboard..." card />

    <div v-else-if="errorMessage" class="alert alert-danger d-flex justify-content-between align-items-center gap-3">
      <span>{{ errorMessage }}</span>
      <button class="btn btn-outline-danger btn-sm" @click="loadDashboard">Reessayer</button>
    </div>

    <template v-else>
      <div class="row g-4 mb-4">
        <div class="col-md-6 col-xl-3">
          <div class="card admin-surface-card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge bg-primary-subtle text-primary">Portfolio</span>
                <i class="bi bi-folder2-open fs-4 text-primary"></i>
              </div>
              <h3 class="fw-bold mb-1">{{ stats.portfolios }}</h3>
              <p class="text-muted mb-0">projet(s) publie(s)</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-xl-3">
          <div class="card admin-surface-card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge bg-success-subtle text-success">Contacts</span>
                <i class="bi bi-envelope fs-4 text-success"></i>
              </div>
              <h3 class="fw-bold mb-1">{{ stats.contacts }}</h3>
              <p class="text-muted mb-0">message(s) recus</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-xl-3">
          <div class="card admin-surface-card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge bg-info-subtle text-info">Profil</span>
                <i class="bi bi-person-circle fs-4 text-info"></i>
              </div>
              <h3 class="fw-bold mb-1">{{ currentUser?.name || 'Administrateur' }}</h3>
              <p class="text-muted mb-0">{{ currentUser?.email || 'Compte connecte' }}</p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-xl-3">
          <div class="card admin-surface-card h-100">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <span class="badge bg-warning-subtle text-warning">Dernier message</span>
                <i class="bi bi-clock-history fs-4 text-warning"></i>
              </div>
              <h3 class="fw-bold mb-1">{{ latestContactLabel }}</h3>
              <p class="text-muted mb-0">recu le {{ latestContactDate }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-xl-7">
          <div class="card admin-surface-card h-100">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-1">Portfolios recents</h5>
                <p class="text-muted mb-0 small">Les derniers projets publies.</p>
              </div>
              <RouterLink to="/admins/portfolio" class="btn btn-outline-primary btn-sm">
                Voir tout
              </RouterLink>
            </div>

            <div class="card-body pt-0">
              <div v-if="recentPortfolios.length" class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Lien</th>
                      <th>Publication</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="portfolio in recentPortfolios" :key="portfolio.id">
                      <td class="fw-semibold">{{ portfolio.title }}</td>
                      <td>
                        <a :href="portfolio.link" target="_blank" class="text-decoration-none">
                          Ouvrir <i class="bi bi-box-arrow-up-right ms-1"></i>
                        </a>
                      </td>
                      <td>{{ formatDate(portfolio.created_at) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-else class="empty-state-card text-center">
                <h4>Aucun portfolio</h4>
                <p class="text-muted mb-0">Ajoutez votre premier projet pour alimenter le dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-5">
          <div class="card admin-surface-card h-100">
            <div class="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-1">Messages recents</h5>
                <p class="text-muted mb-0 small">Les derniers contacts recus via le site.</p>
              </div>
              <RouterLink to="/admins/contact" class="btn btn-outline-primary btn-sm">
                Voir tout
              </RouterLink>
            </div>

            <div class="card-body pt-0">
              <div v-if="recentContacts.length" class="list-group list-group-flush">
                <div v-for="contact in recentContacts" :key="contact.id" class="list-group-item px-0">
                  <div class="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h6 class="mb-1">{{ contact.name }}</h6>
                      <p class="text-muted small mb-1">{{ contact.subject || 'Sans sujet' }}</p>
                      <a :href="'mailto:' + contact.email" class="small text-decoration-none">{{ contact.email }}</a>
                    </div>
                    <span class="text-muted small text-nowrap">{{ formatDate(contact.created_at) }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="empty-state-card text-center">
                <h4>Aucun message</h4>
                <p class="text-muted mb-0">Les messages recus apparaitront ici automatiquement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { AllPorfolio } from '../api/portfolioapi';
import { AllContactMessages } from '../api/contact';
import { CurrentUser } from '../api/user';
import LoadingState from '../../shared/LoadingState.vue';

const loading = ref(true);
const errorMessage = ref('');
const currentUser = ref(null);
const recentPortfolios = ref([]);
const recentContacts = ref([]);
const stats = ref({
  portfolios: 0,
  contacts: 0,
});

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

const latestContactLabel = computed(() => recentContacts.value[0]?.name || 'Aucun');
const latestContactDate = computed(() => formatDate(recentContacts.value[0]?.created_at));

async function loadDashboard() {
  try {
    loading.value = true;
    errorMessage.value = '';

    const [user, portfolios, contacts] = await Promise.all([
      CurrentUser(),
      AllPorfolio(),
      AllContactMessages(),
    ]);

    currentUser.value = user;
    recentPortfolios.value = portfolios.slice(0, 5);
    recentContacts.value = contacts.slice(0, 5);
    stats.value = {
      portfolios: portfolios.length,
      contacts: contacts.length,
    };
  } catch (error) {
    errorMessage.value = "Le dashboard n'a pas pu etre charge pour le moment.";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadDashboard();
});
</script>
