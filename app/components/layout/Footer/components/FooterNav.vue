<script setup lang="ts">
import type { FooterGroup } from "@/types/footer";

defineProps<{
  groups: FooterGroup[];
}>();
</script>

<template>
  <div class="footer__nav">
    <div v-for="group in groups" :key="group.title" class="link-group">
      <h4 class="link-group__title">{{ group.title }}</h4>
      <ul class="link-group__list">
        <li v-for="link in group.links" :key="link.name">
          <a
            v-if="link.isExternal"
            :href="link.url"
            target="_blank"
            rel="noopener"
          >
            {{ link.name }}
          </a>
          <NuxtLink v-else :to="link.url">
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
