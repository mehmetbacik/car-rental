<script setup lang="ts">
defineProps<{
  title: string;
  activeView: "month" | "week" | "day";
}>();

const emit = defineEmits<{
  (e: "change-view", view: "month" | "week" | "day"): void;
}>();
</script>

<template>
  <header class="calendar-header">
    <h3>{{ title }}</h3>

    <div class="view-options">
      <button
        v-for="view in ['month', 'week', 'day']"
        :key="view"
        :class="{ active: activeView === view }"
        @click="emit('change-view', view as 'month' | 'week' | 'day')"
      >
        {{ view.charAt(0).toUpperCase() + view.slice(1) }}
      </button>
    </div>
  </header>
</template>
