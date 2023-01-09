<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';

defineProps({
  schema: {
      type: Object,
      required: true,
    },
})
</script>

<template>
  <div class="col-lg-12 px-lg-4">
    <div class="card">
      <div class="card-header px-lg-5">
        <slot name="header"></slot>
      </div>
      <div class="card-body p-lg-5">
        <slot name="body"></slot>
        <Form>
          <div
            v-for="{ as, name, label, ...attrs } in schema.fields"
            :key="name"
          >
            <label :for="name">{{ label }}</label>
            <Field :as="as" :id="name" :name="name" v-bind="attrs" />
            <ErrorMessage :name="name" />
          </div>
          <button>Submit</button>
        </Form>
      </div>
      <div class="card-footer px-lg-5 py-lg-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.card-header {
  background-color: white;
}
</style>