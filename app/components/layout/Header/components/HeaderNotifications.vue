<script setup lang="ts">
import { ref } from "vue"; 
import { useNotificationStore } from "@/stores/useNotification";
import { useAuthStore } from "@/stores/useAuthStore";

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const notificationContainer = ref<HTMLElement | null>(null);

const props = defineProps<{
  requireAuth: (callback: () => void) => void;
}>();

defineExpose({ notificationContainer });
</script>

<template>
  <div
    class="notification-wrapper"
    ref="notificationContainer"
    title="Notification"
  >
    <button
      class="action-btn"
      @click="requireAuth(() => notificationStore.toggleDropdown())"
    >
      <span class="icon">
        <img src="/icons/notification.svg" alt="Notification" />
      </span>
      <span
        v-if="authStore.isAuthenticated && notificationStore.unreadCount > 0"
        class="badge"
      >
        {{ notificationStore.unreadCount }}
      </span>
    </button>

    <transition name="slide-up">
      <div
        v-if="notificationStore.isDropdownOpen"
        class="notification-dropdown card"
      >
        <div class="dropdown-header">
          <span>Notifications</span>
          <button @click="notificationStore.markAllAsRead">
            Mark all read
          </button>
        </div>

        <div class="dropdown-list">
          <template v-if="notificationStore.recentNotifications.length > 0">
            <div
              v-for="item in notificationStore.recentNotifications"
              :key="item.id"
              class="notification-item"
              :class="{ unread: !item.isRead }"
              @click="notificationStore.markAsRead(item.id)"
            >
              <div class="dot" v-if="!item.isRead"></div>
              <div class="content">
                <p class="title">{{ item.title }}</p>
                <p class="time">{{ item.time }}</p>
              </div>
            </div>
          </template>

          <div v-else class="empty-state">No new notifications</div>
        </div>

        <NuxtLink
          to="/notifications"
          class="view-all"
          @click="notificationStore.isDropdownOpen = false"
        >
          View All Notifications
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>
