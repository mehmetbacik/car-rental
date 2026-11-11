import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Software Developer",
      avatar: "/images/avatar/avatar-1.jpg",
      location: "Istanbul, Turkey",
      bio: "Frontend enthusiast & car lover.",
      phone: "+90 555 000 00 00",
      joinedDate: "April 2026",
      address: "Levent, Beşiktaş",
    },
    isDropdownOpen: false,
  }),

  getters: {
    firstName: (state) => state.user.name.split(" ")[0],

    isProfileComplete: (state) => {
      return !!(state.user.name && state.user.email && state.user.phone);
    },
  },

  actions: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },

    closeDropdown() {
      this.isDropdownOpen = false;
    },

    updateAvatar(newUrl: string) {
      this.user.avatar = newUrl;
    },

    updateProfile(data: any) {
      this.user = { ...this.user, ...data };
    },
  },
});
