<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const router = useRouter();
const authStore = useAuthStore();

const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

const error = ref("");
const isLoading = ref(false);

const handleRegister = async () => {
  error.value = "";

  if (formData.password !== formData.confirmPassword) {
    error.value = "Passwords do not match!";
    return;
  }

  if (!formData.terms) {
    error.value = "Please accept the Terms & Conditions.";
    return;
  }

  isLoading.value = true;

  try {
    setTimeout(() => {
      isLoading.value = false;
      router.push("/login");
    }, 1500);
  } catch (err: any) {
    isLoading.value = false;
    error.value = err.message || "An error occurred during registration.";
  }
};
</script>

<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card card shadow">
        <div class="register-header">
          <h2>Create Account</h2>
          <p>Join us today! It only takes a minute.</p>
        </div>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label>Full Name</label>
            <div class="input-wrapper">
              <input
                v-model="formData.name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <input
                v-model="formData.email"
                type="email"
                placeholder="example@mail.com"
                required
              />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label>Password</label>
              <div class="input-wrapper">
                <input
                  v-model="formData.password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="input-wrapper">
                <input
                  v-model="formData.confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-container">
              <input type="checkbox" v-model="formData.terms" />
              <span class="checkmark"></span>
              <span class="text"
                >I agree to the <strong>Terms & Conditions</strong></span
              >
            </label>
          </div>

          <p v-if="error" class="error-msg">{{ error }}</p>

          <button
            type="submit"
            class="btn btn--primary register-btn"
            :disabled="isLoading"
          >
            {{ isLoading ? "Creating Account..." : "Sign Up" }}
          </button>
        </form>

        <div class="register-footer">
          <p>
            Already have an account? <NuxtLink to="/login">Log In</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
