<script setup lang="ts">
const LogoPath = "/images/logo.svg";
</script>

<template>
  <div class="footer__brand">
    <NuxtLink to="/" class="logo">
      <img :src="LogoPath" alt="Morent Logo" />
    </NuxtLink>
    <p class="description">
      Our vision is to provide convenience and help increase your sales
      business.
    </p>
  </div>
</template>
