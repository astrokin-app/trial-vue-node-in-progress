<script setup lang="ts">
import router from '@/router'
import DynamicForm from '@/components/DynamicForm.vue'
import * as Yup from 'yup'

const formSchema = {
  fields: [
    {
      label: 'Nom d\'utilisateur',
      name: 'name',
      as: 'input',
      rules: Yup.string().required(),
    },
    {
      label: 'Addresse e-mail',
      name: 'email',
      as: 'input',
      rules: Yup.string().required().email(),
    },
    {
      label: 'Password',
      name: 'password',
      as: 'input',
      type: 'password',
      rules: Yup.string().min(6).required(),
    },
  ],
};

const loginRedirect = () => {
  router.push("/login")
}
</script>

<template>
  <DynamicForm :schema="formSchema">
    <template #header>
      <img src="@/assets/nw-logo.jpg" alt="">
    </template>
    <template #body>
      <h3 class="mb-4">Démarrer avec NW Group!</h3>
      <p class="text-muted text-sm mb-5">Veuillez créer un compte de connextion ci dessous :</p>
    </template>
    <template #footer>
      <div class="text-sm text-muted">Vous avez un compte ? <a @click="loginRedirect()" style="cursor: pointer">Se connecter</a>.</div>
    </template>
  </DynamicForm>
</template>