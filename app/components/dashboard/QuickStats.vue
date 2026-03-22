<script setup lang="ts">
import { carsData } from "@/data/carsData";

const totalRevenue = computed(() =>
  carsData.reduce((acc, car) => acc + car.pricePerDay * 12, 0),
);
const activeRentals = ref(18);
const pendingRequests = ref(4);

const stats = [
  {
    label: "Total Revenue",
    value: `$${totalRevenue.value.toLocaleString()}`,
    change: "+12%",
    color: "#3563E9",
    icon: "💰",
  },
  {
    label: "Active Rentals",
    value: activeRentals.value.toString(),
    change: "+2%",
    color: "#54A6FF",
    icon: "🚗",
  },
  {
    label: "Pending Requests",
    value: pendingRequests.value.toString(),
    change: "-5%",
    color: "#FFD700",
    icon: "📩",
  },
  {
    label: "Total Cars",
    value: carsData.length.toString(),
    change: "+1",
    color: "#1A37A7",
    icon: "📊",
  },
];
</script>

<template>
  <div class="stats-row">
    <div v-for="stat in stats" :key="stat.label" class="stat-box card">
      <div class="stat-content">
        <span class="label">{{ stat.label }}</span>
        <h2 class="value">{{ stat.value }}</h2>
        <span
          class="trend"
          :class="stat.change.startsWith('+') ? 'up' : 'down'"
        >
          {{ stat.change }} <small>since last month</small>
        </span>
      </div>
      <div
        class="stat-icon"
        :style="{ backgroundColor: stat.color + '15', color: stat.color }"
      >
        {{ stat.icon }}
      </div>
    </div>
  </div>
</template>