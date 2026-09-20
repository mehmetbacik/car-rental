<script setup lang="ts">
import { useInventoryStore } from "@/stores/useInventory";
import { useBookingStore } from "@/stores/useBooking";

definePageMeta({ layout: "admin", middleware: "auth" });

const inventoryStore = useInventoryStore();
const bookingStore = useBookingStore();

const daysToShow = 14;
const startDate = new Date(2026, 2, 18);

const calendarDays = computed(() => {
  return Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return {
      fullDate: date.toISOString().split("T")[0],
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      dayNumber: date.getDate(),
    };
  });
});

const getBookingForDay = (carId: string, date: string) => {
  return bookingStore.bookings.find(
    (b) => carId === b.carId && date >= b.startDate && date <= b.endDate,
  );
};

const isStartOfBooking = (carId: string, date: string) => {
  const booking = getBookingForDay(carId, date);
  return booking && booking.startDate === date;
};
</script>

<template>
  <div class="calendar-page">
    <div class="header">
      <h2>Booking Timeline</h2>
      <div class="legend">
        <span class="dot confirmed"></span> Confirmed
        <span class="dot pending"></span> Pending
      </div>
    </div>

    <div class="timeline-container card">
      <div class="timeline-grid">
        <div class="grid-header sticky-col">Vehicles</div>

        <div
          v-for="day in calendarDays"
          :key="day.fullDate"
          class="grid-header day-col"
        >
          <span class="day-name">{{ day.dayName }}</span>
          <span class="day-num">{{ day.dayNumber }}</span>
        </div>

        <template v-for="car in inventoryStore.items" :key="car.id">
          <div class="car-row sticky-col">
            <img :src="car.images[0]" class="car-mini" />
            <div class="info">
              <span class="name">{{ car.name }}</span>
              <span class="type">{{ car.type }}</span>
            </div>
          </div>

          <div v-for="day in calendarDays" :key="day.fullDate" class="day-cell">
            <div
              v-if="getBookingForDay(car.id, day.fullDate)"
              class="booking-bar"
              :class="[
                getBookingForDay(car.id, day.fullDate)?.status,
                { 'is-start': isStartOfBooking(car.id, day.fullDate) },
              ]"
            >
              <span
                v-if="isStartOfBooking(car.id, day.fullDate)"
                class="customer"
              >
                {{ getBookingForDay(car.id, day.fullDate)?.customerName }}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>