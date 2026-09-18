<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  item: {
    id: string | number;
    label: string;
    link: string;
    icon: string;
  };
}>();
</script>

<template>
  <NuxtLink :to="item.link" class="adminSidebar-navLink" active-class="active">
    <span class="icon">
      <Icon :icon="item.icon" width="20" height="20" />
    </span>
    <span class="label">
      {{ item.label }}
    </span>
  </NuxtLink>
</template>
