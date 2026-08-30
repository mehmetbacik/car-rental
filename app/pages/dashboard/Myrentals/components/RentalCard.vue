<script setup lang="ts">
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
  rental: Rental;
}>();
</script>

<template>
  <div class="rental-card card">
    <div class="car-preview">
      <img :src="rental.image" :alt="rental.carName" />
      <span class="status-badge" :class="rental.status.toLowerCase()">
        {{ rental.status }}
      </span>
    </div>
    <div class="rental-details">
      <h3>{{ rental.carName }}</h3>
      <div class="info-row">
        <span>Reservation No:</span>
        <strong>{{ rental.id }}</strong>
      </div>
      <div class="info-row">
        <span>Pickup Date:</span>
        <strong>{{ rental.pickupDate }}</strong>
      </div>
      <div class="info-row">
        <span>Return Date:</span>
        <strong>{{ rental.returnDate }}</strong>
      </div>
      <hr />
      <div class="total">
        <span>Total Paid:</span>
        <span class="price">
          {{ rental.totalAmount }}
        </span>
      </div>
    </div>
  </div>
</template>
