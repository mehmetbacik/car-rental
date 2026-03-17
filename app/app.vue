<script setup lang="ts">
const authStore = useAuthStore();
if (process.client) {
  authStore.initAuth();
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>