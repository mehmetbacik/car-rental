<script setup lang="ts">
import { dashboardNavItems } from "@/data/navigationData";
import DashboardMobileHeader from "./components/DashboardMobileHeader.vue";
import DashboardSidebar from "./components/DashboardSidebar.vue";

const authStore = useAuthStore();
const route = useRoute();

const isSidebarOpen = ref(false);

const isAuthorized = computed(() => {
  const targetNav = dashboardNavItems.find((item) => item.link === route.path);

  if (!targetNav) return true;

  return targetNav.roles.includes(authStore.user?.role as any);
});

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeSidebar();
  }
};

watch(
  () => route.path,
  () => {
    closeSidebar();
  },
);

onMounted(() => {
  window.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <div class="adminLayout">
    <DashboardMobileHeader @toggle="toggleSidebar" />
    <Transition name="fade">
      <div v-if="isSidebarOpen" class="sidebarOverlay" @click="closeSidebar" />
    </Transition>
    <DashboardSidebar :is-open="isSidebarOpen" @close="closeSidebar" />
    <main class="adminMain">
      <template v-if="isAuthorized">
        <slot />
      </template>
      <div v-else class="loadingOverlay">
        <p>Loading...</p>
      </div>
    </main>
  </div>
</template>
