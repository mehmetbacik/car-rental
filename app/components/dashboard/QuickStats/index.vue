<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
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
    color: "#90a3bf",
    icon: "mdi:cash-multiple",
  },
  {
    label: "Active Rentals",
    value: activeRentals.value.toString(),
    change: "+2%",
    color: "#90a3bf",
    icon: "mdi:car",
  },
  {
    label: "Pending Requests",
    value: pendingRequests.value.toString(),
    change: "-5%",
    color: "#90a3bf",
    icon: "mdi:email-outline",
  },
  {
    label: "Total Cars",
    value: carsData.length.toString(),
    change: "+1",
    color: "#90a3bf",
    icon: "mdi:car-multiple",
  },
];
</script>

<template>
  <div class="statsRow">
    <div v-for="stat in stats" :key="stat.label" class="statBox">
      <div class="statContent">
        <span class="label">{{ stat.label }}</span>
        <h2 class="value">{{ stat.value }}</h2>
        <span
          class="trend"
          :class="stat.change.startsWith('+') ? 'up' : 'down'"
        >
          {{ stat.change }}
          <small>since last month</small>
        </span>
      </div>
      <div
        class="statIcon"
        :style="{
          backgroundColor: stat.color + '15',
          color: stat.color,
        }"
      >
        <Icon :icon="stat.icon" width="28" height="28" />
      </div>
    </div>
  </div>
</template>
