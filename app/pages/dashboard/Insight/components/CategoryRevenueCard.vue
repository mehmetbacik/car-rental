<script setup lang="ts">
import { Bar } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

defineProps<{
  data: ChartData<"bar">;
  options: ChartOptions<"bar">;
}>();
</script>

<template>
  <div class="insight-card">
    <h3>Earnings by Category</h3>
    <div class="chart-container">
      <Bar :data="data" :options="options" />
    </div>
  </div>
</template>
