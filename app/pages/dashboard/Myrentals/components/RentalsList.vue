<script setup lang="ts">

import RentalCard from "./RentalCard.vue";

interface Rental {
  id: string;
  carName: string;
  image: string;
  pickupDate: string;
  returnDate: string;
  totalAmount: string;
  status: string;
}

defineProps<{
  rentals: Rental[];
}>();
</script>

<template>
  <div class="rentals-grid">
    <RentalCard v-for="rental in rentals" :key="rental.id" :rental="rental" />
  </div>
</template>
