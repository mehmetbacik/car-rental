<script setup lang="ts">
import { carsData } from "@/data/carsData";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const cars = ref<any[]>(carsData);

const topCars = computed(() => cars.value.slice(0, 5));
</script>

<template>
  <div class="dashboardContent">
    <div class="dashboard-grid">
      <div class="quickStats">
        <DashboardQuickStats />
      </div>
      <div class="rentalMap">
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
      </div>
      <div class="statCharts">
        <DashboardStatCharts />
      </div>
      <div class="recentInventory">
        <DashboardRecentInventory :cars="cars" />
      </div>
      <div class="recentTransactions">
        <DashboardTopRentalsTable />
      </div>
      <div class="calender">
        <DashboardCalendar />
      </div>
    </div>
  </div>
</template>
