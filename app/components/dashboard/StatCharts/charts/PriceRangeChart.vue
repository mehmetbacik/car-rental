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
  const ranges = {
    "$0 - $50": 0,
    "$51 - $100": 0,
    "$101 - $150": 0,
    "$151+": 0,
  };

  carsData.forEach((car) => {
    const price = car.pricePerDay;

    if (price <= 50) {
      ranges["$0 - $50"]++;
    } else if (price <= 100) {
      ranges["$51 - $100"]++;
    } else if (price <= 150) {
      ranges["$101 - $150"]++;
    } else {
      ranges["$151+"]++;
    }
  });

  return {
    labels: Object.keys(ranges),
    datasets: [
      {
        label: "Cars",
        data: Object.values(ranges),
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
