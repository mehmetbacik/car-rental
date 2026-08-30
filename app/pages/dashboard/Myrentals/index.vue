<script setup lang="ts">

import RentalsHeader from "./components/RentalsHeader.vue";
import RentalsList from "./components/RentalsList.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const myRentals = ref([
  {
    id: "R-102",
    carName: "Nissan GT-R",
    image: "/images/car/car-nissangtr.png",
    pickupDate: "2024-05-10",
    returnDate: "2024-05-15",
    totalAmount: "$400.00",
    status: "Active",
  },
]);
</script>

<template>
  <div class="user-rentals">
    <RentalsHeader />
    <RentalsList :rentals="myRentals" />
  </div>
</template>
