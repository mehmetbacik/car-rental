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
  const prices = carsData.map((car) => car.pricePerDay);

  const totalVehicles = carsData.length;

  const averagePrice =
    prices.length > 0
      ? prices.reduce((sum, price) => sum + price, 0) / prices.length
      : 0;

  const minimumPrice = prices.length > 0 ? Math.min(...prices) : 0;

  const maximumPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    labels: [
      "Total Vehicles",
      "Average Price",
      "Minimum Price",
      "Maximum Price",
    ],
    datasets: [
      {
        label: "Fleet Statistics",
        data: [
          totalVehicles,
          Math.round(averagePrice),
          minimumPrice,
          maximumPrice,
        ],
        backgroundColor: "#54A6FF",
        borderRadius: 8,
      },
    ],
  };
});
</script>

<template>
  <Bar :data="chartData" :options="barChartOptions" />
</template>
