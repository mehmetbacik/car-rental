<script setup lang="ts">
import { ref } from "vue";
import FilterSidebar from "./components/FilterSidebar.vue";
import Booking from "./components/Booking.vue";
import CarGrid from "./components/CarGrid.vue";
import LoadMoreSection from "./components/LoadMoreSection.vue";

import { useCarFilters } from "../../composables/useCarFilters";
import { useFilteredCars } from "../../composables/useFilteredCars";
import { useCarPagination } from "../../composables/useCarPagination";

const isSidebarOpen = ref(false);

const { activeFilters, setFilters } = useCarFilters();
const { filteredCars } = useFilteredCars(activeFilters);
const { displayedCars, showMore, displayCount } =
  useCarPagination(filteredCars);

const handleFilterChange = (newFilters: any) => {
  setFilters(newFilters);
  displayCount.value = 4;
};
</script>

<template>
  <div class="container">
    <div class="category-page">
      <button class="mobile-filter-trigger" @click="isSidebarOpen = true">
        Filter
      </button>
      <div
        v-if="isSidebarOpen"
        class="sidebar-overlay"
        @click="isSidebarOpen = false"
      />
      <div class="category-layout">
        <FilterSidebar
          :is-open="isSidebarOpen"
          @close="isSidebarOpen = false"
          @filter-change="handleFilterChange"
        />
        <div class="main-content">
          <Booking />
          <CarGrid :cars="displayedCars" />
          <div v-if="filteredCars.length === 0" class="no-results">
            <p>No vehicles matching your criteria were found.</p>
          </div>
          <LoadMoreSection
            :show-more="showMore"
            :can-show-more="displayCount < filteredCars.length"
            :total="filteredCars.length"
          />
        </div>
      </div>
    </div>
  </div>
</template>
