<script setup lang="ts">
import { ref } from 'vue';
const userlogin = ref(true)
const userregister = ref(false)
const email = ref('')
const password = ref('')
const name = ref('')

const userLogin = () => {
  userlogin.value = true,
  userregister.value = false
  resetFormValues()
}

const userRegister = () => {
  userlogin.value = false,
  userregister.value = true
  resetFormValues()
}

const resetFormValues = () => {
  email.value = ''
  password.value = ''
  name.value = ''
}
</script>

<template>
  <div class="page-holder align-items-center py-4 bg-gray-100 vh-100">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 px-lg-4"  v-if="userlogin">
            <div class="card">
              <div class="card-header px-lg-5">
                <img src="./assets/nw-logo.jpg" alt="">
                <!-- <div class="card-heading text-primary">NW Group Connexion</div> -->
              </div>
              <div class="card-body p-lg-5">
                <h3 class="mb-4">Bonjour et bienvenue!</h3>
                <p class="text-muted text-sm mb-5">Veuillez saisir vos identifiants de connexion ci dessous :</p>
                <form id="loginForm" action="index.html">
                  <div class="form-floating mb-3">
                    <input v-model="email" class="form-control" id="floatingInput" type="email" placeholder="name@example.com" required>
                    <label for="floatingInput">Addresse e-mail</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="password" class="form-control" id="floatingPassword" type="password" placeholder="Password" required>
                    <label for="floatingPassword">Mot de passe</label>
                  </div>
                  <!-- <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" name="remember" id="remember">
                    <label class="form-check-label" for="remember">Se souvenir de moi</label>
                  </div> -->
                  <button class="btn btn-primary" type="button">Se connecter</button>
                </form>
              </div>
              <div class="card-footer px-lg-5 py-lg-4">
                <div class="text-sm text-muted">Vous n'avez pas de compte ? <a @click="userRegister()" style="cursor: pointer">S'enregister</a>.</div>
              </div>
            </div>
          </div>
          <!-- register -->
           <div class="col-lg-12 px-lg-4" v-if="userregister">
            <div class="card">
              <div class="card-header px-lg-5">
                <img src="./assets/nw-logo.jpg" alt="">
              </div>
              <div class="card-body p-lg-5">
                <h3 class="mb-4">Démarrer avec NW Group!</h3>
                <p class="text-muted text-sm mb-5">Veuillez créer un compte de connextion ci dessous :</p>
                <form action="index.html">
                  <div class="form-floating mb-3">
                    <input v-model="name" class="form-control" id="username" type="username" placeholder="name@example.com" required>
                    <label for="username">Nom d'utilisateur</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="email" class="form-control" id="floatingInput" type="email" placeholder="name@example.com" required>
                    <label for="floatingInput">Addresse e-mail</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input v-model="password" class="form-control" id="floatingPassword" type="password" placeholder="Password" required>
                    <label for="floatingPassword">Mot de passe</label>
                  </div>
                  <!-- <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" name="agree" id="agree">
                    <label class="form-check-label" for="agree">I agree with the <a href="#">Terms & Conditions</a>.</label>
                  </div> -->
                  <div class="form-group">
                    <button class="btn btn-primary" id="regidter" type="button" name="registerSubmit">S'enregister</button>
                  </div>
                </form>
              </div>
              <div class="card-footer px-lg-5 py-lg-4">
                <div class="text-sm text-muted">Vous avez déjà un compte ? <a @click="userLogin()" style="cursor: pointer">Se connecter</a>.</div>
              </div>
            </div>
          </div>
         <!-- <div class="col-lg-6 col-xl-5 ms-xl-auto px-lg-4 text-center text-primary"><img class="img-fluid mb-4" width="300" src="https://therichpost.com/wp-content/uploads/2021/06/login_page_image.png" alt="" style="transform: rotate(10deg)">
            <h1 class="mb-4">Therichpost.com <br class="d-none d-lg-inline">free code  snippets.</h1>
            <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </div> -->
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
