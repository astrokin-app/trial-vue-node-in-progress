<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://transition.nw-groupe.fr/" target="_blank">
      <img src="./assets/nwlogo.png" class="logo" alt="NW logo" />
    </a>
  </div>
  <HelloWorld msg="NW Group Auth." />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
</style>
