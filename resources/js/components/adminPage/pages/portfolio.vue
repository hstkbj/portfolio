<template>
  <div class="main-content">
    <div class="page-header">
      <h1 class="page-title">Portfolio</h1>
      <nav class="breadcrumb">
        <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
        <span class="breadcrumb-item active">Portfolio</span>
      </nav>
    </div>

    <div class="mb-4 text-end">
      <button class="btn btn-primary" @click="openCreateModal">
        <i class="bi bi-plus-lg me-1"></i> Ajouter un portfolio
      </button>
    </div>

    <div class="card admin-surface-card">
      <div class="card-body">
        <LoadingState v-if="loading" label="Chargement des portfolios..." />

        <div v-else-if="errorMessage" class="alert alert-danger d-flex justify-content-between align-items-center gap-3">
          <span>{{ errorMessage }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="loadPortfolios">Reessayer</button>
        </div>

        <div v-else-if="portfolios.length">
          <DataTable :data="portfolios" :columns="columns" />
        </div>

        <div v-else class="empty-state-card text-center">
          <h4>Aucun portfolio</h4>
          <p class="text-muted mb-0">Ajoutez votre premier projet pour le voir apparaitre ici.</p>
        </div>
      </div>
    </div>

    <div class="modal fade" id="portfolioModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <form class="modal-content" @submit.prevent="submitPortfolio">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <LoadingState v-if="modalLoading" label="Chargement du portfolio..." />

            <div v-else class="row g-3">
              <div class="col-lg-12">
                <label for="portfolio-image" class="form-label">Image URL</label>
                <input
                  id="portfolio-image"
                  v-model="form.image_path"
                  type="url"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.image_path }"
                  placeholder="https://exemple.com/image.webp"
                >
                <div v-if="validationErrors.image_path" class="invalid-feedback">
                  {{ validationErrors.image_path }}
                </div>
              </div>

              <div class="col-lg-6">
                <label for="portfolio-title" class="form-label">Titre</label>
                <input
                  id="portfolio-title"
                  v-model="form.title"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.title }"
                  placeholder="Entrez le titre du portfolio"
                >
                <div v-if="validationErrors.title" class="invalid-feedback">
                  {{ validationErrors.title }}
                </div>
              </div>

              <div class="col-lg-6">
                <label for="portfolio-link" class="form-label">Lien</label>
                <input
                  id="portfolio-link"
                  v-model="form.link"
                  type="url"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.link }"
                  placeholder="https://exemple.com"
                >
                <div v-if="validationErrors.link" class="invalid-feedback">
                  {{ validationErrors.link }}
                </div>
              </div>

              <div class="col-lg-12">
                <label for="portfolio-description" class="form-label">Description</label>
                <textarea
                  id="portfolio-description"
                  v-model="form.description"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.description }"
                  rows="3"
                  maxlength="200"
                  placeholder="Entrez la description du portfolio"
                ></textarea>
                <div class="text-end">
                  <small class="text-muted">{{ form.description.length }}/200</small>
                </div>
                <div v-if="validationErrors.description" class="invalid-feedback">
                  {{ validationErrors.description }}
                </div>
              </div>

              <div class="col-lg-12">
                <label for="blog-editor" class="form-label">Contenu</label>
                <textarea
                  id="blog-editor"
                  v-model="form.content"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.content }"
                  rows="8"
                  placeholder="Entrez le contenu du portfolio"
                ></textarea>
                <div v-if="validationErrors.content" class="invalid-feedback">
                  {{ validationErrors.content }}
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              Fermer
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting || modalLoading">
              <span v-if="submitting" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
              {{ submitting ? 'Enregistrement...' : modalButtonLabel }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import DataTable from '../DataTable/Datatable.vue';
import { CreatePortfolio, DeletePortfolio, AllPorfolio, SinglePortfolio, UpdatePortfolio } from '../api/portfolioapi';
import { destroyTinyMCE, initTinyMCE, updateTinyMCE } from '../../plugins/tinymce';
import LoadingState from '../../shared/LoadingState.vue';

const portfolios = ref([]);
const loading = ref(true);
const submitting = ref(false);
const modalLoading = ref(false);
const errorMessage = ref('');
const isEditing = ref(false);
const validationErrors = ref({});
const modalTitle = ref('Ajouter un portfolio');
const modalButtonLabel = ref('Enregistrer');

const defaultForm = () => ({
  id: null,
  title: '',
  description: '',
  content: '',
  image_path: '',
  link: '',
});

const form = ref(defaultForm());
let portfolioModal;

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function resetForm() {
  form.value = defaultForm();
  validationErrors.value = {};
}

function validateForm() {
  const errors = {};

  if (!form.value.title.trim()) {
    errors.title = 'Le titre est requis.';
  }

  if (!form.value.description.trim()) {
    errors.description = 'La description est requise.';
  }

  if (!form.value.content.trim()) {
    errors.content = 'Le contenu est requis.';
  }

  if (!form.value.image_path.trim()) {
    errors.image_path = "L'URL de l'image est requise.";
  }

  if (!form.value.link.trim()) {
    errors.link = 'Le lien du projet est requis.';
  }

  validationErrors.value = errors;
  return Object.keys(errors).length === 0;
}

async function loadPortfolios() {
  try {
    loading.value = true;
    errorMessage.value = '';
    portfolios.value = await AllPorfolio();
  } catch (error) {
    portfolios.value = [];
    errorMessage.value = "Les portfolios n'ont pas pu etre charges.";
  } finally {
    loading.value = false;
  }
}

function openCreateModal() {
  resetForm();
  isEditing.value = false;
  modalTitle.value = 'Ajouter un portfolio';
  modalButtonLabel.value = 'Enregistrer';
  modalLoading.value = false;
  portfolioModal.show();
}

async function openEditModal(id) {
  try {
    resetForm();
    isEditing.value = true;
    modalTitle.value = 'Modifier le portfolio';
    modalButtonLabel.value = 'Mettre a jour';
    modalLoading.value = true;
    portfolioModal.show();

    const portfolio = await SinglePortfolio(id);
    form.value = {
      id: portfolio.id,
      title: portfolio.title || '',
      description: portfolio.description || '',
      content: portfolio.content || '',
      image_path: portfolio.image_path || '',
      link: portfolio.link || '',
    };

    await nextTick();
    if (tinymce.get('blog-editor')) {
      updateTinyMCE('blog-editor', form.value.content);
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Le portfolio n'a pas pu etre charge.",
    });
    portfolioModal.hide();
  } finally {
    modalLoading.value = false;
  }
}

