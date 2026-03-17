import { dashboardNavItems } from "@/data/navigationData";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;

  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    authStore.initAuth();
  }

  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (to.path.startsWith("/dashboard")) {
    const userRole = authStore.user?.role;
    const targetNav = dashboardNavItems.find((item) => item.link === to.path);

    if (targetNav && !targetNav.roles.includes(userRole as any)) {
      return userRole === "admin"
        ? navigateTo("/dashboard")
        : navigateTo("/dashboard/my-rentals");
    }
  }
});