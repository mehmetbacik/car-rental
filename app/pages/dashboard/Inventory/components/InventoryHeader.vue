<script setup lang="ts">
defineProps<{
  totalCars: number;
}>();

const emit = defineEmits<{
  (e: "add-car"): void;
}>();
</script>

<template>
  <div class="inventory-header">
    <div>
      <h2>Car Inventory</h2>
      <p>
        Total Vehicles:
        <strong>{{ totalCars }}</strong>
      </p>
    </div>
    <button class="btn btn--primary" @click="emit('add-car')">
      + Add New Car
    </button>
  </div>
</template>
