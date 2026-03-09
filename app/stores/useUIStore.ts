import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const isDarkMode = ref(false)
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }

  return { isDarkMode, toggleDarkMode }
})