<script setup lang="ts">
import { ref } from 'vue'
import { carsData } from '@/data/carsData'
import Hero from "~/pages/home/components/Hero.vue";
import Booking from "~/pages/home/components/Booking.vue";
import PopularCars from './components/PopularCars.vue';

const cars = ref(carsData)

const SwitchIconPath = "/icons/switch.svg";
</script>

<template>
  <div class="home-page">
    <Hero />
    <Booking />
    <PopularCars />
    
    <section class="car-section">
      <div class="section-header">
        <span>Popular Car</span>
        <NuxtLink to="/cars">View All</NuxtLink>
      </div>
      <div class="car-grid">
        <CarsCarCard 
          v-for="car in cars" 
          :key="car.id" 
          :car="car" 
        />
      </div>
    </section>
  </div>
</template>