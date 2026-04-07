<script setup lang="ts">
import { useInventoryStore } from "@/stores/useInventory";

const inventoryStore = useInventoryStore();

const favoriteCars = computed(() => inventoryStore.favoriteCars);
</script>

<template>
  <div class="favorites-page">
    <div class="container">
      <header class="page-header">
        <h1>My Favorites</h1>
        <p v-if="favoriteCars.length">
          You have {{ favoriteCars.length }} cars in your wishlist.
        </p>
      </header>

      <div v-if="favoriteCars.length > 0" class="cars-grid">
        <div v-for="car in favoriteCars" :key="car.id" class="car-card card">
          <div class="card-header">
            <div>
              <h4>{{ car.name }}</h4>
              <p>{{ car.type }}</p>
            </div>
            <button
              @click="inventoryStore.toggleFavorite(car.id)"
              class="btn-wishlist active"
            >
              <img src="/icons/heart.svg" alt="remove from favorites" />
            </button>
          </div>

          <div class="image-wrapper">
            <img :src="car.image" :alt="car.name" class="car-image" />
          </div>

          <div class="card-footer">
            <div class="price">
              <strong>${{ car.pricePerDay }}.00/</strong>
              <span>day</span>
            </div>
            <button class="btn-rent" @click="$router.push(`/cars/${car.id}`)">
              Rent Now
            </button>
          </div>
        </div>
      </div>

      <div v-else class="empty-favorites">
        <div class="empty-icon">❤️</div>
        <h3>Your wishlist is empty</h3>
        <p>
          You haven't added any cars to your favorites yet. Start exploring!
        </p>
        <NuxtLink to="/search-results" class="btn-explore">
          Explore Cars
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
