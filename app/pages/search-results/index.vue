<script setup lang="ts">
import { useSearchStore } from "@/stores/useSearch";
import { useInventoryStore } from "@/stores/useInventory";

const searchStore = useSearchStore();
const inventoryStore = useInventoryStore();
const route = useRoute();

const selectedTypes = ref<string[]>([]);
const maxPrice = ref(500);

onMounted(() => {
  if (route.query.q) {
    searchStore.activeSearchTerm = route.query.q as string;
  }
});

const filteredCars = computed(() => {
  return searchStore.pageResults.filter((car) => {
    const matchesPrice = car.pricePerDay <= maxPrice.value;
    const matchesType =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.includes(car.type);
    return matchesPrice && matchesType;
  });
});

const clearAllFilters = () => {
  selectedTypes.value = [];
  maxPrice.value = 500;
  searchStore.activeSearchTerm = "";
};
</script>

<template>
  <div class="search-page-wrapper">
    <div class="container search-container">
      <aside class="filter-sidebar card">
        <div class="filter-group">
          <h5>T Y P E</h5>
          <div
            v-for="type in ['Sport', 'SUV', 'MPV', 'Sedan']"
            :key="type"
            class="checkbox-item"
          >
            <input
              type="checkbox"
              :id="type"
              :value="type"
              v-model="selectedTypes"
            />
            <label :for="type">{{ type }}</label>
          </div>
        </div>

        <div class="filter-group">
          <h5>P R I C E</h5>
          <input
            type="range"
            v-model="maxPrice"
            min="0"
            max="500"
            class="price-range"
          />
          <div class="price-labels">
            <span>Max. ${{ maxPrice }}.00</span>
          </div>
        </div>

        <button
          v-if="selectedTypes.length > 0 || maxPrice < 500"
          @click="clearAllFilters"
          class="btn-reset-link"
        >
          Reset Filters
        </button>
      </aside>

      <main class="results-main">
        <header class="results-info">
          <h3>
            <span v-if="searchStore.activeSearchTerm">
              Search Results for "{{ searchStore.activeSearchTerm }}"
            </span>
            <span v-else>All Available Cars</span>
          </h3>
          <p>{{ filteredCars.length }} cars available</p>
        </header>

        <div v-if="filteredCars.length > 0" class="cars-grid">
          <div v-for="car in filteredCars" :key="car.id" class="car-card card">
            <div class="card-header">
              <div class="header-main">
                <h4>{{ car.name }}</h4>
                <p>{{ car.type }}</p>
              </div>
              <button class="btn-wishlist">
                <img src="/icons/heart.svg" alt="wishlist" />
              </button>
            </div>

            <div class="image-wrapper">
              <img :src="car.images[0]" :alt="car.name" class="car-image" />
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

        <div v-else class="empty-results">
          <div class="empty-icon">🔍</div>
          <h4>No results found</h4>
          <p>
            We couldn't find any cars matching "{{
              searchStore.activeSearchTerm
            }}" or your selected filters.
          </p>
          <button @click="clearAllFilters" class="btn-clear">
            Clear All Search & Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
