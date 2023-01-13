<script setup lang="ts"></script>

<template>
  <div class="">
    <div class="card">
      <div class="card-header px-lg-5">
        <slot name="header"></slot>
      </div>
      <div class="card-body p-lg-5">
        <slot name="body"></slot>
      </div>
      <div class="card-footer px-lg-5 py-lg-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-header {
  background-color: white;
}
</style>