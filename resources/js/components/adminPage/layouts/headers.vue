<template>
  
    <!-- Header -->
  <!-- Header -->
  <header class="header">
    <!-- Header Left -->
    <div class="header-left">
      <a href="/admins" class="header-logo">
        <img src="admin/assets/img/logo.webp" alt="EasyAdmin">
        <span>EasyAdmin</span>
      </a>
      <button class="sidebar-toggle" title="Toggle Sidebar">
        <i class="bi bi-list"></i>
      </button>
    </div>

    <!-- Header Search (Desktop) - Expandable -->
    <div class="header-search">
      <form class="search-form collapsed" @submit.prevent>
        <button type="button" class="search-toggle-btn"><i class="bi bi-search"></i></button>
        <input type="search" name="q" placeholder="Search..." autocomplete="off">
      </form>
    </div>

    <!-- Header Right -->
    <div class="header-right">
      <!-- Desktop Actions (hidden on mobile, shown in mobile menu) -->
      <div class="header-actions-desktop">
        <!-- Theme Toggle -->
        <button class="header-action theme-toggle" title="Toggle Theme">
          <i class="bi bi-moon icon-dark"></i>
          <i class="bi bi-sun icon-light"></i>
        </button>

        <!-- Fullscreen Toggle -->
        <button class="header-action fullscreen-toggle" onclick="toggleFullscreen()" title="Fullscreen">
          <i class="bi bi-arrows-fullscreen icon-enter"></i>
          <i class="bi bi-fullscreen-exit icon-exit"></i>
        </button>

        <!-- Notifications -->
        <div class="header-action dropdown notification-dropdown">
          <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-bell"></i>
            <span class="badge">3</span>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <div class="notification-header">
              <h6>Notifications</h6>
              <a href="#" data-notification-action="mark-all-read">Mark all read</a>
            </div>
            <div class="notification-list">
              <div class="notification-item unread">
                <div class="notification-icon success">
                  <i class="bi bi-check-circle"></i>
                </div>
                <div class="notification-content">
                  <div class="notification-title">Order Completed</div>
                  <div class="notification-text">Your order #12345 has been delivered</div>
                  <div class="notification-time">5 min ago</div>
                </div>
              </div>
              <div class="notification-item unread">
                <div class="notification-icon warning">
                  <i class="bi bi-exclamation-triangle"></i>
                </div>
                <div class="notification-content">
                  <div class="notification-title">Low Storage</div>
                  <div class="notification-text">Server storage is running low (85% used)</div>
                  <div class="notification-time">1 hour ago</div>
                </div>
              </div>
              <div class="notification-item">
                <div class="notification-icon info">
                  <i class="bi bi-info-circle"></i>
                </div>
                <div class="notification-content">
                  <div class="notification-title">New Feature</div>
                  <div class="notification-text">Dark mode is now available</div>
                  <div class="notification-time">2 hours ago</div>
                </div>
              </div>
            </div>
            <div class="notification-footer">
              <RouterLink to="/admins/contact">Voir les messages</RouterLink>
            </div>
          </div>
        </div>

        <!-- User Dropdown - shadcn style -->
        <div class="header-action dropdown user-dropdown">
          <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/admin/assets/img/profile-img.webp" alt="User" class="avatar">
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li class="dropdown-header">
              <img src="/admin/assets/img/profile-img.webp" alt="User" class="user-avatar">
              <div class="user-info">
                <h6>{{ currentUser.name }}</h6>
                <span>{{ currentUser.email }}</span>
              </div>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>
            
            <li>
              <a class="dropdown-item dropdown-item-danger" @click="LogoutFunction">
                <i class="bi bi-box-arrow-right"></i> Sign Out
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Mobile Actions (visible only on mobile) -->
      <div class="header-actions-mobile">
        <!-- Search Toggle (Mobile) -->
        <button class="header-action search-toggle" title="Search">
          <i class="bi bi-search"></i>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="header-action mobile-menu-toggle" title="More">
          <i class="bi bi-three-dots-vertical"></i>
        </button>
      </div>
    </div>
  </header>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { isAuthenticated } from '../../router';
import { postData } from '../../plugins/api';

const currentUser = ref({})

async function CurrenUserFunction(){
  currentUser.value = await isAuthenticated()
}

async function LogoutFunction() {
  await postData('/logout',null).then(res=>{
    if (res.status === 200) {
      localStorage.removeItem('token')
      currentUser.value = {}
      window.location.href = '/admins/login'
    }
  })
}

onMounted(()=> {
  CurrenUserFunction()
})

</script>

<style>

</style>
