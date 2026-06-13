<script setup lang="ts">
import { useCarDetail } from "../../composables/useCarDetail";
import { useCarFavorite } from "../../composables/useCarFavorite";

import CarDetailHeroSection from "./components/CarDetailHeroSection.vue";
import CarDetailInfoCard from "./components/CarDetailInfoCard.vue";
import CarDetailReviews from "./components/CarDetailReviews.vue";
import RecentCars from "./components/RecentCars.vue";
import RecomendationCar from "./components/RecomendationCar.vue";

const { car } = useCarDetail();
const { isFavorite, mainImage, toggleFavorite, setMainImage } =
  useCarFavorite(car);
</script>

<template>
  <div v-if="car" class="carDetail container">
    <div class="carDetail-content">
      <CarDetailHeroSection :car="car" :main-image="mainImage" />
      <CarDetailInfoCard
        :car="car"
        :is-favorite="isFavorite"
        @toggle-favorite="toggleFavorite"
      />
    </div>
    <CarDetailReviews />
    <RecentCars />
    <RecomendationCar />
  </div>

  <div v-else class="container">Loading...</div>
</template>
