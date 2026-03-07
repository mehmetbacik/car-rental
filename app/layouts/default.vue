<script setup lang="ts">
import Header from '~/components/layout/Header.vue';

</script>

<template>
  <div class="layout-wrapper">
    <AppGlobalLoader />
    <Header />
    <main class="main">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
