import { dashboardNavItems } from "@/data/navigationData";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;

  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    authStore.initAuth();
  }

  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login", { replace: true });
  }

  if (to.path.startsWith("/dashboard")) {
    const userRole = authStore.user?.role;
    const targetNav = dashboardNavItems.find((item) => item.link === to.path);

    if (targetNav && !targetNav.roles.includes(userRole as any)) {
      const redirectPath =
        userRole === "admin" ? "/dashboard" : "/dashboard/myrentals";
      return navigateTo(redirectPath, { replace: true });
    }
  }
});
