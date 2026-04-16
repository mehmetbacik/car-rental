<script setup lang="ts">
import { footerGroups, legalLinks } from "@/data/footerData";

const LogoPath = "/images/logo.svg";
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <NuxtLink to="/" class="logo">
            <img :src="LogoPath" alt="Morent Logo" />
          </NuxtLink>
          <p class="description">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>

        <div class="footer__nav">
          <div
            v-for="group in footerGroups"
            :key="group.title"
            class="link-group"
          >
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
      </div>

      <div class="footer__bottom">
        <p class="copyright">©2026 Morent. All rights reserved</p>
        <div class="legal-links">
          <NuxtLink
            v-for="legal in legalLinks"
            :key="legal.name"
            :to="legal.url"
          >
            {{ legal.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
