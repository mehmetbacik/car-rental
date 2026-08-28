<script setup lang="ts">

import HelpCategoryCard from "./HelpCategoryCard.vue";

defineProps<{
  categories: Array<{
    id: string | number;
    icon: string;
    title: string;
    count: number;
  }>;
}>();
</script>

<template>
  <section class="help-categories">
    <HelpCategoryCard
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </section>
</template>
