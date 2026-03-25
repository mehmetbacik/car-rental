<script setup lang="ts">
import { Line, Bar, Doughnut } from 'vue-chartjs'
import { useInventoryStore } from '@/stores/useInventory'

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
  Filler 
} from 'chart.js'

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
  Filler
)

definePageMeta({ layout: "admin", middleware: "auth" });
const inventoryStore = useInventoryStore();

const revenueData = computed(() => ({
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [2100, 1800, 3200, 2500, 4100, 5500, 4800],
      borderColor: "#3563E9",
      backgroundColor: "rgba(53, 99, 233, 0.1)",
      fill: true, 
      tension: 0.4,
    },
  ],
}));

const occupancyData = computed(() => ({
  labels: ["Rented", "Available", "Maintenance"],
  datasets: [
    {
      data: [
        inventoryStore.items.filter((c) => c.status === "Rented").length,
        inventoryStore.items.filter((c) => c.status === "Available").length,
        inventoryStore.items.filter((c) => c.status === "Maintenance").length,
      ],
      backgroundColor: ["#3563E9", "#7C9AFF", "#1A37A7"],
      borderWidth: 0,
      cutout: "80%",
    },
  ],
}));

const categoryRevenue = {
  labels: ["Sport", "SUV", "Sedan", "Luxury"],
  datasets: [
    {
      label: "Earnings by Category",
      data: [12000, 8500, 5000, 15000],
      backgroundColor: "#54A6FF",
      borderRadius: 10,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { grid: { display: false }, ticks: { color: "#90A3BF" } },
    x: { grid: { display: false }, ticks: { color: "#90A3BF" } },
  },
};
</script>

<template>
  <div class="insight-page">
    <div class="header">
      <h2>Business Insights</h2>
      <div class="date-picker">
        <span>Last 7 Days</span>
      </div>
    </div>

    <div class="insight-grid">
      <div class="insight-card wide chart-card">
        <div class="card-info">
          <h3>Total Revenue</h3>
          <h2 class="total">$144,520.00</h2>
          <span class="trend positive"
            >↑ 15.4% <small>vs last week</small></span
          >
        </div>
        <div class="chart-container">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="insight-card donut-card">
        <h3>Fleet Status</h3>
        <div class="chart-container relative">
          <Doughnut
            :data="occupancyData"
            :options="{
              cutout: '80%',
              plugins: { legend: { position: 'bottom' } },
            }"
          />
          <div class="center-text">
            <strong>{{ inventoryStore.totalCars }}</strong>
            <span>Total</span>
          </div>
        </div>
      </div>

      <div class="insight-card">
        <h3>Earnings by Category</h3>
        <div class="chart-container">
          <Bar :data="categoryRevenue" :options="chartOptions" />
        </div>
      </div>

      <div class="insight-card">
        <h3>Top Performing Cars</h3>
        <div class="top-cars-list">
          <div
            v-for="car in inventoryStore.items.slice(0, 4)"
            :key="car.id"
            class="top-car-item"
          >
            <img :src="car.image" />
            <div class="details">
              <span class="name">{{ car.name }}</span>
              <span class="rentals">24 Rentals this month</span>
            </div>
            <span class="earning">+${{ car.pricePerDay * 24 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
