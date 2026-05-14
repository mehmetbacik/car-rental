<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { carsData } from "@/data/carsData";

const windowWidth = ref(0);

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

const totalCarCount = computed(() => carsData.length);
const recommendedCars = computed(() => {
  const limit = windowWidth.value < 768 ? 5 : 8;
  return carsData.slice(0, limit);
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
        <NuxtLink to="/cars" class="btn--show-more"> Show More Car </NuxtLink>
        <span class="recommendationCars__carCount">
          {{ totalCarCount }} Car
        </span>
      </div>
    </div>
  </section>
</template>
