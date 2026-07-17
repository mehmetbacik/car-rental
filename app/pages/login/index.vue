<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import DemoAccounts from "./components/DemoAccounts.vue";
</script>

<template>
  <div class="login-container">
    <div class="login-card card">
      <div class="login-header">
        <h2>Welcome</h2>
        <DemoAccounts />
      </div>
      <p>Please enter your credentials.</p>
      <LoginForm />
    </div>
  </div>
</template>
