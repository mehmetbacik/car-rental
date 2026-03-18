<script setup lang="ts">
import { dashboardNavItems } from "@/data/navigationData";

const uiStore = useUIStore();
const authStore = useAuthStore();
const route = useRoute();

const filteredMenu = computed(() => {
  const userRole = authStore.user?.role;
  if (!userRole) return [];

  return dashboardNavItems.filter((item) => item.roles.includes(userRole));
});

const isAuthorized = computed(() => {
  const targetNav = dashboardNavItems.find((item) => item.link === route.path);
  if (!targetNav) return true;
  return targetNav.roles.includes(authStore.user?.role as any);
});

const handleLogout = async () => {
  const confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    await authStore.logout();
  }
};

const DarkIconPath = "/icons/dark.svg";
const LightIconPath = "/icons/light.svg";
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-top">
        <div class="sidebar-group">
          <p class="sidebar-label">MAIN MENU</p>
          <NuxtLink
            v-for="item in filteredMenu"
            :key="item.id"
            :to="item.link"
            class="nav-link"
            active-class="active"
          >
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.label }}</span>
          </NuxtLink>
        </div>

        <div class="sidebar-group">
          <p class="sidebar-label">PREFERENCES</p>
          <NuxtLink to="/dashboard/settings" class="nav-link">
            Settings
          </NuxtLink>
          <NuxtLink to="/dashboard/help" class="nav-link">
            Help & Center
          </NuxtLink>
          <button
            class="nav-link theme-toggle"
            @click="uiStore.toggleDarkMode()"
          >
            Dark Mode
            <span class="toggle-icon">
              <img
                :src="uiStore.isDarkMode ? DarkIconPath : LightIconPath"
                :alt="uiStore.isDarkMode ? 'Dark' : 'Light'"
              />
            </span>
          </button>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="nav-link logout" @click="handleLogout">Log Out</button>
      </div>
    </aside>

    <main class="admin-main">
      <template v-if="isAuthorized">
        <slot />
      </template>
      <div v-else class="loading-overlay">
        <p>Loading...</p>
      </div>
    </main>
  </div>
</template>
