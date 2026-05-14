<script setup lang="ts">
import Hero from "~/pages/home/components/Hero.vue";
import Booking from "~/pages/home/components/Booking.vue";
import PopularCars from './components/PopularCars.vue';
import RecommendationCars from './components/RecommendationCars.vue';
</script>

<template>
  <div class="home-page">
    <Hero />
    <Booking />
    <PopularCars />
    <RecommendationCars />
  </div>
</template>