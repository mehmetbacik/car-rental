<script setup lang="ts">
import { Icon } from "@iconify/vue";

const authStore = useAuthStore();

const handleLogout = async () => {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (!confirmLogout) return;

  await authStore.logout();
};
</script>

<template>
  <div class="adminSidebar-sidebarFooter">
    <button type="button" class="adminSidebar-logout" @click="handleLogout">
      <Icon icon="mdi:logout" class="adminSidebar-logoutIcon" />
      <span>Log Out</span>
    </button>
  </div>
</template>
