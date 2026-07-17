<script setup lang="ts">
defineProps<{
  copied: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button type="button" class="copy-btn" @click="emit('click')">
    {{ copied ? "✓" : "📋" }}
  </button>
</template>
