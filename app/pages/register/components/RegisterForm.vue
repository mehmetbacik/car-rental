<script setup lang="ts">
import { reactive, ref } from "vue";

const router = useRouter();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

const error = ref("");
const isLoading = ref(false);

const validate = () => {
  if (formData.password !== formData.confirmPassword) {
    error.value = "Passwords do not match!";
    return false;
  }

  if (!formData.terms) {
    error.value = "Please accept the Terms & Conditions.";
    return false;
  }

  return true;
};

const handleRegister = async () => {
  error.value = "";

  if (!validate()) return;

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    await navigateTo("/login");
  } catch (err: any) {
    error.value = err?.message ?? "An error occurred during registration.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div class="registerForm-row">
      <div class="registerForm-inputGroup">
        <label for="name">Full Name</label>
        <div class="input-wrapper">
          <input
            id="name"
            v-model="formData.name"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      <div class="registerForm-inputGroup">
        <label for="email">Email Address</label>
        <div class="input-wrapper">
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="example@mail.com"
            autocomplete="email"
            required
          />
        </div>
      </div>
    </div>
    <div class="registerForm-row">
      <div class="registerForm-inputGroup">
        <label for="password">Password</label>
        <div class="input-wrapper">
          <input
            id="password"
            v-model="formData.password"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            required
          />
        </div>
      </div>
      <div class="registerForm-inputGroup">
        <label for="confirmPassword">Confirm Password</label>
        <div class="input-wrapper">
          <input
            id="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="••••••••"
            autocomplete="new-password"
            required
          />
        </div>
      </div>
    </div>
    <div class="registerForm-options">
      <label class="checkbox-container">
        <input v-model="formData.terms" type="checkbox" />
        <span class="checkmark"></span>
        <span class="text">
          I agree to the <strong>Terms & Conditions</strong>
        </span>
      </label>
    </div>

    <p v-if="error" class="registerForm-errorMsg">
      {{ error }}
    </p>

    <button type="submit" class="registerForm-btn" :disabled="isLoading">
      {{ isLoading ? "Creating Account..." : "Sign Up" }}
    </button>
  </form>
</template>
