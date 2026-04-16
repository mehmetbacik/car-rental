<script setup lang="ts">
import HeaderSearch from "./components/HeaderSearch.vue";
import HeaderFavorites from "./components/HeaderFavorites.vue";
import HeaderNotifications from "./components/HeaderNotifications.vue";
import HeaderSettings from "./components/HeaderSettings.vue";
import HeaderProfile from "./components/HeaderProfile.vue";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
const searchStore = useSearchStore();
const notificationStore = useNotificationStore();
const settingsStore = useSettingsStore();
const profileStore = useProfileStore();

const searchRef = ref();
const notificationRef = ref();
const settingsRef = ref();
const profileRef = ref();

const requireAuth = (callback: () => void) => {
  if (!authStore.isAuthenticated) router.push("/login");
  else callback();
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  if (
    searchRef.value?.searchInputContainer &&
    !searchRef.value.searchInputContainer.contains(target)
  ) {
    searchStore.closeDropdown();
  }
  if (
    notificationRef.value?.notificationContainer &&
    !notificationRef.value.notificationContainer.contains(target)
  ) {
    notificationStore.isDropdownOpen = false;
  }
  if (
    settingsRef.value?.settingsContainer &&
    !settingsRef.value.settingsContainer.contains(target)
  ) {
    settingsStore.isDropdownOpen = false;
  }
  if (
    profileRef.value?.profileContainer &&
    !profileRef.value.profileContainer.contains(target)
  ) {
    profileStore.closeDropdown();
  }
};

watch(
  () => route.path,
  () => {
    searchStore.closeDropdown();
    searchStore.searchQuery = "";
    notificationStore.isDropdownOpen = false;
    settingsStore.isDropdownOpen = false;
    profileStore.closeDropdown();
  },
);

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <NuxtLink to="/" class="header__logo">
        <img src="/images/logo.svg" alt="Logo" />
      </NuxtLink>

      <HeaderSearch ref="searchRef" />

      <div class="header__actions">
        <HeaderFavorites :require-auth="requireAuth" />
        <HeaderNotifications
          ref="notificationRef"
          :require-auth="requireAuth"
        />
        <HeaderSettings ref="settingsRef" :require-auth="requireAuth" />
        <HeaderProfile ref="profileRef" />
      </div>
    </div>
  </header>
</template>
