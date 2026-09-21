<script setup lang="ts">
import { carsData } from "@/data/carsData";
import Calendar from "~/components/dashboard/Calendar.vue";
import QuickStats from "~/components/dashboard/QuickStats.vue";
import TopRentalsTable from "~/components/dashboard/TopRentalsTable.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const cars = ref<any[]>(carsData);

const topCars = computed(() => cars.value.slice(0, 5));
</script>

<template>
  <div class="dashboardContent">
    <div class="quickStats">
      <QuickStats />
    </div>
    <div class="dashboard-grid">
      <div class="details-rental card">
        <h3>Details Rental</h3>
        <div class="map-placeholder">
          <ClientOnly>
            <DashboardRentalMap />
            <template #fallback>
              <div class="map-loading">
                <span class="loading-spinner"></span>
                Loading map...
              </div>
            </template>
          </ClientOnly>
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
      </div>
    </div>
    <div class="recent-transactions card">
      <TopRentalsTable />
    </div>
    <div class="calender card">
      <Calendar />
    </div>
  </div>
</template>
