<template>

    <headers />
    <sidebars />
    <main class="main">
        <RouterView />
    </main>

</template>

<script setup>

    import headers from './headers.vue';
    import sidebars from './sidebars.vue';
    import {ThemeMainAdmin, ThemeAdmin} from '../../plugins/themeMain'
    import { onMounted, watch, ref, nextTick } from 'vue';
    import { useRoute } from "vue-router";

    const route = useRoute()

    onMounted(()=>{
        setTimeout(()=>{
            ThemeAdmin();
            ThemeMainAdmin();
        },0)
    })

    watch(route, async () => {
        await nextTick(); // attendre que le DOM se mette à jour
        ThemeAdmin();
        ThemeMainAdmin();
    });

</script>

<style>

</style>