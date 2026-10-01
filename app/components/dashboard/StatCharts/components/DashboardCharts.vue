<script setup lang="ts">
import CarTypeChart from "../charts/CarTypeChart.vue";
import TransmissionChart from "../charts/TransmissionChart.vue";
import PriceOverviewChart from "../charts/PriceOverviewChart.vue";
import PassengerCapacityChart from "../charts/PassengerCapacityChart.vue";
import FleetOverviewChart from "../charts/FleetOverviewChart.vue";
import PriceRangeChart from "../charts/PriceRangeChart.vue";
import FleetSummaryChart from "../charts/FleetSummaryChart.vue";

type ChartType =
  | "car-type"
  | "transmission"
  | "price-overview"
  | "passenger-capacity"
  | "fleet-overview"
  | "price-range"
  | "fleet-summary";

defineProps<{
  chart: ChartType;
}>();
</script>

<template>
  <CarTypeChart v-if="chart === 'car-type'" />
  <TransmissionChart v-else-if="chart === 'transmission'" />
  <PriceOverviewChart v-else-if="chart === 'price-overview'" />
  <PassengerCapacityChart v-else-if="chart === 'passenger-capacity'" />
  <FleetOverviewChart v-else-if="chart === 'fleet-overview'" />
  <PriceRangeChart v-else-if="chart === 'price-range'" />
  <FleetSummaryChart v-else-if="chart === 'fleet-summary'" />
</template>
