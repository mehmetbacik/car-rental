<script setup lang="ts">
import type { FooterLink } from "@/types/footer";

defineProps<{
  links: FooterLink[];
}>();

const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="footer__bottom">
    <p class="copyright">©{{ currentYear }} Morent. All rights reserved</p>
    <div class="legal-links">
      <NuxtLink v-for="legal in links" :key="legal.name" :to="legal.url">
        {{ legal.name }}
      </NuxtLink>
    </div>
  </div>
</template>
