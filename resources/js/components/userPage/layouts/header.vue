<template>
  
    <header id="header" class="header d-flex align-items-center light-background sticky-top">
        <div class="container position-relative d-flex align-items-center justify-content-between">

            <a href="index.html" class="logo d-flex align-items-center me-auto me-xl-0">
                <!-- <img src="assets/img/logo.webp" alt=""> -->
                <h1 class="sitename">HolmesDev</h1> 
            </a>

            <nav id="navmenu" class="navmenu">
                <ul>
                    <li><RouterLink to="/" class="active">Home</RouterLink></li>
                    <li><RouterLink to="/#about">About</RouterLink></li>
                    <li><RouterLink to="/resume">Resume</RouterLink></li>
                    <li><RouterLink to="/#services">Services</RouterLink></li>
                    <li><RouterLink to="/portfolio">Portfolio</RouterLink></li>
                    <li><RouterLink to="/#contact">Contact</RouterLink></li>
                </ul>
                <i class="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>

            <div class="header-social-links">
                <a href="https://www.facebook.com/profile.php?id=61580410003642" target="_blank" class="facebook me-2"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/in/holmes-sohe-86753b260" target="_blank" class="linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>

        </div>
    </header>

</template>

<script>
export default {

}
</script>

<style>

</style>