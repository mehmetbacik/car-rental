<script setup lang="ts">
import { computed } from "vue";
import { carsData } from "@/data/carsData";

const totalCarCount = computed(() => carsData.length);
const recommendedCars = computed(() => {
  return carsData.slice(0, 8);
});
</script>
<template>
  <section class="recommendationCars-wrapper">
    <div class="recommendationCars-content">
      <div class="recommendationCars__header">
        <h2 class="recommendationCars__title">Recommendation Car</h2>
        <NuxtLink to="/cars" class="recommendationCars__link"
          >View All</NuxtLink
        >
      </div>
      <div class="recommendationCars__grid">
        <CarsCarCard v-for="car in recommendedCars" :key="car.id" :car="car" />
      </div>
      <div class="recommendationCars__footer">
        <NuxtLink to="/cars" class="btn btn--primary btn--show-more">
          Show More Car
        </NuxtLink>
        <span class="recommendationCars__carCount">
          <strong>{{ totalCarCount }}</strong> Car available
        </span>
      </div>
    </div>
  </section>
</template>