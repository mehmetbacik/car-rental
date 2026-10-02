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
    <div class="dashboard-grid">
      <div class="quickStats">
        <QuickStats />
      </div>
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
      </div>
      <div class="statCharts">
        <DashboardStatCharts />
      </div>
      <div class="recent-inventory card">
        <DashboardRecentInventory :cars="cars" />
      </div>
      <div class="recent-transactions card">
        <TopRentalsTable />
      </div>
      <div class="calender card">
        <Calendar />
      </div>
    </div>
  </div>
</template>
