<script setup lang="ts">
const authStore = useAuthStore();

const handleLogout = async () => {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (!confirmLogout) return;

  await authStore.logout();
};
</script>

<template>
  <div class="sidebar-footer">
    <button type="button" class="nav-link logout" @click="handleLogout">
      Log Out
    </button>
  </div>
</template>
