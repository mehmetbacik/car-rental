<script setup lang="ts">
import carsData from "@/data/cars.json";

const displayCount = ref(4);
const allCars = ref([...carsData, ...carsData, ...carsData]);
const displayedCars = computed(() =>
  allCars.value.slice(0, displayCount.value),
);

const showMore = () => {
  displayCount.value += 4;
};

const SwitchIconPath = "/icons/switch.svg";

</script>

<template>
  <div class="category-page">
    <div class="container category-layout">
      <CarsFilterSidebar class="desktop-only" />

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

        <div v-if="displayCount < allCars.length" class="pagination-wrapper">
          <button @click="showMore" class="btn btn--primary">
            Show more car
          </button>
          <span class="car-count">{{ allCars.length }} Car</span>
        </div>
      </div>
    </div>
  </div>
</template>
