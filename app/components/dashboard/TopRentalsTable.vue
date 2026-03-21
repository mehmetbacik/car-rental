<script setup lang="ts">
import { carsData } from '@/data/carsData'

const topRentals = computed(() => {
  return [...carsData]
    .map(car => ({
      ...car,
      rentCount: Math.floor(car.pricePerDay / 10) + parseInt(car.id) * 5 
    }))
    .sort((a, b) => b.rentCount - a.rentCount)
    .slice(0, 5)
})
</script>

<template>
  <div class="top-rentals-card card">
    <div class="card-header">
      <h3>Recent Transaction</h3>
      <NuxtLink to="/dashboard/inventory" class="view-all">View All</NuxtLink>
    </div>

    <div class="table-container">
      <table class="rentals-table">
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in topRentals" :key="car.id">
            <td>
              <div class="car-info">
                <img :src="car.image" :alt="car.name" class="car-thumb" />
                <div class="car-details">
                  <span class="name">{{ car.name }}</span>
                  <span class="id">#{{ car.id }}0234</span>
                </div>
              </div>
            </td>
            <td>
              <span class="type-badge">{{ car.type }}</span>
            </td>
            <td>
              <span class="date">20 July</span>
            </td>
            <td>
              <span class="price">${{ car.pricePerDay }}.00</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>