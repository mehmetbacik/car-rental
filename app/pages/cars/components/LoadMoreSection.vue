<script setup lang="ts">
defineProps<{
  showMore: () => void;
  canShowMore: boolean;
  total: number;
}>();
</script>

<template>
  <div v-if="canShowMore" class="pagination-wrapper">
    <button @click="showMore" class="btn btn--primary">Show more car</button>
    <span class="car-count"> {{ total }} Car available </span>
  </div>
</template>
