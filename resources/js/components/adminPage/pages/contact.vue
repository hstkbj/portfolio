<template>
  <div class="main-content">
    <div class="page-header">
      <h1 class="page-title">Contacts</h1>
      <nav class="breadcrumb">
        <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
        <span class="breadcrumb-item active">Contacts</span>
      </nav>
    </div>

    <div class="card admin-surface-card">
      <div class="card-body">
        <LoadingState v-if="loading" label="Chargement des messages..." />

        <div v-else-if="errorMessage" class="alert alert-danger d-flex justify-content-between align-items-center gap-3">
          <span>{{ errorMessage }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="loadContacts">Reessayer</button>
        </div>

        <div v-else-if="allcontact.length">
          <DataTable :data="allcontact" :columns="columns" />
        </div>

        <div v-else class="empty-state-card text-center">
          <h4>Aucun message</h4>
          <p class="text-muted mb-0">Les demandes de contact apparaitront ici automatiquement.</p>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalcontact" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Details du message</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <LoadingState v-if="detailsLoading" label="Chargement du message..." />

            <div v-else class="row g-4">
              <div class="col-lg-6 d-flex flex-column">
                <span class="text-muted">Nom complet</span>
                <label>{{ getcontact.name || '-' }}</label>
              </div>

              <div class="col-lg-6 d-flex flex-column">
                <span class="text-muted">Adresse e-mail</span>
                <a :href="'mailto:' + getcontact.email">{{ getcontact.email || '-' }}</a>
              </div>

              <div class="col-lg-6 d-flex flex-column">
                <span class="text-muted">Telephone</span>
                <a :href="'tel:' + getcontact.phone">{{ getcontact.phone || '-' }}</a>
              </div>

              <div class="col-lg-6 d-flex flex-column">
                <span class="text-muted">Sujet</span>
                <label>{{ getcontact.subject || 'Sans sujet' }}</label>
              </div>

              <div class="col-lg-12 d-flex flex-column">
                <span class="text-muted">Message</span>
                <p class="mb-0">{{ getcontact.message || '-' }}</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import DataTable from '../DataTable/Datatable.vue';
import { AllContactMessages, DeleteContactMessage, ShowContactMessage } from '../api/contact';
import LoadingState from '../../shared/LoadingState.vue';

const allcontact = ref([]);
const getcontact = ref({});
const loading = ref(true);
const detailsLoading = ref(false);
const errorMessage = ref('');
let contactModal;

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

async function loadContacts() {
  try {
    loading.value = true;
    errorMessage.value = '';
    allcontact.value = await AllContactMessages();
  } catch (error) {
    allcontact.value = [];
    errorMessage.value = "Les messages n'ont pas pu etre charges.";
  } finally {
    loading.value = false;
  }
}

const columns = [
  {
    title: '#',
    data: null,
    render: (data, type, row, meta) => meta.row + 1,
  },
  {
    title: 'Nom complet',
    data: 'name',
    render: (data) => `<span class="fw-semibold">${data}</span>`,
  },
  {
    title: 'Email',
    data: 'email',
    render: (data) => `<a href="mailto:${data}" class="text-decoration-none">${data}</a>`,
  },
  {
    title: 'Telephone',
    data: 'phone',
    render: (data) => data ? `<a href="tel:${data}" class="text-decoration-none">${data}</a>` : '-',
  },
  {
    title: 'Recu le',
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
        <button type="button" class="btn btn-sm btn-outline-secondary" onClick="window.ShowContactDetails(${row.id})">
          <i class="bi bi-eye"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-danger" onClick="window.DeleteContactEntry(${row.id})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `,
  },
];

window.ShowContactDetails = async function showContactDetails(id) {
  try {
    detailsLoading.value = true;
    getcontact.value = {};
    contactModal.show();
    getcontact.value = await ShowContactMessage(id);
  } catch (error) {
    getcontact.value = {};
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "Le message n'a pas pu etre charge.",
    });
    contactModal.hide();
  } finally {
    detailsLoading.value = false;
  }
};

window.DeleteContactEntry = async function deleteContactEntry(id) {
  const result = await Swal.fire({
    title: 'Supprimer ce message ?',
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
    await DeleteContactMessage(id);
    await loadContacts();
    Swal.fire({
      icon: 'success',
      title: 'Message supprime',
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: "La suppression du message a echoue.",
    });
  }
};

onMounted(() => {
  contactModal = new bootstrap.Modal(document.getElementById('modalcontact'));
  loadContacts();
});
</script>
