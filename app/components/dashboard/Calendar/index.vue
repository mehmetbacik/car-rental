<script setup lang="ts">
import { useInventoryStore } from "@/stores/useInventory";
import { useBookingStore } from "@/stores/useBooking";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const inventoryStore = useInventoryStore();
const bookingStore = useBookingStore();

const daysToShow = 14;
const startDate = new Date(2026, 2, 18);

const windowWidth = ref(0);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWindowWidth();

  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});

const carNameMaxLength = computed(() => {
  if (windowWidth.value <= 400) {
    return 10;
  }

  if (windowWidth.value <= 576) {
    return 14;
  }

  if (windowWidth.value <= 768) {
    return 18;
  }

  return 25;
});

const truncateCarName = (name: string): string => {
  const maxLength = carNameMaxLength.value;

  if (name.length <= maxLength) {
    return name;
  }

  return `${name.slice(0, maxLength)}...`;
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const calendarDays = computed(() => {
  return Array.from({ length: daysToShow }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    return {
      fullDate: formatDate(date),
      dayName: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      dayNumber: date.getDate(),
    };
  });
});

const getBookingForDay = (carId: string, date: string) => {
  return bookingStore.bookings.find(
    (booking) =>
      booking.carId === carId &&
      date >= booking.startDate &&
      date <= booking.endDate,
  );
};

const isStartOfBooking = (carId: string, date: string): boolean => {
  const booking = getBookingForDay(carId, date);

  return booking?.startDate === date;
};
</script>

<template>
  <div class="bookingTimeline-content">
    <div class="bookingTimeline-header">
      <h2>Booking Timeline</h2>
      <div class="legend">
        <span class="dot confirmed"></span>
        Confirmed
        <span class="dot pending"></span>
        Pending
      </div>
    </div>
    <div class="timeline-container">
      <div class="timeline-grid">
        <div class="grid-header sticky-col">Vehicles</div>
        <div
          v-for="day in calendarDays"
          :key="day.fullDate"
          class="grid-header day-col"
        >
          <span class="day-name">
            {{ day.dayName }}
          </span>
          <span class="day-num">
            {{ day.dayNumber }}
          </span>
        </div>
        <template v-for="car in inventoryStore.items" :key="car.id">
          <div class="car-row sticky-col">
            <img :src="car.images[0]" :alt="car.name" class="car-mini" />
            <div class="info">
              <span class="name">
                {{ truncateCarName(car.name) }}
              </span>
              <span class="type">
                {{ car.type }}
              </span>
            </div>
          </div>
          <div v-for="day in calendarDays" :key="day.fullDate" class="day-cell">
            <div
              v-if="getBookingForDay(car.id, day.fullDate)"
              class="booking-bar"
              :class="[
                getBookingForDay(car.id, day.fullDate)?.status,
                {
                  'is-start': isStartOfBooking(car.id, day.fullDate),
                },
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
