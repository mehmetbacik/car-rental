<script setup lang="ts">
const message = ref("");

const emit = defineEmits<{
  (e: "send", message: string): void;
}>();

const handleSend = () => {
  const value = message.value.trim();

  if (!value) {
    return;
  }

  emit("send", value);
  message.value = "";
};
</script>

<template>
  <footer class="chat-footer">
    <input
      v-model="message"
      type="text"
      placeholder="Type your message..."
      @keyup.enter="handleSend"
    />
    <button class="send-btn" @click="handleSend">Send</button>
  </footer>
</template>
