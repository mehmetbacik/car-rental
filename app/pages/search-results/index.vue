<script setup lang="ts">
import { useSearchStore } from "@/stores/useSearch";
import { useInventoryStore } from "@/stores/useInventory";

const searchStore = useSearchStore();
const inventoryStore = useInventoryStore();
const route = useRoute();

onMounted(() => {
  if (route.query.q) {
    searchStore.setSearchQuery(route.query.q as string);
  }
});

const selectedTypes = ref<string[]>([]);
const maxPrice = ref(200);

const filteredCars = computed(() => {
  return searchStore.filteredResults.filter((car) => {
    const matchesPrice = car.pricePerDay <= maxPrice.value;
    const matchesType =
      selectedTypes.value.length === 0 ||
      selectedTypes.value.includes(car.type);
    return matchesPrice && matchesType;
  });
});
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
      </aside>

      <main class="results-main">
        <header class="results-info">
          <h3>
            Search Results for "{{ route.query.q || searchStore.searchQuery }}"
          </h3>
          <p>{{ filteredCars.length }} cars available</p>
        </header>

        <div v-if="filteredCars.length > 0" class="cars-grid">
          <div v-for="car in filteredCars" :key="car.id" class="car-card card">
            <div class="card-header">
              <h4>{{ car.name }}</h4>
              <p>{{ car.type }}</p>
            </div>
            <img :src="car.image" :alt="car.name" class="car-image" />
            <div class="card-footer">
              <div class="price">
                <strong>${{ car.pricePerDay }}.00/</strong>
                <span>day</span>
              </div>
              <button class="btn-rent">Rent Now</button>
            </div>
          </div>
        </div>

        <div v-else class="empty-results">
          <div class="empty-icon">🔍</div>
          <h4>No results found</h4>
          <p>
            We couldn't find any cars matching your current search or filters.
          </p>
          <button @click="searchStore.setSearchQuery('')" class="btn-clear">
            Clear Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
