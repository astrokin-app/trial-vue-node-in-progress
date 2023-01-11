<script setup lang="ts">
import router from '@/router'
import DynamicForm from '@/components/DynamicForm.vue'
import * as Yup from 'yup'
import { User } from '@/models/UsersModel';
import { useAuthStore } from '@/stores/AuthStore';

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
      rules: Yup.string().email().required(),
    },
    {
      label: 'Mot de passe',
      name: 'password',
      as: 'input',
      type: 'password',
      rules: Yup.string().min(6).required(),
    },
  ],
};

const authStore = useAuthStore()

const handleRegister = (e: any) => {
  const { name, email, password } = JSON.parse(e)
  const user:User = {
    username: name,
    email: email,
    password: password
  }

  authStore.register(user)
  .then(res => {
    alert('Register successfully!');
    // router.push("/profile")
  }).catch(e => {
    console.log(e)
  })
}

const loginRedirect = () => {
  router.push("/login")
}
</script>

<template>
  <DynamicForm :schema="formSchema" :btn-label="'S\'enregister'" @submit-form="(e) => handleRegister(e)">
    <template #header>
      <img src="@/assets/nw-logo.jpg" alt="">
    </template>
    <template #body>
      <h3 class="mb-4">Démarrer avec NW Group!</h3>
      <p class="text-muted text-sm mb-2">Veuillez créer un compte de connextion ci dessous :</p>
    </template>
    <template #footer>
      <div class="text-sm text-muted">Vous avez un compte ? <a @click="loginRedirect()" style="cursor: pointer; color: rgb(3 111 186);" >Se connecter</a>.</div>
    </template>
  </DynamicForm>
</template>