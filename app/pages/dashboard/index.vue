<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
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
          </div>
        <div class="recent-transactions card">
          <h3>Recent Transaction</h3>
          </div>
      </div>
    </div>
  </div>
</template>