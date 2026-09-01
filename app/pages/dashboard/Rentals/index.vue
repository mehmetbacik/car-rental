<script setup lang="ts">
import RentalsHeader from "./components/RentalsHeader.vue";
import RentalsTable from "./components/RentalsTable.vue";

import { useBookingStore } from '@/stores/useBooking'
import { useInventoryStore } from '@/stores/useInventory'

definePageMeta({ layout: 'admin', middleware: 'auth' })

const bookingStore = useBookingStore()
const inventoryStore = useInventoryStore()

const searchQuery = ref('')
const statusFilter = ref('All')

const filteredRentals = computed(() => {
  return bookingStore.bookings.filter(rent => {
    const matchesSearch = rent.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          rent.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'All' || rent.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

</script>

<template>
  <div class="rent-page">
    <RentalsHeader
      :search-query="searchQuery"
      :status-filter="statusFilter"
      @update:search-query="searchQuery = $event"
      @update:status-filter="statusFilter = $event"
    />

    <RentalsTable
      :rentals="filteredRentals"
      :inventory="inventoryStore.items"
    />
  </div>
</template>