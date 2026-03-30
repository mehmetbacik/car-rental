<script setup lang="ts">
import { useCalendarStore } from "@/stores/useCalendar";

definePageMeta({ layout: "admin", middleware: "auth" });

const calendarStore = useCalendarStore();
const selectedDate = ref("2026-03-20");

const daysInMonth = 31;
const startDayOffset = 6;

const calendarDays = computed(() => {
  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-03-${dayNum.toString().padStart(2, "0")}`;
    return {
      day: dayNum,
      date: dateStr,
      events: calendarStore.events.filter((e) => e.start === dateStr),
    };
  });
});

const activeEvents = computed(() => {
  return calendarStore.events.filter((e) => e.start === selectedDate.value);
});

const getEventColor = (type: string) => {
  if (type === "delivery") return "#3563E9";
  if (type === "return") return "#ff4444";
  return "#f1c40f";
};
</script>

<template>
  <div class="calendar-page">
    <div class="calendar-layout">
      <main class="calendar-main card">
        <header class="calendar-header">
          <h3>March 2026</h3>
          <div class="view-options">
            <button class="active">Month</button>
            <button>Week</button>
            <button>Day</button>
          </div>
        </header>

        <div class="calendar-grid">
          <div
            v-for="d in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
            :key="d"
            class="weekday-label"
          >
            {{ d }}
          </div>

          <div
            v-for="n in startDayOffset"
            :key="'blank-' + n"
            class="day-cell blank"
          ></div>

          <div
            v-for="day in calendarDays"
            :key="day.date"
            class="day-cell"
            :class="{ selected: selectedDate === day.date }"
            @click="selectedDate = day.date"
          >
            <span class="day-num">{{ day.day }}</span>
            <div class="event-dots">
              <span
                v-for="event in day.events"
                :key="event.id"
                class="dot"
                :style="{ backgroundColor: getEventColor(event.type) }"
              ></span>
            </div>
          </div>
        </div>
      </main>

      <aside class="calendar-details card">
        <h4>Schedule for {{ selectedDate }}</h4>

        <div v-if="activeEvents.length > 0" class="event-list">
          <div v-for="event in activeEvents" :key="event.id" class="event-item">
            <div
              class="type-indicator"
              :style="{ backgroundColor: getEventColor(event.type) }"
            ></div>
            <div class="event-info">
              <span class="event-title"
                >{{ event.title }}: {{ event.carName }}</span
              >
              <span class="event-subtitle" v-if="event.customer"
                >Customer: {{ event.customer }}</span
              >
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <p>No events scheduled for this day.</p>
        </div>

        <button class="add-event-btn">+ Add New Schedule</button>
      </aside>
    </div>
  </div>
</template>
