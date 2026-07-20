<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import DemoAccounts from "./components/DemoAccounts.vue";
</script>

<template>
  <div class="loginPage container">
    <div class="loginCard">
      <div class="loginHeader">
        <div class="loginTitle-wrapper">
          <h2 class="loginTitle">Welcome</h2>
          <DemoAccounts />
        </div>
        <p class="loginDescription">Please enter your credentials.</p>
      </div>
      <div class="loginForm">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
