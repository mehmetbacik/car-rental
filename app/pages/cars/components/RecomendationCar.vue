<script setup lang="ts">
import { computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import { carsData } from "@/data/carsData";
import "swiper/css";

const modules = [Autoplay];

const recomendationCars = computed(() => {
  return carsData.filter((car) => car.isPopular === true);
});

const swiperOptions = {
  slidesPerView: 1.5,
  spaceBetween: 32,
  autoplay: { delay: 3000, disableOnInteraction: false },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
    1280: { slidesPerView: 4 },
  },
};
</script>

<template>
  <section class="recomendationCars-wrapper">
    <div class="recomendationCars-content">
      <div class="recomendationCars__header">
        <h2 class="recomendationCars__title">Recomendation Car</h2>
        <NuxtLink to="/cars" class="recomendationCars__link">View All</NuxtLink>
      </div>
      <swiper
        v-bind="swiperOptions"
        :modules="modules"
        class="recomendationCars-swiper"
      >
        <swiper-slide v-for="car in recomendationCars" :key="car.id">
          <CarsCarCard :car="car" />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
