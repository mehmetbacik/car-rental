import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    isDropdownOpen: false,
    darkMode: false,
    language: "English",
    notificationsEnabled: true,
    currency: "USD",
  }),
  actions: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      if (process.client) {
        document.documentElement.classList.toggle("dark-mode", this.darkMode);
      }
    },
  },
});
