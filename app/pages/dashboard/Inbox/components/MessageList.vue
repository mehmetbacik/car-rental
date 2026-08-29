<script setup lang="ts">

import MessageBubble from "./MessageBubble.vue";

interface Message {
  id: string | number;
  text: string;
  time: string;
  isMe: boolean;
}

defineProps<{
  messages: Message[];
}>();
</script>

<template>
  <div class="messages-area">
    <MessageBubble
      v-for="message in messages"
      :key="message.id"
      :text="message.text"
      :time="message.time"
      :is-me="message.isMe"
    />
  </div>
</template>
