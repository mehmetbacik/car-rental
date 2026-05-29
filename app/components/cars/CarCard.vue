<script setup lang="ts">
import { computed } from "vue";
import type { carType } from "../../types/cars";
import { useCarFavorite } from "../../composables/useCarFavorite";

const HeartLikeIconPath = "/icons/heart-like.svg";
const HeartDisslikeIconPath = "/icons/heart-dislike.svg";
const GasIconPath = "/icons/gas.svg";
const TransmissionIconPath = "/icons/transmission.svg";
const PeopleIconPath = "/icons/people.svg";

const props = defineProps<{
  car: carType;
}>();

const carRef = computed(() => props.car);

const { isFavorite, toggleFavorite } = useCarFavorite(carRef);
</script>

<template>
  <div class="car-card">
    <div class="car-card__header">
      <div class="info">
        <h3 class="name">{{ car.name }}</h3>
        <span class="type">{{ car.type }}</span>
      </div>
      <button
        class="favorite-btn"
        :class="{ 'is-active': isFavorite }"
        @click="toggleFavorite"
      >
        <span v-if="isFavorite">
          <img :src="HeartLikeIconPath" alt="Favorite" />
        </span>
        <span v-else>
          <img :src="HeartDisslikeIconPath" alt="Favorite" />
        </span>
      </button>
    </div>

    <div class="car-card__image-wrapper">
      <img :src="car.images[0]" :alt="car.name" class="car-image" />
      <div class="image-shadow"></div>
    </div>

    <div class="car-card__specs">
      <div class="spec-item">
        <span class="icon">
          <img :src="GasIconPath" alt="Gas" />
        </span>
        <span>{{ car.fuelCapacity }}</span>
      </div>
      <div class="spec-item">
        <span class="icon">
          <img :src="TransmissionIconPath" alt="Transmission" />
        </span>
        <span>{{ car.transmission }}</span>
      </div>
      <div class="spec-item">
        <span class="icon">
          <img :src="PeopleIconPath" alt="People" />
        </span>
        <span>{{ car.capacity }}</span>
      </div>
    </div>

    <div class="car-card__footer">
      <div class="price-box">
        <div class="current-price">
          <span class="value">${{ car.pricePerDay }}.00/</span>
          <span class="unit">day</span>
        </div>
        <span v-if="car.discountPrice" class="old-price">
          ${{ car.discountPrice }}.00
        </span>
      </div>

      <NuxtLink :to="`/cars/${car.id}`" class="btn-rent"> Rent Now </NuxtLink>
    </div>
  </div>
</template>
