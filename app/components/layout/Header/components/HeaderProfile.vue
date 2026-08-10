<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfileStore } from "@/stores/useProfile";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const router = useRouter();
const profileContainer = ref<HTMLElement | null>(null);

const ProfilePath = "/icons/profile.svg";

const isUserLoggedIn = computed(() => authStore.isAuthenticated);
const currentUser = computed(() => authStore.user);
const isMounted = ref(false);

const handleLogout = async () => {
  await authStore.logout();
  profileStore.closeDropdown();
  router.push("/");
};

onMounted(() => {
  authStore.initAuth();
  isMounted.value = true;
});

const checkGuestStatus = computed(() => {
  if (!isMounted.value) return false;
  return !authStore.isAuthenticated;
});

defineExpose({ profileContainer });
</script>

<template>
  <div class="user-profile-wrapper" ref="profileContainer">
    <div class="user-avatar" @click="profileStore.toggleDropdown">
      <img
        :src="
          authStore.isAuthenticated
            ? authStore.user?.avatar || ProfilePath
            : ProfilePath
        "
        :alt="authStore.isAuthenticated ? authStore.user?.name : 'Guest'"
        :class="{ 'is-guest': checkGuestStatus }"
      />
    </div>

    <transition name="slide-up">
      <div v-if="profileStore.isDropdownOpen" class="profile-dropdown">
        <template v-if="isUserLoggedIn">
          <div class="dropdown-user-info">
            <p class="name">{{ currentUser?.name }}</p>
            <p class="role">{{ currentUser?.role }}</p>
          </div>
          <div class="dropdown-divider"></div>
          <NuxtLink
            to="/profile"
            class="dropdown-item myProfile-btn"
            @click="profileStore.closeDropdown"
          >
            My Profile
          </NuxtLink>
          <a
            href="/dashboard"
            target="_blank"
            class="dropdown-item dashboard-btn"
            @click="profileStore.closeDropdown"
          >
            Dashboard
          </a>
          <div class="dropdown-divider"></div>
          <button class="logout-btn" @click="handleLogout">Sign Out</button>
        </template>

        <template v-else>
          <div class="dropdown-guest-info">
            <p class="title">Welcome!</p>
            <p class="subtitle">Join us to manage your account.</p>
          </div>
          <div class="dropdown-divider"></div>
          <NuxtLink
            to="/login"
            class="dropdown-item login-btn"
            @click="profileStore.closeDropdown"
          >
            Sign In
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="dropdown-item register-btn"
            @click="profileStore.closeDropdown"
          >
            Register
          </NuxtLink>
        </template>
      </div>
    </transition>
  </div>
</template>
