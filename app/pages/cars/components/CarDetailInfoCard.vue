<script setup lang="ts">
import type { carType } from "../../../types/cars";

defineProps<{
  car: carType;
  isFavorite: boolean;
}>();

const emit = defineEmits(["toggle-favorite"]);
</script>

<template>
  <div class="detail-info-card card">
    <div class="info-header">
      <h2>{{ car.name }}</h2>

      <div class="rating">⭐⭐⭐⭐⭐ <span>440+ Review</span></div>

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

    <p class="description">
      {{ car.name }} has become the embodiment of outstanding performance.
    </p>

    <div class="specs-grid">
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

    <div class="detail-footer">
      <div class="price">
        <span class="amount">${{ car.pricePerDay }}.00/</span>
        <span class="unit">days</span>

        <p v-if="car.discountPrice" class="discount">
          ${{ car.discountPrice }}.00
        </p>
      </div>

      <NuxtLink :to="`/payment?id=${car.id}`" class="btn btn--primary">
        Rent Now
      </NuxtLink>
    </div>
  </div>
</template>
