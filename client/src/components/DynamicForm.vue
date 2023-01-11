<script setup lang="ts">
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

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
      min: 'Ce champ doit contenir au minimum 6 characteres'
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

function onSubmit(values: any) {
  emit('submitForm', JSON.stringify(values, null, 2))
}
</script>

<template>
  <div class="col-lg-12 px-lg-4">
    <div class="card">
      <div class="card-header px-lg-5">
        <slot name="header"></slot>
      </div>
      <div class="card-body p-lg-5">
        <slot name="body"></slot>
        <Form @submit="onSubmit" class="form-group" style="text-align: initial">
          <div
            class="form-outline"
            v-for="{ as, name, label, ...attrs } in schema.fields"
            :key="name"
          >
            <label :for="name" class="form-label"></label>
            <Field class="form-control" :placeholder="label" :as="as" :id="name" :name="name" v-bind="attrs" :rules="name === 'email' ? 'required|email' : name === 'password' ? 'required|min:6' : 'required'"/>
            <ErrorMessage class="error-message" as="div" :name=name v-slot="{ message }">
              <p>{{ message }}</p>
            </ErrorMessage>
          </div>
          <button class="submit-btn">{{ btnLabel }}</button>
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

.submit-btn {
  background: rgb(3 111 186);
  outline: none;
  border: none;
  color: #fff;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
}

.submit-btn:hover, .submit-btn:focus, .submit-btn:active, .submit-btn.active, .open>.dropdown-toggle.submit-btn {
    color: #fff;
    background-color: rgb(42, 102, 145);
    border-color: #285e8e;
    transform: scale(1.01);
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