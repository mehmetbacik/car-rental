<script setup lang="ts">
import { Icon } from "@iconify/vue";

const uiStore = useUIStore();
</script>

<template>
  <div class="adminSidebar-sidebarGroup">
    <p class="adminSidebar-sidebarLabel">PREFERENCES</p>

    <NuxtLink to="/dashboard/settings" class="adminSidebar-navLink">
      <Icon icon="mdi:cog-outline" width="20" height="20" />
      <span>Settings</span>
    </NuxtLink>

    <NuxtLink to="/" target="_blank" class="adminSidebar-navLink">
      <Icon icon="mdi:home-outline" width="20" height="20" />
      <span>Preview</span>
    </NuxtLink>

    <button
      type="button"
      class="adminSidebar-navLink theme-toggle"
      @click="uiStore.toggleDarkMode()"
    >
      <span class="toggle-icon">
        <Icon
          :icon="
            uiStore.isDarkMode
              ? 'mdi:white-balance-sunny'
              : 'mdi:moon-waning-crescent'
          "
          width="20"
          height="20"
        />
      </span>
      <span>{{ uiStore.isDarkMode ? "Light Mode" : "Dark Mode" }}</span>
    </button>
  </div>
</template>
