<script setup lang="ts"></script>

<template>
  <div class="container-fluid">
    <RouterView/>
  </div>
</template>

<style scoped>
.container-fluid {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
