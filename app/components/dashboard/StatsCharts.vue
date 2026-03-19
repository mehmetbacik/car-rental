<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";
import { Doughnut, Bar, Line, Radar } from "vue-chartjs";
import { carsData } from "@/data/carsData";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
);

// --- (Doughnut Chart) ---
const typeStats = computed(() => {
  const counts: Record<string, number> = {};
  carsData.forEach((car) => (counts[car.type] = (counts[car.type] || 0) + 1));

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

// --- (Bar Chart) ---
const transmissionStats = computed(() => {
  const counts: Record<string, number> = {};
  carsData.forEach(
    (car) => (counts[car.transmission] = (counts[car.transmission] || 0) + 1),
  );

  return {
    labels: Object.keys(counts),
    datasets: [
      {
        label: "Units",
        data: Object.values(counts),
        backgroundColor: "#54A6FF",
        borderRadius: 8,
      },
    ],
  };
});

// --- (Line Chart) ---
const priceStats = computed(() => {
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

// --- (Radar Chart) ---
const capacityStats = computed(() => {
  const counts: Record<string, number> = {};
  carsData.forEach(
    (car) => (counts[car.capacity] = (counts[car.capacity] || 0) + 1),
  );

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

const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: { color: "#90A3BF", font: { family: "Plus Jakarta Sans" } },
    },
  },
};
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="card-header">
        <h3>Top 5 Car Rental</h3>
        <p>Rental distribution by type</p>
      </div>
      <div class="chart-box">
        <Doughnut :data="typeStats" :options="commonOptions" />
      </div>
    </div>

    <div class="stat-card">
      <div class="card-header">
        <h3>Transmission Types</h3>
        <p>Manual vs Automatic</p>
      </div>
      <div class="chart-box">
        <Bar :data="transmissionStats" :options="commonOptions" />
      </div>
    </div>

    <div class="stat-card wide">
      <div class="card-header">
        <h3>Price Overview</h3>
        <p>Daily rental prices per model</p>
      </div>
      <div class="chart-box">
        <Line :data="priceStats" :options="commonOptions" />
      </div>
    </div>

    <div class="stat-card">
      <div class="card-header">
        <h3>Passenger Capacity</h3>
        <p>Distribution of seat counts</p>
      </div>
      <div class="chart-box">
        <Radar :data="capacityStats" :options="commonOptions" />
      </div>
    </div>
  </div>
</template>