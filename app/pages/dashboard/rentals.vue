<script setup lang="ts">
import { useBookingStore } from '@/stores/useBooking'
import { useInventoryStore } from '@/stores/useInventory'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const bookingStore = useBookingStore()
const inventoryStore = useInventoryStore()

const searchQuery = ref('')
const statusFilter = ref('All')

const getCarDetails = (carId: string) => {
  return inventoryStore.items.find(c => c.id === carId)
}

const filteredRentals = computed(() => {
  return bookingStore.bookings.filter(rent => {
    const matchesSearch = rent.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          rent.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || rent.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed': return '#2ecc71'
    case 'Active': return '#3563E9'
    case 'Pending': return '#f1c40f'
    case 'Cancelled': return '#e74c3c'
    default: return '#90A3BF'
  }
}
</script>

<template>
  <div class="rent-page">
    <div class="header">
      <h2>Car Rental Management</h2>
      <div class="actions">
        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="Search by ID or Name..." />
        </div>
        <select v-model="statusFilter" class="filter-select">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>

    <div class="rentals-table card">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Car</th>
            <th>Customer</th>
            <th>Date Range</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rent in filteredRentals" :key="rent.id">
            <td class="order-id">#{{ rent.id }}</td>
            <td class="car-info">
              <div class="car-flex">
                <img :src="getCarDetails(rent.carId)?.image" class="car-thumb" />
                <span>{{ getCarDetails(rent.carId)?.name }}</span>
              </div>
            </td>
            <td>
              <div class="customer">
                <strong>{{ rent.customerName }}</strong>
                <span>{{ rent.email }}</span>
              </div>
            </td>
            <td class="dates">
              {{ rent.rentDate }} <br />
              <small>to {{ rent.returnDate }}</small>
            </td>
            <td class="price">${{ rent.totalPrice }}.00</td>
            <td>
              <span class="status-pill" :style="{ backgroundColor: getStatusColor(rent.status) + '15', color: getStatusColor(rent.status) }">
                {{ rent.status }}
              </span>
            </td>
            <td>
              <button class="btn-more">•••</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div v-if="filteredRentals.length === 0" class="empty">
        No rentals found matching your criteria.
      </div>
    </div>
  </div>
</template>