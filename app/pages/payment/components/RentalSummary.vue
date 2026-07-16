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
        your&nbsp;rental&nbsp;car.
      </p>
    </div>
    <div class="paymentSummary-car">
      <img
        class="paymentSummary-car__image"
        :src="car.images[0]"
        :alt="car.name"
      />
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
    <div class="paymentSummary-prices">
      <div class="paymentSummary-prices__row">
        <span class="title">Subtotal</span>
        <span class="price">${{ car.pricePerDay }}</span>
      </div>
      <div class="paymentSummary-prices__row">
        <span class="title">Tax</span>
        <span class="price">$0</span>
      </div>
    </div>
    <div class="paymentSummary-promo">
      <input
        type="text"
        placeholder="Apply promo code"
        class="paymentSummary-promo__input"
      />

      <button class="paymentSummary-promo__button">Apply Now</button>
    </div>
    <div class="paymentSummary-totalPrice">
      <div class="paymentSummary-totalPrice__content">
        <h4>Total Rental Price</h4>
        <p>Overall price and includes rental discount</p>
      </div>
      <h2 class="paymentSummary-totalPrice__price">${{ car.pricePerDay }}</h2>
    </div>
  </aside>
</template>
