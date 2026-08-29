<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

defineProps<{
  data: ChartData<"doughnut">;
  options: ChartOptions<"doughnut">;
  totalCars: number;
}>();
</script>

<template>
  <div class="insight-card donut-card">
    <h3>Fleet Status</h3>
    <div class="chart-container relative">
      <Doughnut :data="data" :options="options" />
      <div class="center-text">
        <strong>{{ totalCars }}</strong>
        <span>Total</span>
      </div>
    </div>
  </div>
</template>
