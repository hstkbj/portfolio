<template>
  <div class="auth-layout">
    <div class="auth-container">
      <!-- Logo -->
      <a href="/" class="auth-logo">
        <img src="/admin/assets/img/logo.webp" alt="EasyAdmin">
        <span>EasyAdmin</span>
      </a>

      <div class="auth-card">
        <div class="auth-card-header">
          <h1 class="auth-title">Welcome back</h1>
          <p class="auth-subtitle">Enter your credentials to access your account</p>
        </div>

        <form class="auth-form" @submit.prevent="LoginForm">
          <div class="form-group">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" :class="isEmpty.email ? 'is-invalid border border-danger' : ''" v-model="dataLogin.email" id="email" name="email" placeholder="name@example.com" required="">
            <div v-if="isEmpty.email" class="invalid-feedback">{{ msgInput.email }}</div>
          </div>

          <div class="form-group">
            <div class="d-flex justify-content-between align-items-center">
              <label for="password" class="form-label">Password</label>
              <span class="auth-link small text-muted">Besoin d'aide ? Contactez l'administrateur.</span>
            </div>
            <div class="input-group">
              <input class="form-control" :type="showpwd ? 'text' : 'password'" :class="isEmpty.password ? 'is-invalid border border-danger' : ''" v-model="dataLogin.password" id="password" name="password" placeholder="Enter your password" required="">
              <button class="btn btn-outline-secondary" type="button" @click="togglePwd">
                <i :class="showpwd ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            <div v-if="isEmpty.password" class="invalid-feedback">{{ msgInput.password }}</div>
          </div>

          <button v-if="isLoader" disabled class="btn btn-primary btn-block">
            <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
            </div>
          </button>
          <button v-else type="submit" class="btn btn-primary btn-block">Sign in</button>

          
        </form>

      </div>

    </div>
  </div>
</template>

<script setup>

  import { ref } from 'vue';
  import { postData } from '../../plugins/api';
  const dataLogin = ref({
      email:'',
      password:''
  })

  const isEmpty = ref({})
  const msgInput = ref({})
  const isLoader = ref(false)
  const showpwd = ref(false)

  async function LoginForm() {

    for (const field in dataLogin.value) {
      isEmpty.value[field] = !dataLogin.value[field];
      msgInput.value[field] = 'This field is empty';
    }

    const allEmpty = Object.values(isEmpty.value).every(value => value === false)

    if (allEmpty){
      isLoader.value = true
      await postData('/login',dataLogin.value).then(res=>{
        if (res.status === 200) {
          isLoader.value = false
          localStorage.setItem('token', res.data.token)
          // Rediriger vers la route sauvegardée ou par défaut
          const redirectUrl = localStorage.getItem('redirectAfterLogin');
          if (redirectUrl) {
              // Forcer une redirection complète du navigateur
              window.location.href = redirectUrl;
              localStorage.removeItem('redirectAfterLogin');
          } else {
              //router.push('/');
              window.location.href = "/admins"
          }
        }
      }).catch(error=>{
        if (error.response) {
          if (error.response.status === 401) {
              isLoader.value = false
              isEmpty.value.email = true
              isEmpty.value.password = true
              msgInput.value.email = error.response.data.message
              msgInput.value.password = error.response.data.message
          } else {
              console.error("Erreur du serveur :", error.response.data.message || "Veuillez réessayer plus tard.");
          }
        }
      })
    }

  }

  const togglePwd = ()=>{
    showpwd.value = !showpwd.value
  }

</script>

<style>

</style>
