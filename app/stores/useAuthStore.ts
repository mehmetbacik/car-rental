import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({
    id: 'u1',
    name: 'John Doe',
    role: 'Admin',
    avatar: '/icons/profile.svg'
  })

  const isAuthenticated = ref(true)

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    navigateTo('/login')
  }

  return { user, isAuthenticated, logout }
})