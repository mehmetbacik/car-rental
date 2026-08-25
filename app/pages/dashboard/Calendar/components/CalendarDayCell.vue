<script setup lang="ts">
interface CalendarDay {
  day: number;
  date: string;
  events: Array<{
    id: string | number;
    type: string;
  }>;
}

defineProps<{
  day: CalendarDay;
  selected: boolean;
}>();

const emit = defineEmits<{
  (e: "select", date: string): void;
}>();

const getEventColor = (type: string) => {
  if (type === "delivery") return "#3563E9";
  if (type === "return") return "#ff4444";

  return "#f1c40f";
};
</script>

<template>
  <div class="day-cell" :class="{ selected }" @click="emit('select', day.date)">
    <span class="day-num">
      {{ day.day }}
    </span>
    <div class="event-dots">
      <span
        v-for="event in day.events"
        :key="event.id"
        class="dot"
        :style="{ backgroundColor: getEventColor(event.type) }"
      />
    </div>
  </div>
</template>
