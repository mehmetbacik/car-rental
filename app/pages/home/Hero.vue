<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const modules = [Pagination, Autoplay];

const heroItems = [
  {
    title: "The Best Platform for Car Rental",
    description:
      "Ease of doing a car rental safely and reliably. Of course at a low price.",
    buttonText: "Rental Car",
    type: "blue",
    image: "/images/banner/hero-banner-1.png",
  },
  {
    title: "Easy way to rent a car at a low price",
    description:
      "Providing cheap car rental services and safe and comfortable facilities.",
    buttonText: "Rental Car",
    type: "light",
    image: "/images/banner/hero-banner-2.png",
  },
];

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    clickable: true,
    dynamicBullets: false,
  },
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
    <div class="container">
      <swiper
        v-bind="swiperOptions"
        :modules="modules"
        class="hero-swiper custom-hero-swiper"
      >
        <swiper-slide v-for="(heroItem, index) in heroItems" :key="index">
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