<script setup lang="ts">
import { computed } from "vue";
import { useInventoryStore } from "@/stores/useInventory";

const inventoryStore = useInventoryStore();

const favoriteCars = computed(() => inventoryStore.favoriteCars);
</script>

<template>
  <div class="favoritesPage container">
    <div class="favoritesHeader">
      <h1>My Favorites</h1>
      <p v-if="favoriteCars.length">
        You have {{ favoriteCars.length }} cars in your wishlist.
      </p>
    </div>
    <div v-if="favoriteCars.length > 0" class="favorites-carsWrapper">
      <CarsCarCard v-for="car in favoriteCars" :key="car.id" :car="car" />
    </div>
    <div v-else class="favorites-emptyWrapper">
      <h3>Your wishlist is empty</h3>
      <p>You haven't added any cars to your favorites yet. Start exploring!</p>
      <NuxtLink to="/search-results" class="favorites-btnExplore">
        Explore Cars
      </NuxtLink>
    </div>
  </div>
</template>
