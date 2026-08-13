<script setup lang="ts">
import { useNotificationStore } from "@/stores/useNotification";
import NotificationItem from "./components/NotificationItem.vue";
import NotificationEmptyState from "./components/NotificationEmptyState.vue";

const notificationStore = useNotificationStore();
</script>

<template>
  <div class="notifications-page">
    <div class="container">
      <header class="page-header">
        <div class="header-content">
          <h1>Notifications</h1>
          <p>Manage your car rental updates and account activities.</p>
        </div>
        <button
          v-if="notificationStore.unreadCount > 0"
          type="button"
          class="btn-mark-all"
          @click="notificationStore.markAllAsRead"
        >
          Mark all as read
        </button>
      </header>

      <main class="notifications-container card">
        <div
          v-if="notificationStore.notifications.length"
          class="notifications-list"
        >
          <NotificationItem
            v-for="notification in notificationStore.notifications"
            :key="notification.id"
            :notification="notification"
            @mark-as-read="notificationStore.markAsRead"
          />
        </div>

        <NotificationEmptyState v-else />
      </main>
    </div>
  </div>
</template>
