import { defineStore } from "pinia";
import { ref } from "vue";
import { usersData } from "@/data/usersData";
import type { userType } from "@/types/users";
import { navigateTo } from "#app";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<userType | null>(null);
  const isAuthenticated = ref(false);

  const SESSION_DURATION = 2 * 60 * 60 * 1000;

  const login = (credentials: { email: string; pass: string }) => {
    const foundUser = usersData.find(
      (u) => u.email === credentials.email && u.password === credentials.pass,
    );

    if (foundUser) {
      const expiry = Date.now() + SESSION_DURATION;

      user.value = foundUser;
      isAuthenticated.value = true;

      localStorage.setItem(
        "auth_data",
        JSON.stringify({
          user: foundUser,
          expiry,
        }),
      );

      return { success: true, role: foundUser.role };
    }

    return { success: false, message: "Incorrect email or password!" };
  };

  const initAuth = () => {
    if (process.client) {
      const data = localStorage.getItem("auth_data");
      if (!data) return;

      try {
        const parsed = JSON.parse(data);
        if (Date.now() < parsed.expiry) {
          user.value = parsed.user;
          isAuthenticated.value = true;
        } else {
          logout();
        }
      } catch (e) {
        localStorage.removeItem("auth_data");
      }
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;

    localStorage.removeItem("auth_data");

    navigateTo("/login");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
});
