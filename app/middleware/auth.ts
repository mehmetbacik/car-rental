export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (to.path.startsWith('/dashboard') && authStore.user?.role !== 'admin') {
    return navigateTo('/')
  }
})