<script setup lang="ts">
defineProps<{
  text: string;
  time: string;
  isMe: boolean;
}>();
</script>

<template>
  <div class="message-wrapper" :class="{ me: isMe }">
    <div class="message-bubble">
      <p>{{ text }}</p>
      <span class="time">
        {{ time }}
      </span>
    </div>
  </div>
</template>
