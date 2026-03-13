<script setup lang="ts">
import type { Car } from "../../types/car";
import carsData from "@/data/cars.json";

definePageMeta({
  layout: "admin",
});

const cars = ref<any[]>(carsData);

const topCars = computed(() => cars.value.slice(0, 5));
</script>

<template>
  <div class="dashboard-content">
    <div class="dashboard-grid">
      <div class="details-rental card">
        <h3>Details Rental</h3>
        <div class="map-placeholder">
          <div class="mock-map">Map is loading...</div>
        </div>
        <SharedBookingCard type="Pick-Up" />
        <SharedBookingCard type="Drop-Off" />
      </div>

      <div class="stats-panel">
        <div class="top-rental card">
          <h3>Top 5 Car Rental</h3>
          <DashboardStatsCharts />
        </div>
        <div class="recent-inventory card">
          <div class="card-header">
            <h3>Recent Inventory</h3>
            <NuxtLink to="/dashboard/inventory" class="view-all"
              >View All</NuxtLink
            >
          </div>

          <div class="mini-list">
            <div
              v-for="car in cars.slice(0, 5)"
              :key="car.id"
              class="mini-item"
            >
              <div class="car-info-mini">
                <img :src="car.image" :alt="car.name" class="mini-img" />
                <div class="text">
                  <span class="name">{{ car.name }}</span>
                  <span class="type">{{ car.type }}</span>
                </div>
              </div>
              <span
                class="badge"
                :class="car.status?.toLowerCase() || 'available'"
              >
                {{ car.status || "Available" }}
              </span>
            </div>
          </div>
        </div>
        <div class="recent-transactions card">
          <h3>Recent Transaction</h3>
        </div>
      </div>
    </div>
  </div>
</template>
