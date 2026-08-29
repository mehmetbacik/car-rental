<script setup lang="ts">

import TopPerformingCarItem from "./TopPerformingCarItem.vue";

defineProps<{
  cars: Array<{
    id: string;
    name: string;
    images: string[];
    pricePerDay: number;
  }>;
}>();
</script>

<template>
  <div class="insight-card">
    <h3>Top Performing Cars</h3>
    <div class="top-cars-list">
      <TopPerformingCarItem v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </div>
</template>
