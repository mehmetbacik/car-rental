<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

import { carsData } from "@/data/carsData";
import type { carType } from "@/types/cars";

const HeartLikeIconPath = "/icons/heart-like.svg";
const HeartDisslikeIconPath = "/icons/heart-dislike.svg";

const route = useRoute();

const car = computed<carType>(() => {
  const routeId = route.params.id as string;

  const foundCar = carsData.find((c) => c.id === routeId);

  return (foundCar || carsData[0]) as carType;
});

const isFavorite = ref(false);
const mainImage = ref("");

watch(
  () => car.value,
  (newCar) => {
    isFavorite.value = newCar.isFavorite;
    mainImage.value = newCar.image;
  },
  { immediate: true },
);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const reviews = [
  {
    id: 1,
    user: "Alex Stanton",
    role: "CEO at Bukalapak",
    date: "21 July 2022",
    comment: "We are very happy with the service...",
    rating: 4,
  },
  {
    id: 2,
    user: "Skylar Dias",
    role: "CEO at Amazon",
    date: "20 July 2022",
    comment: "Very comfortable car and clean...",
    rating: 5,
  },
];
</script>

<template>
  <div v-if="car" class="car-detail container">
    <div class="detail-grid">
      <div class="detail-visuals">
        <div class="main-card ad-card--blue">
          <h2>{{ car.name }} with the best design and acceleration</h2>

          <p>
            Safety and comfort while driving a futuristic and elegant
            {{ car.type }} car
          </p>

          <img :src="mainImage" :alt="car.name" class="main-img" />
        </div>

        <div class="thumbnails">
          <div
            v-for="i in 3"
            :key="i"
            class="thumb"
            :class="{ active: mainImage === car.image }"
            @click="mainImage = car.image"
          >
            <img :src="car.image" :alt="`${car.name} thumbnail ${i}`" />
          </div>
        </div>
      </div>

      <div class="detail-info-card card">
        <div class="info-header">
          <div class="title-row">
            <h2>{{ car.name }}</h2>
          </div>

          <div class="rating">
            ⭐⭐⭐⭐⭐
            <span>440+ Review</span>
          </div>

          <button
            class="favorite-btn"
            :class="{ 'is-active': isFavorite }"
            @click="toggleFavorite"
          >
            <img
              :src="isFavorite ? HeartLikeIconPath : HeartDisslikeIconPath"
              alt="Favorite Icon"
            />
          </button>
        </div>

        <p class="description">
          {{ car.name }} has become the embodiment of outstanding performance,
          inspired by the most unforgiving proving ground, the race track.
        </p>

        <div class="specs-grid">
          <div class="spec-item">
            <span class="label">Type Car</span>
            <span class="value">{{ car.type }}</span>
          </div>

          <div class="spec-item">
            <span class="label">Capacity</span>
            <span class="value">{{ car.capacity }}</span>
          </div>

          <div class="spec-item">
            <span class="label">Steering</span>
            <span class="value">
              {{ car.transmission }}
            </span>
          </div>

          <div class="spec-item">
            <span class="label">Gasoline</span>
            <span class="value">
              {{ car.fuelCapacity }}
            </span>
          </div>
        </div>

        <div class="detail-footer">
          <div class="price">
            <span class="amount"> ${{ car.pricePerDay }}.00/ </span>

            <span class="unit">days</span>

            <p v-if="car.discountPrice" class="discount">
              ${{ car.discountPrice }}.00
            </p>
          </div>

          <NuxtLink :to="`/payment?id=${car.id}`" class="btn btn--primary">
            Rent Now
          </NuxtLink>
        </div>
      </div>
    </div>

    <section class="reviews card">
      <div class="reviews-header">
        <h3>Reviews</h3>

        <span class="badge">
          {{ reviews.length }}
        </span>
      </div>

      <div v-for="review in reviews" :key="review.id" class="review-item">
        <div class="review-user">
          <img
            :src="`https://ui-avatars.com/api/?name=${review.user}&background=random`"
            :alt="review.user"
          />

          <div class="user-info">
            <h4>{{ review.user }}</h4>
            <p>{{ review.role }}</p>
          </div>

          <div class="review-date-rating">
            <span class="date">
              {{ review.date }}
            </span>

            <div class="stars">
              {{ "⭐".repeat(review.rating) }}
            </div>
          </div>
        </div>

        <p class="review-text">
          {{ review.comment }}
        </p>
      </div>

      <button class="show-all-btn">Show All ↓</button>
    </section>
  </div>

  <div v-else class="container">Loading...</div>
</template>
