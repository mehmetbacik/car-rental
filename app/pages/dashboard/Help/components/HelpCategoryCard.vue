<script setup lang="ts">
defineProps<{
  category: {
    id: string | number;
    icon: string;
    title: string;
    count: number;
  };
}>();
</script>

<template>
  <div class="category-card card">
    <span class="icon">{{ category.icon }}</span>
    <h3>{{ category.title }}</h3>
    <p>{{ category.count }} Articles</p>
  </div>
</template>
