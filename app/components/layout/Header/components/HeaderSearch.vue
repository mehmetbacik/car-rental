<script setup lang="ts">
const searchStore = useSearchStore();
const router = useRouter();
const searchInputContainer = ref<HTMLElement | null>(null);

const handleInput = () => {
  searchStore.isDropdownOpen = searchStore.searchQuery.length > 0;
};

const handleSearchEnter = () => {
  const termToSearch = searchStore.searchQuery.trim();
  if (termToSearch) {
    searchStore.executeSearch(termToSearch);
    router.push({ path: "/search-results", query: { q: termToSearch } });
  }
};

const selectCar = (carId: string) => {
  searchStore.closeDropdown();
  searchStore.searchQuery = "";
  router.push(`/cars/${carId}`);
};

defineExpose({ searchInputContainer });
</script>

<template>
  <div class="header__search">
    <div class="search-input-container" ref="searchInputContainer">
      <div class="search-input">
        <span class="icon"><img src="/icons/search.svg" alt="Search" /></span>
        <input
          v-model="searchStore.searchQuery"
          type="text"
          placeholder="Search something here"
          @input="handleInput"
          @focus="
            searchStore.isDropdownOpen = searchStore.searchQuery.length > 0
          "
          @keyup.enter="handleSearchEnter"
        />
        <span class="icon filter-trigger" @click="handleSearchEnter">
          <img src="/icons/filter.svg" alt="Filter" />
        </span>
      </div>

      <transition name="slide-fade">
        <div
          v-if="
            searchStore.isDropdownOpen && searchStore.filteredResults.length > 0
          "
          class="search-dropdown card"
        >
          <div
            v-for="car in searchStore.filteredResults"
            :key="car.id"
            class="dropdown-item"
            @click="selectCar(car.id)"
          >
            <img :src="car.image" class="car-thumb" alt="Car" />
            <div class="car-meta">
              <span class="car-name">{{ car.name }}</span>
              <span class="car-type">{{ car.type }}</span>
            </div>
            <span class="car-price">${{ car.pricePerDay }}</span>
          </div>
          <div class="dropdown-footer" @click="handleSearchEnter">
            Show all results for "{{
              searchStore.searchQuery || searchStore.activeSearchTerm
            }}"
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
