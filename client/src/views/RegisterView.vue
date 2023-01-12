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
    {
      label: 'Confirmer le mot de passe',
      name: 'confirmPassword',
      as: 'input',
      type: 'password',
      rules: Yup.string().min(6).required(),
    }
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
  router.push("/")
}
</script>

<template>
  <div class="register-view row">
    <div class="register-form col d-flex justify-content-center align-items-center">
      <DynamicForm :schema="formSchema" :btn-label="'S\'enregister'" @submit-form="(e) => handleRegister(e)">
        <template #footer>
          <div class="text-sm text-muted">Vous avez un compte ? <a @click="loginRedirect()" style="cursor: pointer; color: hsl(101deg 94% 36%);" >Se connecter</a>.</div>
        </template>
      </DynamicForm>
    </div>
  </div>
</template>

<style scoped>
.register-view {
  height: 100vh;
}
</style>