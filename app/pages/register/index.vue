<script setup lang="ts">
import RegisterForm from "./components/RegisterForm.vue";
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card card shadow">
        <div class="register-header">
          <h2>Create Account</h2>
          <p>Join us today! It only takes a minute.</p>
        </div>

        <RegisterForm />

        <div class="register-footer">
          <p>
            Already have an account?
            <NuxtLink to="/login">Log In</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
