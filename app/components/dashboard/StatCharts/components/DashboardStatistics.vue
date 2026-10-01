<script setup lang="ts">
import DashboardCharts from "./DashboardCharts.vue";
</script>

<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="card-header">
        <h3>Top 5 Car Rental</h3>
        <p>Rental distribution by type</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="car-type" />
      </div>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <h3>Transmission Types</h3>
        <p>Manual vs Automatic</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="transmission" />
      </div>
    </div>
    <div class="stat-card wide">
      <div class="card-header">
        <h3>Price Overview</h3>
        <p>Daily rental prices per model</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="price-overview" />
      </div>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <h3>Passenger Capacity</h3>
        <p>Distribution of seat counts</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="passenger-capacity" />
      </div>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <h3>Fleet Overview</h3>
        <p>Total vehicles by rental type</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="fleet-overview" />
      </div>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <h3>Daily Price Range</h3>
        <p>Vehicle distribution by rental price</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="price-range" />
      </div>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <h3>Fleet Summary</h3>
        <p>Key rental fleet statistics</p>
      </div>
      <div class="chart-box">
        <DashboardCharts chart="fleet-summary" />
      </div>
    </div>
  </div>
</template>
