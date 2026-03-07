<script setup lang="ts">
const { progress, isLoading, error, start, finish } = useLoadingIndicator();
</script>

<template>
  <div v-if="isLoading" class="global-loader">
    <div class="global-loader__bar" :style="{ width: `${progress}%` }"></div>

    <div class="global-loader__overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>
