<script setup lang="ts"></script>

<template>
  <div class="container-fluid">
    <RouterView/>
  </div>
</template>

<style scoped lang="scss">
.container-fluid {
  display: flex;
  flex-direction: column;
  height: $full-height;
}
</style>
