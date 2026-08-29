<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Filler,
} from "chart.js";
import type { ChartOptions } from "chart.js";

import { useInsights } from "@/composables/useInsights";

import InsightsHeader from "./components/InsightsHeader.vue";
import RevenueCard from "./components/RevenueCard.vue";
import FleetStatusCard from "./components/FleetStatusCard.vue";
import CategoryRevenueCard from "./components/CategoryRevenueCard.vue";
import TopPerformingCars from "./components/TopPerformingCars.vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Filler,
);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const { inventoryStore, revenueData, occupancyData, categoryRevenue, topCars } =
  useInsights();

const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#90A3BF",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#90A3BF",
      },
    },
  },
};

const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#90A3BF",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#90A3BF",
      },
    },
  },
};

const doughnutChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "80%",
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
</script>

<template>
  <div class="insight-page">
    <InsightsHeader title="Business Insights" period="Last 7 Days" />
    <div class="insight-grid">
      <RevenueCard
        :data="revenueData"
        :options="lineChartOptions"
        total="$144,520.00"
        trend="15.4%"
      />
      <FleetStatusCard
        :data="occupancyData"
        :options="doughnutChartOptions"
        :total-cars="inventoryStore.totalCars"
      />
      <CategoryRevenueCard :data="categoryRevenue" :options="barChartOptions" />
      <TopPerformingCars :cars="topCars" />
    </div>
  </div>
</template>
