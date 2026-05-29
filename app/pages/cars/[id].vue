<script setup lang="ts">
import { useCarDetail } from "../../composables/useCarDetail";
import { useCarFavorite } from "../../composables/useCarFavorite";

import CarDetailHeroSection from "./components/CarDetailHeroSection.vue";
import CarDetailInfoCard from "./components/CarDetailInfoCard.vue";
import CarDetailReviews from "./components/CarDetailReviews.vue";

const { car } = useCarDetail();
const { isFavorite, mainImage, toggleFavorite, setMainImage } =
  useCarFavorite(car);
</script>

<template>
  <div v-if="car" class="car-detail container">
    <div class="detail-grid">
      <div class="detail-visuals">
        <CarDetailHeroSection :car="car" :main-image="mainImage" />
      </div>

      <CarDetailInfoCard
        :car="car"
        :is-favorite="isFavorite"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <CarDetailReviews />
  </div>

  <div v-else class="container">Loading...</div>
</template>
