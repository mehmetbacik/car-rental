<script setup lang="ts">
import { useNotificationStore } from "@/stores/useNotification";

const notificationStore = useNotificationStore();

const getStatusConfig = (type: string) => {
  switch (type) {
    case "success":
      return {
        class: "icon-success",
        path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      };
    case "warning":
      return {
        class: "icon-warning",
        path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      };
    default:
      return {
        class: "icon-info",
        path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      };
  }
};
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
          @click="notificationStore.markAllAsRead"
          class="btn-mark-all"
        >
          Mark all as read
        </button>
      </header>

      <main class="notifications-container card">
        <div
          v-if="notificationStore.notifications.length > 0"
          class="notifications-list"
        >
          <div
            v-for="n in notificationStore.notifications"
            :key="n.id"
            class="notification-item"
            :class="{ 'is-unread': !n.isRead }"
            @click="notificationStore.markAsRead(n.id)"
          >
            <div class="status-icon" :class="getStatusConfig(n.type).class">
              <div class="dot" v-if="!n.isRead"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="getStatusConfig(n.type).path"
                />
              </svg>
            </div>

            <div class="notification-content">
              <div class="content-main">
                <h4 class="title">{{ n.title }}</h4>
                <span class="time">{{ n.time }}</span>
              </div>
              <p class="message">{{ n.message }}</p>

              <div class="actions" v-if="!n.isRead">
                <button class="btn-read">Mark as read</button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#90A3BF"
              class="w-10 h-10"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3>No notifications yet</h3>
          <p>When you receive notifications, they will appear here.</p>
          <NuxtLink to="/" class="btn-back">Go to Dashboard</NuxtLink>
        </div>
      </main>
    </div>
  </div>
</template>
