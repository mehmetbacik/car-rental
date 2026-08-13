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
    class="notification-item"
    :class="{ 'is-unread': !notification.isRead }"
    @click="emit('markAsRead', notification.id)"
  >
    <NotificationStatusIcon
      :type="notification.type"
      :is-read="notification.isRead"
    />

    <div class="notification-content">
      <div class="content-main">
        <h4 class="title">
          {{ notification.title }}
        </h4>

        <time class="time">
          {{ notification.time }}
        </time>
      </div>

      <p class="message">
        {{ notification.message }}
      </p>

      <div v-if="!notification.isRead" class="actions">
        <button
          type="button"
          class="btn-read"
          @click.stop="emit('markAsRead', notification.id)"
        >
          Mark as read
        </button>
      </div>
    </div>
  </article>
</template>
