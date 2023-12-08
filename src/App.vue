<template>
  <div class="bg-primary flex flex-col min-h-screen font-Roboto">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';


</script>

<style scoped></style>