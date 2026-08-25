<script setup lang="ts">
import { useCalendarStore } from "@/stores/useCalendar";

import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarGrid from "./components/CalendarGrid.vue";
import CalendarDetails from "./components/CalendarDetails.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const calendarStore = useCalendarStore();

const selectedDate = ref("2026-03-20");

const activeView = ref<"month" | "week" | "day">("month");

const daysInMonth = 31;
const startDayOffset = 6;

const calendarDays = computed(() => {
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = `2026-03-${day.toString().padStart(2, "0")}`;

    return {
      day,
      date,
      events: calendarStore.events.filter((event) => event.start === date),
    };
  });
});

const activeEvents = computed(() => {
  return calendarStore.events.filter(
    (event) => event.start === selectedDate.value,
  );
});

const handleViewChange = (view: "month" | "week" | "day") => {
  activeView.value = view;
};

const handleAddEvent = () => {
  // Open modal
};
</script>

<template>
  <div class="calendar-page">
    <div class="calendar-layout">
      <main class="calendar-main card">
        <CalendarHeader
          title="March 2026"
          :active-view="activeView"
          @change-view="handleViewChange"
        />
        <CalendarGrid
          :days="calendarDays"
          :start-day-offset="startDayOffset"
          :selected-date="selectedDate"
          @select-date="selectedDate = $event"
        />
      </main>
      <CalendarDetails
        :selected-date="selectedDate"
        :events="activeEvents"
        @add-event="handleAddEvent"
      />
    </div>
  </div>
</template>
