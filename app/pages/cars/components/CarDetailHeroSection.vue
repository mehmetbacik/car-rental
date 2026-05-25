<script setup lang="ts">
defineProps<{
  car: any;
  mainImage: string;
}>();
</script>

<template>
  <div class="main-card ad-card--blue">
    <h2>{{ car.name }} with the best design and acceleration</h2>

    <p>
      Safety and comfort while driving a futuristic and elegant
      {{ car.type }} car
    </p>

    <img :src="mainImage" :alt="car.name" class="main-img" />
  </div>
</template>
