<template>
  
    <!-- Sidebar -->
    <!-- Sidebar -->
    <aside class="sidebar">
        <!-- Sidebar Header -->
        <div class="sidebar-header">
            <a href="/admins" class="sidebar-logo">
                <img src="/admin/assets/img/logo.webp" alt="EasyAdmin">
                <span class="sidebar-logo-text">
                    <span class="sidebar-logo-name">EasyAdmin</span>
                    <span class="sidebar-logo-tagline">Admin Panel</span>
                </span>
            </a>
            <button class="sidebar-close">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="sidebar-nav">
        <ul class="nav-menu">
            <li class="nav-item">
                <RouterLink class="nav-link" exact-active-class="active" to="/admins" data-tooltip="Dashboard">
                    <i class="bi bi-speedometer2"></i>
                    <span>Dashboard</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink class="nav-link " to="/admins/portfolio" exact-active-class="active" data-tooltip="Portfolio">
                    <i class="bi bi-folder2-open"></i>
                    <span>Portfolio</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink class="nav-link" to="/admins/contact" exact-active-class="active" data-tooltip="Contact">
                    <i class="bi bi-envelope"></i>
                    <span>Contact</span>
                </RouterLink>
            </li>

            <li class="nav-item">
                <RouterLink class="nav-link" to="/admins/profils" exact-active-class="active" data-tooltip="Profils">
                    <i class="bi bi-person"></i>
                    <span>Profils</span>
                </RouterLink>
            </li>

           

        </ul>
        </nav>

    </aside>

    <!-- Sidebar Overlay (Mobile) -->
    <div class="sidebar-overlay"></div>

</template>

<script>
export default {

}
</script>

<style>

</style>
