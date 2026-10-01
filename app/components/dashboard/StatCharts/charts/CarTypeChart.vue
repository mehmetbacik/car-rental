<script setup lang="ts">
import { computed } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Doughnut } from "vue-chartjs";

import { carsData } from "@/data/carsData";
import { doughnutChartOptions } from "../chartOptions";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const chartData = computed(() => {
  const counts: Record<string, number> = {};

  carsData.forEach((car) => {
    counts[car.type] = (counts[car.type] || 0) + 1;
  });

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        data: Object.values(counts),
        backgroundColor: ["#3563E9", "#54A6FF", "#90A3BF", "#1A37A7"],
        hoverOffset: 15,
        borderWidth: 0,
      },
    ],
  };
});
</script>

<template>
  <Doughnut :data="chartData" :options="doughnutChartOptions" />
</template>
