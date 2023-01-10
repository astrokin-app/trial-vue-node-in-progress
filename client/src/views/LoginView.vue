<script setup lang="ts">
import router from '@/router'
import DynamicForm from '@/components/DynamicForm.vue'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores/AuthStore';
import { User } from '@/models/UsersModel';

const formSchema = {
  fields: [
    {
      label: 'Addresse e-mail',
      name: 'email',
      as: 'input',
      rules: Yup.string().email().required(),
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

const handleLogin = (e: string) => {
  const { email, password } = JSON.parse(e)
  const user:User = {
    email: email,
    password: password
  }

  const authStore = useAuthStore()

  authStore.login(user)
  .then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}

const registerRedirect = () => {
  router.push("/register")
}

</script>

<template>
  <DynamicForm :schema="formSchema" :btn-label="'Se connecter'" @submit-form="(e) => handleLogin(e)">
    <template #header>
      <img src="@/assets/nw-logo.jpg" alt="">
    </template>
    <template #body>
      <h3 class="mb-4">Bonjour et bienvenue!</h3>
      <p class="text-muted text-sm mb-5">Veuillez saisir vos identifiants de connexion ci dessous :</p>
    </template>
    <template #footer>
      <div class="text-sm text-muted">Vous n'avez pas de compte ? <a @click="registerRedirect()" style="cursor: pointer">S'enregister</a>.</div>
    </template>
  </DynamicForm>
</template>