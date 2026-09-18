<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <div class="mobileSidebar">
    <button
      type="button"
      class="sidebarToggle"
      aria-label="Toggle sidebar"
      @click="$emit('toggle')"
    >
      <Icon icon="mdi:menu" width="24" height="24" />
    </button>

    <span class="mobileSidebar-title"> Dashboard </span>
  </div>
</template>
