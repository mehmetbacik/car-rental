<script setup lang="ts">
import { footerGroups, legalLinks } from "@/data/footerData";
import FooterBrand from "./components/FooterBrand.vue";
import FooterNav from "./components/FooterNav.vue";
import FooterBottom from "./components/FooterBottom.vue";
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <FooterBrand />
        <FooterNav :groups="footerGroups" />
      </div>
      
      <FooterBottom :links="legalLinks" />
    </div>
  </footer>
</template>