<script setup lang="ts">
const email = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();

const handleLogin = async () => {
  const result = authStore.login({ email: email.value, pass: password.value });
  
  if (result.success) {
    if (result.role === "admin") {
      await navigateTo("/dashboard");
    } else {
      await navigateTo("/dashboard/my-rentals");
    }
  } else {
    error.value = result.message || "Invalid credentials";
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card card">
      <h2>Welcome</h2>
      <p>Please enter your credentials.</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@morent.com"
            required
          />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="123"
            required
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="btn btn--primary login-btn">Log In</button>
      </form>
    </div>
  </div>
</template>
