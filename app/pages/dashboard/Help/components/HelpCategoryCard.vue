<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
    <span class="icon">
      <Icon :icon="category.icon" />
    </span>

    <h3>{{ category.title }}</h3>
    <p>{{ category.count }} Articles</p>
  </div>
</template>