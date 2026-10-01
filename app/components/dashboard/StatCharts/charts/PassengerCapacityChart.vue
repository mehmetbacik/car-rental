<script setup lang="ts">
import { computed } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Radar } from "vue-chartjs";

import { carsData } from "@/data/carsData";
import { radarChartOptions } from "../chartOptions";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
);

const chartData = computed(() => {
  const counts: Record<string, number> = {};

  carsData.forEach((car) => {
    const capacity = String(car.capacity);

    counts[capacity] = (counts[capacity] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Capacity Distribution",
        data: Object.values(counts),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };
});
</script>

<template>
  <Radar :data="chartData" :options="radarChartOptions" />
</template>
