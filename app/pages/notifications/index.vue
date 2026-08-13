<script setup lang="ts">
import { useNotificationStore } from "@/stores/useNotification";
import NotificationItem from "./components/NotificationItem.vue";
import NotificationEmptyState from "./components/NotificationEmptyState.vue";

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="notificationsPage container">
    <div class="notificationsHeader">
      <div>
        <h1>Notifications</h1>
        <p>Manage your car rental updates and account activities.</p>
      </div>
      <button
        v-if="notificationStore.unreadCount > 0"
        type="button"
        class="notifications-btnMarkAll"
        @click="notificationStore.markAllAsRead"
      >
        Mark all as read
      </button>
    </div>
    <div class="notificationsWrapper">
      <div
        v-if="notificationStore.notifications.length"
        class="notificationsList"
      >
        <NotificationItem
          v-for="notification in notificationStore.notifications"
          :key="notification.id"
          :notification="notification"
          @mark-as-read="notificationStore.markAsRead"
        />
      </div>
      <NotificationEmptyState v-else />
    </div>
  </div>
</template>
