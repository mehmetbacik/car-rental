<script setup lang="ts">
interface Car {
  id: number | string;
  images: string[];
  name: string;
  type: string;
  status?: string;
}

defineProps<{
  cars: Car[];
}>();
</script>

<template>
  <div class="recentInventory-content">
    <div class="card-header">
      <h3>Recent Inventory</h3>

      <NuxtLink to="/dashboard/inventory" class="view-all"> View All </NuxtLink>
    </div>

    <div class="mini-list">
      <div v-for="car in cars.slice(0, 5)" :key="car.id" class="mini-item">
        <div class="car-info-mini">
          <img :src="car.images[0]" :alt="car.name" class="mini-img" />

          <div class="text">
            <span class="name">{{ car.name }}</span>
            <span class="type">{{ car.type }}</span>
          </div>
        </div>

        <span class="badge" :class="car.status?.toLowerCase() || 'available'">
          {{ car.status || "Available" }}
        </span>
      </div>
    </div>
  </div>
</template>
