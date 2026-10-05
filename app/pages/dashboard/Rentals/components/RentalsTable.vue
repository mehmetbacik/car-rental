<script setup lang="ts">
import RentalRow from './RentalRow.vue'

defineProps<{
  rentals: any[]
  inventory: any[]
}>()
</script>

<template>
  <div class="rentals-table">
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
        <RentalRow
          v-for="rent in rentals"
          :key="rent.id"
          :rent="rent"
          :inventory="inventory"
        />
      </tbody>
    </table>

    <div v-if="rentals.length === 0" class="empty">
      No rentals found matching your criteria.
    </div>
  </div>
</template>