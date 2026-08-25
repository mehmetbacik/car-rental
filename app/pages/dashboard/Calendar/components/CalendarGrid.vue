<script setup lang="ts">

import CalendarDayCell from "./CalendarDayCell.vue";

interface CalendarDay {
  day: number;
  date: string;
  events: Array<{
    id: string | number;
    type: string;
  }>;
}

defineProps<{
  days: CalendarDay[];
  startDayOffset: number;
  selectedDate: string;
}>();

const emit = defineEmits<{
  (e: "select-date", date: string): void;
}>();

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
</script>

<template>
  <div class="calendar-grid">
    <div v-for="day in weekdays" :key="day" class="weekday-label">
      {{ day }}
    </div>
    <div
      v-for="n in startDayOffset"
      :key="`blank-${n}`"
      class="day-cell blank"
    />
    <CalendarDayCell
      v-for="day in days"
      :key="day.date"
      :day="day"
      :selected="selectedDate === day.date"
      @select="emit('select-date', $event)"
    />
  </div>
</template>
