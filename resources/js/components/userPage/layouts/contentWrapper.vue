<template>
    <headers/>
    <main class="main">
        <RouterView />
    </main>
    <footers/>
</template>

<script setup>

    import footers from './footers.vue';
    import headers from './header.vue';
    import {ThemeMain} from '../../plugins/themeMain'
    import { onMounted, watch, ref, nextTick } from 'vue';
    import { useRoute } from "vue-router";

    const route = useRoute()

    onMounted(()=>{
        setTimeout(()=>{
            ThemeMain();
        },0)
    })

    watch(route, async () => {
        await nextTick(); // attendre que le DOM se mette à jour
        ThemeMain();
    });

</script>

<style>

</style>