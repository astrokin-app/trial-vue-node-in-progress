<script setup lang="ts">
import DynamicCard from './DynamicCard.vue';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import { useAuthStore } from '@/stores/AuthStore';

// Define the rule globally
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);


// Generates a French message locale generator
configure({
  generateMessage: localize('fr', {
    messages: {
      required: 'Ce champ est obligatoire',
      email: 'Ce champ doit comporter un format e-mail valide',
      min: 'Ce champ doit contenir au minimum 6 characteres',
    },
  }),
});

defineProps({
  schema: {
    type: Object,
    required: true,
  },
  btnLabel: {
    type: String,
    default: 'Envoyer',
    required: false,
  }
})

const emit = defineEmits<{
  (e: 'submitForm', value: string): void
}>()

const onSubmit = (values: any): void => {
  emit('submitForm', JSON.stringify(values, null, 2))
}

const authStore = useAuthStore()
</script>

<template>
  <DynamicCard>
    <template #header>
      <div>
        <h1>NW Groupe</h1>
        <h3>Réussir la transition énergétique.</h3>
      </div>
    </template>
    <template #body>
      <Form @submit="onSubmit" class="form-group" style="text-align: initial" v-slot="{ isSubmitting }">
        <div
          class="form-outline"
          v-for="{ as, name, label, ref, ...attrs } in schema.fields"
          :key="name"
        >
          <label :for="name" class="form-label"></label>
          <Field class="form-control" :placeholder="label" :as="as" :id="name" :name="name" v-bind="attrs" :rules="name === 'email' ? 'required|email' : name === 'password' ? 'required|min:6' : name === 'confirmPassword' ? 'required|min:6' : 'required'"/>
          <ErrorMessage class="error-message" as="div" :name=name v-slot="{ message }">
            <p>{{ message }}</p>
          </ErrorMessage>
        </div>
        <button class="submit-btn"><span v-show="authStore.loading" class="spinner-border spinner-border-sm mr-2"></span> {{ btnLabel }}</button>
      </Form>
    </template>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </DynamicCard>
</template>

<style scoped lang="scss">
.submit-btn {
  background: $primary-color;
  outline: none;
  border: none;
  color: $white-color;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.submit-btn:hover, .submit-btn:focus, .submit-btn:active, .submit-btn.active {
    color: $white-color;
    transition: opacity 0.5s;  
    opacity: 0.9;
}

.error-message {
  color: red;
  font-size: 13px;
  margin-bottom: 0;

}
.form-outline {
  position: relative;
  width: 100%;
}

.form-label {
  font-size: 16px;
}
</style>