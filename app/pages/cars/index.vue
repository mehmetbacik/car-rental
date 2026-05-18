<script setup lang="ts">
import { ref, computed } from "vue";
import { carsData } from "@/data/carsData";

const SwitchIconPath = "/icons/switch.svg";

const activeFilters = ref({
  types: [] as string[],
  capacities: [] as string[],
  transmissions: [] as string[],
  fuels: [] as string[],
  maxPrice: Infinity,
});

const displayCount = ref(4);

const handleFilterChange = (newFilters: typeof activeFilters.value) => {
  activeFilters.value = newFilters;
  displayCount.value = 4;
};

const filteredCars = computed(() => {
  return carsData.filter((car) => {
    const matchesType =
      activeFilters.value.types.length === 0 ||
      activeFilters.value.types.includes(car.type);

    const matchesCapacity =
      activeFilters.value.capacities.length === 0 ||
      activeFilters.value.capacities.includes(car.capacity);

    const matchesTransmission =
      activeFilters.value.transmissions.length === 0 ||
      activeFilters.value.transmissions.includes(car.transmission);

    const matchesFuel =
      activeFilters.value.fuels.length === 0 ||
      activeFilters.value.fuels.includes(car.fuelCapacity);

    const matchesPrice = car.pricePerDay <= activeFilters.value.maxPrice;

    return (
      matchesType &&
      matchesCapacity &&
      matchesTransmission &&
      matchesFuel &&
      matchesPrice
    );
  });
});

const displayedCars = computed(() => {
  return filteredCars.value.slice(0, displayCount.value);
});

const showMore = () => {
  displayCount.value += 4;
};
</script>

<template>
  <div class="category-page">
    <div class="container category-layout">
      <CarsFilterSidebar
        class="desktop-only"
        @filter-change="handleFilterChange"
      />
      <div class="main-content">
        <section class="booking-wrapper">
          <SharedBookingCard type="Pick-Up" />
          <button class="switch-btn">
            <img :src="SwitchIconPath" alt="Switch" />
          </button>
          <SharedBookingCard type="Drop-Off" />
        </section>
        <div class="car-grid">
          <CarsCarCard v-for="car in displayedCars" :key="car.id" :car="car" />
        </div>
        <div v-if="filteredCars.length === 0" class="no-results">
          <p>Aradığınız kriterlere uygun araç bulunamadı.</p>
        </div>
        <div
          v-if="displayCount < filteredCars.length"
          class="pagination-wrapper"
        >
          <button @click="showMore" class="btn btn--primary">
            Show more car
          </button>
          <span class="car-count">{{ filteredCars.length }} Car available</span>
        </div>
      </div>
    </div>
  </div>
</template>
