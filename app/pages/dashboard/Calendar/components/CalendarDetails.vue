<script setup lang="ts">

import CalendarEventItem from "./CalendarEventItem.vue";
import CalendarEmptyState from "./CalendarEmptyState.vue";

interface CalendarEvent {
  id: string | number;
  type: string;
  title: string;
  carName: string;
  customer?: string;
}

defineProps<{
  selectedDate: string;
  events: CalendarEvent[];
}>();

const emit = defineEmits<{
  (e: "add-event"): void;
}>();
</script>

<template>
  <aside class="calendar-details card">
    <h4>Schedule for {{ selectedDate }}</h4>
    <div v-if="events.length" class="event-list">
      <CalendarEventItem
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
    <CalendarEmptyState v-else />
    <button class="add-event-btn" @click="emit('add-event')">
      + Add New Schedule
    </button>
  </aside>
</template>
