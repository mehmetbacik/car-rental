export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return navigateTo('/login')
  }

  const userRole = authStore.user?.role

  if (to.path.startsWith('/dashboard') && !to.path.startsWith('/dashboard/my-rentals')) {
    if (userRole !== 'admin') {
      return navigateTo('/dashboard/my-rentals')
    }
  }

  if (to.path === '/dashboard/my-rentals' && userRole === 'admin') {
    return navigateTo('/dashboard')
  }
})