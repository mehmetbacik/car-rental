<script setup lang="ts">
const emit = defineEmits<{
  (e: "start-chat"): void;
}>();
</script>

<template>
  <aside class="contact-support card">
    <h3>Still need help?</h3>
    <p>Our support team is available 24/7 to assist you.</p>
    <div class="contact-methods">
      <div class="method">
        <span class="m-icon">✉️</span>
        <div class="m-text">
          <strong>Email Support</strong>
          <span>support@morent.com</span>
        </div>
      </div>
      <div class="method">
        <span class="m-icon">💬</span>
        <div class="m-text">
          <strong>Live Chat</strong>
          <span>Average wait: 2 mins</span>
        </div>
      </div>
    </div>
    <button class="btn-contact-primary" @click="emit('start-chat')">
      Start Live Chat
    </button>
  </aside>
</template>
