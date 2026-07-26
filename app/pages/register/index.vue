<script setup lang="ts">
import RegisterForm from "./components/RegisterForm.vue";
</script>

<template>
  <div class="registerPage container">
    <div class="registerCard">
      <div class="registerHeader">
        <h2 class="registerTitle">Create Account</h2>
        <p class="registerDescription">
          Join us today! It only takes a minute.
        </p>
      </div>
      <div class="registerForm">
        <RegisterForm />
      </div>
      <div class="registerFooter">
        <p>
          Already have an account?
          <NuxtLink to="/login">Log In</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
