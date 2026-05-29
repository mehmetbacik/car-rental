<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";

import { carsData } from "@/data/carsData";
import type { carType } from "@/types/cars";

const route = useRoute();

const thumbsSwiper = ref<SwiperType | null>(null);

const car = computed<carType>(() => {
  const id = route.params.id as string;
  return (carsData.find((c) => c.id === id) || carsData[0]) as carType;
});
</script>

<template>
  <div class="car-detail">
    <div class="simple-layout">
      <div class="image-box">
        <Swiper
          :modules="[Thumbs]"
          :thumbs="{ swiper: thumbsSwiper }"
          class="car-swiper"
        >
          <SwiperSlide v-for="(img, index) in car.images" :key="index">
            <img :src="img" :alt="car.name" class="main-image" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="thumb-box">
        <Swiper
          :modules="[Thumbs]"
          watch-slides-progress
          watch-slides-visibility
          :slides-per-view="5"
          space-between="10"
          @swiper="(swiper) => (thumbsSwiper = swiper)"
          class="thumb-swiper"
        >
          <SwiperSlide v-for="(img, index) in car.images" :key="index">
            <img :src="img" :alt="car.name" class="thumb-image" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>