async function submitPortfolio() {
  if (!validateForm()) {
    return;
  }

  try {
    submitting.value = true;

    const payload = {
      title: form.value.title,
      description: form.value.description,
      content: form.value.content,
      image_path: form.value.image_path,
      link: form.value.link,
    };

    if (isEditing.value && form.value.id) {
      await UpdatePortfolio(form.value.id, payload);
    } else {
      await CreatePortfolio(payload);
    }

    await loadPortfolios();
    portfolioModal.hide();
    Swal.fire({
      icon: 'success',
      title: isEditing.value ? 'Portfolio mis a jour' : 'Portfolio ajoute',
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: error?.response?.data?.message || "L'enregistrement du portfolio a echoue.",
    });
  } finally {
    submitting.value = false;
  }
}

async function deletePortfolioEntry(id) {
  const result = await Swal.fire({
    title: 'Supprimer ce portfolio ?',
    text: "Cette action est irreversible.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
  });

  if (!result.isConfirmed) {
    return;
  }

  try {
    await DeletePortfolio(id);
    await loadPortfolios();
    Swal.fire({
      icon: 'success',
      title: 'Portfolio supprime',
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "La suppression du portfolio a echoue.",
    });
  }
}

const columns = [
  {
    title: '#',
    data: null,
    render: (data, type, row, meta) => meta.row + 1,
  },
  {
    title: 'Titre',
    data: 'title',
  },
  {
    title: 'Lien',
    data: 'link',
    render: (data) => `<a href="${data}" target="_blank" class="text-decoration-none">${data}</a>`,
  },
  {
    title: 'Cree le',
    data: 'created_at',
    render: (data) => formatDate(data),
  },
  {
    title: 'Actions',
    data: null,
    orderable: false,
    searchable: false,
    render: (data, type, row) => `
      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-sm btn-outline-secondary" onClick="window.EditPortfolioEntry(${row.id})">
          <i class="bi bi-pencil"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger" onClick="window.DeletePortfolioEntry(${row.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `,
  },
];

window.EditPortfolioEntry = openEditModal;
window.DeletePortfolioEntry = deletePortfolioEntry;

onMounted(() => {
  portfolioModal = new bootstrap.Modal(document.getElementById('portfolioModal'));

  document.getElementById('portfolioModal').addEventListener('shown.bs.modal', async () => {
    await nextTick();

    if (!tinymce.get('blog-editor')) {
      initTinyMCE('blog-editor', {
        height: 500,
        setup: (editor) => {
          editor.on('init', () => {
            editor.setContent(form.value.content || '');
          });

          editor.on('Change KeyUp', () => {
            form.value.content = editor.getContent();
          });
        },
      });
    }
  });

  document.getElementById('portfolioModal').addEventListener('hidden.bs.modal', () => {
    if (tinymce.get('blog-editor')) {
      destroyTinyMCE('blog-editor');
    }

    resetForm();
    isEditing.value = false;
    modalLoading.value = false;
  });

  loadPortfolios();
});
</script>
