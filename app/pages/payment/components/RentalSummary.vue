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
    <div class="paymentSummary-car">
      <img class="paymentSummary-car__image" :src="car.images[0]" :alt="car.name" />
      <div class="paymentSummary-car__content">
        <h4>{{ car.name }}</h4>
        <div class="paymentSummary-car__rating">
          <span
            v-for="star in 5"
            :key="star"
            class="paymentSummary-car__ratingStar"
            :class="{
              'paymentSummary-car__ratingStar--filled': star <= car.rating,
              'paymentSummary-car__ratingStar--empty': star > car.rating,
            }"
          />
          <span class="paymentSummary-car__ratingText">440+ Review</span>
        </div>
      </div>
    </div>
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
