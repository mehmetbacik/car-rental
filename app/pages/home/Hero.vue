<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import type { heroType } from "@/types/hero";
import { heroData } from "@/data/heroData";

const modules = [Pagination, Autoplay];
const heroItems: heroType[] = heroData;

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: { delay: 5000, disableOnInteraction: false },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
      allowTouchMove: false,
    },
  },
};
</script>

<template>
  <section class="hero-wrapper">
    <div class="hero-content">
      <swiper
        v-bind="swiperOptions"
        :modules="modules"
        class="hero-swiper custom-hero-swiper"
      >
        <swiper-slide v-for="heroItem in heroItems" :key="heroItem.id">
          <div :class="['hero-card', `hero-card--${heroItem.type}`]">
            <div class="hero-card__content">
              <h2 class="hero-card__title">{{ heroItem.title }}</h2>
              <p class="hero-card__text">{{ heroItem.description }}</p>
              <button
                :class="[
                  'btn',
                  heroItem.type === 'blue' ? 'btn--primary' : 'btn--info',
                ]"
              >
                {{ heroItem.buttonText }}
              </button>
            </div>
            <div class="hero-card__image" v-if="heroItem.image">
              <img :src="heroItem.image" :alt="heroItem.title" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
