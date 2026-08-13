<script setup lang="ts">
import NotificationStatusIcon from "./NotificationStatusIcon.vue";

interface Notification {
  id: number;
  type: "success" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface Props {
  notification: Notification;
}

defineProps<Props>();

const emit = defineEmits<{
  markAsRead: [id: number];
}>();
</script>

<template>
  <article
    class="notificationsItem"
    :class="{ 'is-unread': !notification.isRead }"
    @click="emit('markAsRead', notification.id)"
  >
    <NotificationStatusIcon
      :type="notification.type"
      :is-read="notification.isRead"
    />

    <div class="notificationsContent">
      <div class="notificationsContent-main">
        <h4 class="notificationsContent-title">
          {{ notification.title }}
        </h4>
        <time class="notificationsContent-time">
          {{ notification.time }}
        </time>
      </div>
      <p class="notificationsContent-message">
        {{ notification.message }}
      </p>
      <div v-if="!notification.isRead" class="actions">
        <button
          type="button"
          class="notificationsContent-btnRead"
          @click.stop="emit('markAsRead', notification.id)"
        >
          Mark as read
        </button>
      </div>
    </div>
  </article>
</template>
