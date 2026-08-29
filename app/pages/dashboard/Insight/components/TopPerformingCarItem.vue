<script setup lang="ts">
defineProps<{
  car: {
    id: string;
    name: string;
    images: string[];
    pricePerDay: number;
  };
}>();
</script>

<template>
  <div class="top-car-item">
    <img
      :src="car.images[0]"
      :alt="car.name"
    />
    <div class="details">
      <span class="name">
        {{ car.name }}
      </span>
      <span class="rentals">
        24 Rentals this month
      </span>
    </div>
    <span class="earning">
      +${{ car.pricePerDay * 24 }}
    </span>
  </div>
</template>