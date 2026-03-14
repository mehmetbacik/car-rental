<script setup lang="ts">
const authStore = useAuthStore()

onMounted(() => {
  if (process.client) {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      authStore.user = JSON.parse(savedUser)
      authStore.isAuthenticated = true
    }
  }
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
