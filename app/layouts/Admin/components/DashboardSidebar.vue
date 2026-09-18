<script setup lang="ts">
import { dashboardNavItems } from "@/data/navigationData";
import DashboardNavItem from "./DashboardNavItem.vue";
import DashboardPreferences from "./DashboardPreferences.vue";
import DashboardSidebarFooter from "./DashboardSidebarFooter.vue";

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const authStore = useAuthStore();

const filteredMenu = computed(() => {
  const userRole = authStore.user?.role;

  if (!userRole) return [];

  return dashboardNavItems.filter((item) => item.roles.includes(userRole));
});
</script>

<template>
  <aside class="admin-sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar-top">
      <div class="sidebar-group">
        <p class="sidebar-label">MAIN MENU</p>

        <DashboardNavItem
          v-for="item in filteredMenu"
          :key="item.id"
          :item="item"
        />
      </div>

      <DashboardPreferences />
    </div>

    <DashboardSidebarFooter />
  </aside>
</template>
