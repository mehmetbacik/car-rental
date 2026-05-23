<script setup lang="ts">
defineProps<{
  cars: any[];
}>();
</script>

<template>
  <div class="car-grid">
    <CarsCarCard v-for="car in cars" :key="car.id" :car="car" />
  </div>
</template>
