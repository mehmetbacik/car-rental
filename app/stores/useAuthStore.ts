import { defineStore } from "pinia";
import { usersData } from "@/data/usersData";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<any>(null);
  const isAuthenticated = ref(false);

  const initAuth = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      isAuthenticated.value = true;
    }
  };

  const login = (credentials: { email: string; pass: string }) => {
    const foundUser = usersData.find(
      (u) => u.email === credentials.email && u.password === credentials.pass,
    );

    if (foundUser) {
      user.value = foundUser;
      isAuthenticated.value = true;
      localStorage.setItem("user", JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: "Incorrect email or password!" };
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("user");
    navigateTo("/login");
  };

  return { user, isAuthenticated, login, logout, initAuth };
});
