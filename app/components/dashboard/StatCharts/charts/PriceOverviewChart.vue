<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "vue-chartjs";

import { carsData } from "@/data/carsData";
import { lineChartOptions } from "../chartOptions";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

const chartData = computed(() => {
  return {
    labels: carsData.map((car) => car.name),
    datasets: [
      {
        label: "Daily Price ($)",
        data: carsData.map((car) => car.pricePerDay),
        borderColor: "#3563E9",
        backgroundColor: "rgba(53, 99, 233, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
});
</script>

<template>
  <Line :data="chartData" :options="lineChartOptions" />
</template>
