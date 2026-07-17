<script setup lang="ts">
const email = ref("");
const password = ref("");
const error = ref("");

const authStore = useAuthStore();

const handleLogin = async () => {
  error.value = "";

  const result = authStore.login({
    email: email.value,
    pass: password.value,
  });

  if (!result.success) {
    error.value = result.message ?? "Invalid credentials";
    return;
  }

  const dashboardUrl =
    result.role === "admin" ? "/dashboard" : "/dashboard/my-rentals";

  window.open(dashboardUrl, "_blank");

  await navigateTo("/");
};
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div class="input-group">
      <label for="email">Email</label>

      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        autocomplete="email"
        required
      />
    </div>

    <div class="input-group">
      <label for="password">Password</label>

      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
        autocomplete="current-password"
        required
      />
    </div>

    <p v-if="error" class="error-msg">
      {{ error }}
    </p>

    <button type="submit" class="btn btn--primary login-btn">Log In</button>
  </form>
</template>
