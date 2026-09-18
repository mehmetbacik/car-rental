<script setup lang="ts">
import { Icon } from "@iconify/vue";

const uiStore = useUIStore();

const DarkIconPath = "/icons/dark.svg";
const LightIconPath = "/icons/light.svg";
</script>

<template>
  <div class="adminSidebar-sidebarGroup">
    <p class="adminSidebar-sidebarLabel">PREFERENCES</p>

    <NuxtLink to="/dashboard/settings" class="adminSidebar-navLink">
      <Icon icon="mdi:cog-outline" width="20" height="20" />

      <span>Settings</span>
    </NuxtLink>

    <NuxtLink to="/dashboard/help" class="adminSidebar-navLink">
      <Icon icon="mdi:help-circle-outline" width="20" height="20" />

      <span>Help & Center</span>
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
      <span>Dark Mode</span>

      <span class="toggle-icon">
        <img
          :src="uiStore.isDarkMode ? DarkIconPath : LightIconPath"
          :alt="uiStore.isDarkMode ? 'Dark' : 'Light'"
        />
      </span>
    </button>
  </div>
</template>
