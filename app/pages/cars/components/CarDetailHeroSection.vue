<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { carsData } from "@/data/carsData";
import type { carType } from "@/types/cars";

const route = useRoute();

const car = computed<carType>(() => {
  const id = route.params.id as string;
  return (carsData.find((c) => c.id === id) || carsData[0]) as carType;
});
</script>

<template>
  <div class="car-detail container">
    <div class="simple-layout">
      <div class="image-box">
        <img
          :src="car.images[0]"
          :alt="car.name"
          class="main-image"
        />
      </div>
    </div>
  </div>
</template>