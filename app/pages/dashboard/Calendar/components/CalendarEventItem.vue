<script setup lang="ts">
interface CalendarEvent {
  id: string | number;
  type: string;
  title: string;
  carName: string;
  customer?: string;
}

defineProps<{
  event: CalendarEvent;
}>();

const getEventColor = (type: string) => {
  if (type === "delivery") return "#3563E9";
  if (type === "return") return "#ff4444";

  return "#f1c40f";
};
</script>

<template>
  <div class="event-item">
    <div
      class="type-indicator"
      :style="{ backgroundColor: getEventColor(event.type) }"
    />
    <div class="event-info">
      <span class="event-title"> {{ event.title }}: {{ event.carName }} </span>
      <span v-if="event.customer" class="event-subtitle">
        Customer: {{ event.customer }}
      </span>
    </div>
  </div>
</template>
