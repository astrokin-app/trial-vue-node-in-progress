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
      label: 'Mot de passe',
      name: 'password',
      as: 'input',
      type: 'password',
      rules: Yup.string().min(6).required(),
    }
  ],
};

const authStore = useAuthStore()

const handleLogin = (e: string) => {
  const { email, password } = JSON.parse(e)
  const user:User = {
    email: email,
    password: password
  }

  authStore.login(user)
  .then(res => {
    alert('Logged in successfully!');
  }).catch(e => {
    alert('ERROR Login!');
  }).finally(() => {
    authStore.loading = false
  })
}

const registerRedirect = () => {
  router.push("/register")
}

</script>

<template>
  <div class="login-view flex-lg-row row">
    <div class="login-form col d-flex justify-content-center align-items-center">
      <DynamicForm :schema="formSchema" :btn-label="'Se connecter'" @submit-form="(e) => handleLogin(e)">
        <template #footer>
          <div class="text-sm text-muted"><p>Veuillez saisir vos identifiants de connexion.</p></div>
        </template>
      </DynamicForm>
    </div>
    <div class="register-redirect col d-flex justify-content-center align-items-center">
      <div class="w-50 mt-2">
        <h2>Créer un compte</h2>
        <a @click="registerRedirect()" class="submit-link">S'enregister</a>
        <div class="m-4 text-sm text-white">
          <p>Obtenez une vue précise et complète des compétences techniques de NW Groupe.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-view
{
  height: $vh-height;
}

.login-form {
  padding-left: 0;
  padding-right: 0;
}

.register-redirect{
    background-color: $primary-color;
}

.submit-link {
  background: $white-color;
  outline: none;
  border: none;
  color: $primary-color;
  font-size: 18px;
  padding: 10px 15px;
  display: block;
  width: 100%;
  border-radius: 7px;
  margin-top: 40px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
}

.submit-link:hover {    
  transition: opacity 0.5s;  
  opacity: 0.9;
}
</style>