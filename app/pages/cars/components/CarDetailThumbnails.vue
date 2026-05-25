<script setup lang="ts">
defineProps<{
  car: any;
  mainImage: string;
}>();

const emit = defineEmits(["change"]);
</script>

<template>
  <div class="thumbnails">
    <div
      v-for="i in 3"
      :key="i"
      class="thumb"
      :class="{ active: mainImage === car.image }"
      @click="emit('change', car.image)"
    >
      <img :src="car.image" :alt="`${car.name} thumbnail ${i}`" />
    </div>
  </div>
</template>
