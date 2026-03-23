import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    user: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Software Developer",
      avatar: "/images/avatar-default.png",
      location: "Istanbul, Turkey",
      bio: "Frontend enthusiast & car lover.",
    },
  }),
  actions: {
    updateAvatar(newUrl: string) {
      this.user.avatar = newUrl;
    },
    updateProfile(data: any) {
      this.user = { ...this.user, ...data };
    },
  },
});
