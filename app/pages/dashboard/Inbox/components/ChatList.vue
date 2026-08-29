<script setup lang="ts">

import ChatListItem from "./ChatListItem.vue";

interface Chat {
  id: string;
  userAvatar: string;
  userName: string;
  status: string;
  unreadCount: number;
  lastMessage: string;
}

defineProps<{
  chats: Chat[];
  activeChatId: string | null;
}>();

const emit = defineEmits<{
  (e: "select-chat", id: string): void;
}>();
</script>

<template>
  <aside class="chat-list">
    <div class="list-header">
      <h3>Messages</h3>
      <span class="badge">
        {{ chats.length }}
      </span>
    </div>
    <div class="search-messages">
      <input type="text" placeholder="Search chats..." />
    </div>
    <div class="users">
      <ChatListItem
        v-for="chat in chats"
        :key="chat.id"
        :chat="chat"
        :active="activeChatId === chat.id"
        @select="emit('select-chat', $event)"
      />
    </div>
  </aside>
</template>
