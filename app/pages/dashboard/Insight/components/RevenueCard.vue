<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

defineProps<{
  data: ChartData<"line">;
  options: ChartOptions<"line">;
  total: string;
  trend: string;
}>();
</script>

<template>
  <div class="insight-card wide chart-card">
    <div class="card-info">
      <h3>Total Revenue</h3>
      <h2 class="total">
        {{ total }}
      </h2>
      <span class="trend positive">
        ↑ {{ trend }}
        <small>vs last week</small>
      </span>
    </div>
    <div class="chart-container">
      <Line :data="data" :options="options" />
    </div>
  </div>
</template>
