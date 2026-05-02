<template>
  <div class="main-content">
    <div class="page-header">
      <h1 class="page-title">Profil</h1>
      <nav class="breadcrumb">
        <RouterLink to="/admins" class="breadcrumb-item">Accueil</RouterLink>
        <span class="breadcrumb-item active">Profil</span>
      </nav>
    </div>

    <div class="card admin-surface-card">
      <div class="card-body">
        <LoadingState v-if="loading" label="Chargement du profil..." />

        <div v-else>
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
            <div>
              <h3 class="mb-1">Informations personnelles</h3>
              <p class="text-muted mb-0">Mettez a jour les informations de connexion de l'administration.</p>
            </div>
            <span class="badge bg-light text-dark border">
              <i class="bi bi-person-check me-1"></i> Compte actif
            </span>
          </div>

          <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
          <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

          <form class="row g-4" @submit.prevent="saveProfile">
            <div class="col-lg-6">
              <label for="profile-name" class="form-label">Nom complet</label>
              <input id="profile-name" v-model="form.name" type="text" class="form-control" required>
            </div>

            <div class="col-lg-6">
              <label for="profile-email" class="form-label">Adresse e-mail</label>
              <input id="profile-email" v-model="form.email" type="email" class="form-control" required>
            </div>

            <div class="col-lg-6">
              <label for="profile-password" class="form-label">Nouveau mot de passe</label>
              <input
                id="profile-password"
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Laisser vide pour conserver l'actuel"
              >
              <small class="text-muted">Minimum 8 caracteres.</small>
            </div>

            <div class="col-lg-6">
              <label for="profile-password-confirmation" class="form-label">Confirmation du mot de passe</label>
              <input
                id="profile-password-confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="form-control"
                placeholder="Confirmer le nouveau mot de passe"
              >
            </div>

            <div class="col-12 d-flex justify-content-end">
              <button type="submit" class="btn btn-primary" :disabled="saving">
                <span v-if="saving" class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                {{ saving ? 'Enregistrement...' : 'Mettre a jour le profil' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { CurrentUser, UpdateUser } from '../api/user';
import LoadingState from '../../shared/LoadingState.vue';

const loading = ref(true);
const saving = ref(false);
const successMessage = ref('');
const errorMessage = ref('');
const userId = ref(null);
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

async function loadProfile() {
  try {
    loading.value = true;
    errorMessage.value = '';

    const user = await CurrentUser();
    userId.value = user.id;
    form.value.name = user.name || '';
    form.value.email = user.email || '';
    form.value.password = '';
    form.value.password_confirmation = '';
  } catch (error) {
    errorMessage.value = "Le profil n'a pas pu etre charge.";
  } finally {
    loading.value = false;
  }
}

async function saveProfile() {
  if (!userId.value) {
    return;
  }

  try {
    saving.value = true;
    successMessage.value = '';
    errorMessage.value = '';

    const payload = {
      name: form.value.name,
      email: form.value.email,
    };

    if (form.value.password) {
      payload.password = form.value.password;
      payload.password_confirmation = form.value.password_confirmation;
    }

    const user = await UpdateUser(userId.value, payload);

    form.value.name = user.name || '';
    form.value.email = user.email || '';
    form.value.password = '';
    form.value.password_confirmation = '';
    successMessage.value = 'Le profil a ete mis a jour avec succes.';
  } catch (error) {
    errorMessage.value = error?.response?.data?.message || 'La mise a jour du profil a echoue.';
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadProfile();
});
</script>
