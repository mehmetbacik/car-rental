<script setup lang="ts">
defineProps<{
  userName: string;
  status: string;
}>();

const emit = defineEmits<{
  (e: "call"): void;
  (e: "info"): void;
}>();
</script>

<template>
  <header class="chat-header">
    <div class="user-meta">
      <strong>{{ userName }}</strong>
      <small>
        {{ status === "online" ? "Active now" : "Away" }}
      </small>
    </div>
    <div class="header-actions">
      <button class="btn-icon" @click="emit('call')">📞</button>
      <button class="btn-icon" @click="emit('info')">ℹ️</button>
    </div>
  </header>
</template>
