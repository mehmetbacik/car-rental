<script setup lang="ts">
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
    <header class="mb-4">
      <h2>My Rentals</h2>
      <p>Details of your current and past rental transactions.</p>
    </header>

    <div class="rentals-grid">
      <div
        v-for="rental in myRentals"
        :key="rental.id"
        class="rental-card card"
      >
        <div class="car-preview">
          <img :src="rental.image" alt="Car" />
          <span class="status-badge" :class="rental.status.toLowerCase()">{{
            rental.status
          }}</span>
        </div>

        <div class="rental-details">
          <h3>{{ rental.carName }}</h3>
          <div class="info-row">
            <span>Reservation No:</span> <strong>{{ rental.id }}</strong>
          </div>
          <div class="info-row">
            <span>Pickup Date:</span> <strong>{{ rental.pickupDate }}</strong>
          </div>
          <div class="info-row">
            <span>Return Date:</span> <strong>{{ rental.returnDate }}</strong>
          </div>
          <hr />
          <div class="total">
            <span>Total Paid:</span>
            <span class="price">{{ rental.totalAmount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
