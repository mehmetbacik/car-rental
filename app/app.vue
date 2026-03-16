<script setup lang="ts">
const authStore = useAuthStore();
onMounted(() => authStore.initAuth());
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
