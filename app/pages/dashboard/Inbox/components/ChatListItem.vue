<script setup lang="ts">
interface Chat {
  id: string;
  userAvatar: string;
  userName: string;
  status: string;
  unreadCount: number;
  lastMessage: string;
}

defineProps<{
  chat: Chat;
  active: boolean;
}>();

const emit = defineEmits<{
  (e: "select", id: string): void;
}>();
</script>

<template>
  <div class="user-item" :class="{ active }" @click="emit('select', chat.id)">
    <div class="avatar-box">
      <img :src="chat.userAvatar" :alt="chat.userName" />
      <span class="status-dot" :class="chat.status" />
    </div>
    <div class="user-info">
      <div class="top">
        <strong>{{ chat.userName }}</strong>
        <span v-if="chat.unreadCount > 0" class="unread">
          {{ chat.unreadCount }}
        </span>
      </div>
      <p class="last-msg">
        {{ chat.lastMessage }}
      </p>
    </div>
  </div>
</template>
