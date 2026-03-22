<script setup lang="ts">
import { useInventoryStore } from '@/stores/useInventory'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const inventoryStore = useInventoryStore()
const { items: inventory } = storeToRefs(inventoryStore)

const isEditModalOpen = ref(false)
const selectedCarId = ref<string | null>(null)
const editForm = ref({
  name: '',
  type: '',
  status: '',
  pricePerDay: 0
})

const getStatusClass = (status: string) => {
  return {
    'status--rented': status === 'Rented',
    'status--available': status === 'Available',
    'status--maintenance': status === 'Maintenance',
  }
}

const openEditModal = (car: any) => {
  selectedCarId.value = car.id
  editForm.value = { 
    name: car.name, 
    type: car.type, 
    status: car.status, 
    pricePerDay: car.pricePerDay 
  }
  isEditModalOpen.value = true
}

const saveChanges = () => {
  if (selectedCarId.value) {
    inventoryStore.updateCar(selectedCarId.value, {
      name: editForm.value.name,
      type: editForm.value.type,
      status: editForm.value.status,
      pricePerDay: editForm.value.pricePerDay
    });
  }
  isEditModalOpen.value = false;
};

const confirmDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this car?")) {
    inventoryStore.deleteCar(id)
  }
}
</script>

<template>
  <div class="inventory-page">
    <div class="inventory-header">
      <div>
        <h2>Car Inventory</h2>
        <p>Total Vehicles: <strong>{{ inventoryStore.totalCars }}</strong></p>
      </div>
      <button class="btn btn--primary">+ Add New Car</button>
    </div>

    <div class="inventory-table card">
      <table v-if="inventory.length > 0">
        <thead>
          <tr>
            <th>Car Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Price / Day</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in inventory" :key="car.id">
            <td class="car-info">
              <div class="car-cell">
                <img :src="car.image" :alt="car.name" class="car-thumb" />
                <strong>{{ car.name }}</strong>
              </div>
            </td>
            <td>{{ car.type }}</td>
            <td>
              <span class="status-badge" :class="getStatusClass(car.status)">
                {{ car.status }}
              </span>
            </td>
            <td>${{ car.pricePerDay }}.00</td>
            <td>
              <div class="actions">
                <button @click="openEditModal(car)" class="btn-icon">✏️</button>
                <button @click="confirmDelete(car.id)" class="btn-icon">🗑️</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">No inventory data available.</div>
    </div>

    <Transition name="fade">
      <div v-if="isEditModalOpen" class="modal-overlay" @click.self="isEditModalOpen = false">
        <div class="modal-content card">
          <h3>Edit {{ editForm.name }}</h3>
          <form @submit.prevent="saveChanges" class="edit-form">
            <div class="input-group">
              <label>Price Per Day ($)</label>
              <input v-model.number="editForm.pricePerDay" type="number" />
            </div>
            <div class="input-group">
              <label>Status</label>
              <select v-model="editForm.status">
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" @click="isEditModalOpen = false" class="btn-cancel">Cancel</button>
              <button type="submit" class="btn btn--primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>