<script setup lang="ts">
defineProps<{
  car: {
    name: string;
    images: string[];
    rating: number;
    pricePerDay: number;
  };
}>();
</script>

<template>
  <aside class="paymentSummary">
    <div class="paymentSummary-header">
      <h3>Rental Summary</h3>
      <p>
        Prices may change depending on the length of the rental and the price of
        your rental car.
      </p>
    </div>
    <div class="summary-car">
      <img :src="car.images[0]" :alt="car.name" />
      <div>
        <h4>{{ car.name }}</h4>
        <span>⭐⭐⭐⭐⭐ {{ car.rating }} Rating</span>
      </div>
    </div>
    <hr />
    <div class="summary-prices">
      <div class="row">
        <span>Subtotal</span>
        <strong>${{ car.pricePerDay }}</strong>
      </div>
      <div class="row">
        <span>Tax</span>
        <strong>$0.00</strong>
      </div>
    </div>
    <div class="total-price">
      <div>
        <h4>Total Rental Price</h4>
        <p>Overall price and includes rental discount</p>
      </div>
      <h2>${{ car.pricePerDay }}</h2>
    </div>
  </aside>
</template>
