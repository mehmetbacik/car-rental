<script setup lang="ts">
defineProps<{
  searchQuery: string
  statusFilter: string
}>()

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:statusFilter': [value: string]
}>()
</script>

<template>
  <div class="header">
    <h2>Car Rental Management</h2>

    <div class="actions">
      <div class="search-box">
        <input
          :value="searchQuery"
          type="text"
          placeholder="Search by ID or Name..."
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <select
        :value="statusFilter"
        class="filter-select"
        @change="emit('update:statusFilter', ($event.target as HTMLSelectElement).value)"
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  </div>
</template>