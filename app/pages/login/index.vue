<script setup lang="ts">
const email = ref("");
const password = ref("");
const error = ref("");
const authStore = useAuthStore();

const handleLogin = async () => {
  const result = authStore.login({ email: email.value, pass: password.value });

  if (result.success) {
    const dashboardUrl =
      result.role === "admin" ? "/dashboard" : "/dashboard/my-rentals";
    window.open(dashboardUrl, "_blank");
    await navigateTo("/");
  } else {
    error.value = result.message || "Invalid credentials";
  }
};

const copied = ref("");

const copyToClipboard = async (text: string, key: string) => {
  await navigator.clipboard.writeText(text);

  copied.value = key;

  setTimeout(() => {
    copied.value = "";
  }, 1500);
};
</script>

<template>
  <div class="login-container">
    <div class="login-card card">
      <div class="login-header">
        <h2>Welcome</h2>
        <div class="demo-info">
          <span class="info-icon">i</span>

          <div class="tooltip">
            <h4>Demo Accounts</h4>

            <div class="account">
              <strong>Admin</strong>

              <div class="copy-row">
                <span>Email: admin@morent.com</span>

                <button
                  type="button"
                  class="copy-btn"
                  @click="copyToClipboard('admin@morent.com', 'admin-email')"
                >
                  {{ copied === "admin-email" ? "✓" : "📋" }}
                </button>
              </div>

              <div class="copy-row">
                <span>Password: 123</span>

                <button
                  type="button"
                  class="copy-btn"
                  @click="copyToClipboard('123', 'admin-password')"
                >
                  {{ copied === "admin-password" ? "✓" : "📋" }}
                </button>
              </div>
            </div>

            <div class="account">
              <strong>User</strong>

              <div class="copy-row">
                <span>Email: user@morent.com</span>

                <button
                  type="button"
                  class="copy-btn"
                  @click="copyToClipboard('user@morent.com', 'user-email')"
                >
                  {{ copied === "user-email" ? "✓" : "📋" }}
                </button>
              </div>

              <div class="copy-row">
                <span>Password: 123</span>

                <button
                  type="button"
                  class="copy-btn"
                  @click="copyToClipboard('123', 'user-password')"
                >
                  {{ copied === "user-password" ? "✓" : "📋" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>Please enter your credentials.</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="input-group">
          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="btn btn--primary login-btn">Log In</button>
      </form>
    </div>
  </div>
</template>
