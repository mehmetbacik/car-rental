<script setup lang="ts">
import type { carType } from "../../../types/cars";

defineProps<{
  car: carType;
  isFavorite: boolean;
}>();

const emit = defineEmits(["toggle-favorite"]);
</script>

<template>
  <div class="carDetail-info">
    <div class="carDetail-info__header">
      <div class="carDetail-info__headline">
        <h2>{{ car.name }}</h2>
        <button
          class="favorite-btn"
          :class="{ 'is-active': isFavorite }"
          @click="emit('toggle-favorite')"
        >
          <img
            :src="
              isFavorite ? '/icons/heart-like.svg' : '/icons/heart-dislike.svg'
            "
            alt="Favorite Icon"
          />
        </button>
      </div>
      <div class="carDetail-info__rating">
        <span
          v-for="star in 5"
          :key="star"
          class="carDetail-info__ratingStar"
          :class="{
            'carDetail-info__ratingStar--filled': star <= car.rating,
            'carDetail-info__ratingStar--empty': star > car.rating,
          }"
        />
        <span class="carDetail-info__ratingText">440+ Review</span>
      </div>
    </div>
    <div class="carDetail-info__main">
      <div class="carDetail-info__description">
        <p>
          {{ car.description }} has become the embodiment of outstanding
          performance.
        </p>
      </div>
      <div class="carDetail-info__specs">
        <div class="spec-item">
          <span class="label">Type Car</span>
          <span class="value">{{ car.type }}</span>
        </div>

        <div class="spec-item">
          <span class="label">Capacity</span>
          <span class="value">{{ car.capacity }}</span>
        </div>

        <div class="spec-item">
          <span class="label">Steering</span>
          <span class="value">{{ car.transmission }}</span>
        </div>

        <div class="spec-item">
          <span class="label">Gasoline</span>
          <span class="value">{{ car.fuelCapacity }}</span>
        </div>
      </div>
    </div>
    <div class="carDetail-info__footer">
      <div class="carDetail-info__price">
        <span class="amount">${{ car.pricePerDay }}.00/</span>
        <span class="unit">days</span>

        <p v-if="car.discountPrice" class="discount">
          ${{ car.discountPrice }}.00
        </p>
      </div>
      <NuxtLink :to="`/payment?id=${car.id}`" class="carDetail-info__btn">
        Rent Now
      </NuxtLink>
    </div>
  </div>
</template>
