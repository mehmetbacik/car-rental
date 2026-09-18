<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <header class="mobile-header">
    <button
      type="button"
      class="sidebar-toggle"
      aria-label="Toggle sidebar"
      @click="$emit('toggle')"
    >
      <Icon icon="mdi:menu" width="24" height="24" />
    </button>

    <span class="mobile-title"> Dashboard </span>
  </header>
</template>
