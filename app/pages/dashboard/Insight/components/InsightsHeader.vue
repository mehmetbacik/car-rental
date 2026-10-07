<script setup lang="ts">
defineProps<{
  title: string;
  period: string;
}>();
</script>

<template>
  <div class="insight-header">
    <h2>{{ title }}</h2>
    <div class="date-picker">
      <span>{{ period }}</span>
    </div>
  </div>
</template>
