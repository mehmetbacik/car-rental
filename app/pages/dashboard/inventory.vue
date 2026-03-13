<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const inventory = ref([
  { id: '1', name: 'Nissan GT-R', type: 'Sport', status: 'Rented', price: '$80.00', date: '15 July' },
  { id: '2', name: 'Koenigsegg', type: 'Sport', status: 'Available', price: '$99.00', date: '18 July' },
  { id: '3', name: 'Rolls-Royce', type: 'Luxury', status: 'Rented', price: '$96.00', date: '20 July' },
  { id: '4', name: 'CR-V', type: 'SUV', status: 'Maintenance', price: '$75.00', date: '22 July' },
])

const getStatusClass = (status: string) => {
  return {
    'status--rented': status === 'Rented',
    'status--available': status === 'Available',
    'status--maintenance': status === 'Maintenance',
  }
}
</script>

<template>
  <div class="inventory-page">
    <div class="inventory-header">
      <h2>Car Inventory</h2>
      <button class="btn btn--primary">+ Add New Car</button>
    </div>

    <div class="inventory-table card">
      <table>
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price</th>
            <th>Next Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in inventory" :key="car.id">
            <td class="car-info">
              <strong>{{ car.name }}</strong>
            </td>
            <td>{{ car.type }}</td>
            <td>
              <span class="status-badge" :class="getStatusClass(car.status)">
                {{ car.status }}
              </span>
            </td>
            <td>{{ car.price }}</td>
            <td>{{ car.date }}</td>
            <td>
              <div class="actions">
                <button class="btn-icon">✏️</button>
                <button class="btn-icon">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>