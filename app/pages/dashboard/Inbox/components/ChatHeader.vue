<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
  <div class="chat-header">
    <div class="user-meta">
      <strong>{{ userName }}</strong>
      <small>
        {{ status === "online" ? "Active now" : "Away" }}
      </small>
    </div>

    <div class="header-actions">
      <button
        class="btn-icon"
        type="button"
        aria-label="Call"
        @click="emit('call')"
      >
        <Icon icon="mdi:phone-outline" />
      </button>

      <button
        class="btn-icon"
        type="button"
        aria-label="Information"
        @click="emit('info')"
      >
        <Icon icon="mdi:information-outline" />
      </button>
    </div>
  </div>
</template>
