<script setup lang="ts">
import carsData from '@/data/cars.json'
const cars = ref(carsData)

const SwitchIconPath = "/icons/switch.svg";

</script>

<template>
  <div class="home-page container">
    <section class="hero-ads">
      <div class="ad-card ad-card--blue">
        <h2>The Best Platform for Car Rental</h2>
        <p>Ease of doing a car rental safely and reliably. Of course at a low price.</p>
        <button class="btn btn--primary">Rental Car</button>
      </div>
      <div class="ad-card ad-card--light">
        <h2>Easy way to rent a car at a low price</h2>
        <p>Providing cheap car rental services and safe and comfortable facilities.</p>
        <button class="btn btn--info">Rental Car</button>
      </div>
    </section>

    <section class="booking-wrapper">
      <SharedBookingCard type="Pick-Up" />
      <button class="switch-btn">
        <img :src="SwitchIconPath" alt="Switch" />
      </button>
      <SharedBookingCard type="Drop-Off" />
    </section>

    <section class="car-section">
      <div class="section-header">
        <span>Popular Car</span>
        <NuxtLink to="/cars">View All</NuxtLink>
      </div>
      <div class="car-grid">
        <CarsCarCard v-for="car in cars" :key="car.id" :car="car" />
      </div>
    </section>
  </div>
</template>