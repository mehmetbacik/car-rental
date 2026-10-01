<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

import { carsData } from "@/data/carsData";
import { barChartOptions } from "../chartOptions";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const chartData = computed(() => {
  const counts: Record<string, number> = {};

  carsData.forEach((car) => {
    counts[car.type] = (counts[car.type] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Fleet",
        data: Object.values(counts),
        backgroundColor: "#3563E9",
        borderRadius: 8,
      },
    ],
  };
});
</script>

<template>
  <Bar :data="chartData" :options="barChartOptions" />
</template>
