<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/useSearch";

const LogoPath = "/images/logo.svg";
const SearchIconPath = "/icons/search.svg";
const FilterIconPath = "/icons/filter.svg";
const FavoriteIconPath = "/icons/heart.svg";
const NotificationIconPath = "/icons/notification.svg";
const SettingsIconPath = "/icons/settings.svg";
const ProfilePath = "/icons/profile.svg";

const searchStore = useSearchStore();
const router = useRouter();
const route = useRoute();

const searchInputContainer = ref<HTMLElement | null>(null);

watch(
  () => route.path,
  () => {
    searchStore.closeDropdown();
    searchStore.searchQuery = "";
  },
);

const handleInput = () => {
  searchStore.isDropdownOpen = searchStore.searchQuery.length > 0;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    searchInputContainer.value &&
    !searchInputContainer.value.contains(event.target as Node)
  ) {
    searchStore.closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const handleSearchEnter = () => {
  const termToSearch = searchStore.searchQuery.trim();

  if (termToSearch) {
    searchStore.executeSearch(termToSearch);

    router.push({
      path: "/search-results",
      query: { q: termToSearch },
    });
  }
};

const selectCar = (carId: string) => {
  searchStore.closeDropdown();
  searchStore.searchQuery = "";
  router.push(`/cars/${carId}`);
};
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <NuxtLink to="/" class="header__logo">
        <img :src="LogoPath" alt="Logo" />
      </NuxtLink>

      <div class="header__search">
        <div class="search-input-container" ref="searchInputContainer">
          <div class="search-input">
            <span class="icon">
              <img :src="SearchIconPath" alt="Search" />
            </span>
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
              <img :src="FilterIconPath" alt="Filter" />
            </span>
          </div>

          <transition name="slide-fade">
            <div
              v-if="
                searchStore.isDropdownOpen &&
                searchStore.filteredResults.length > 0
              "
              class="search-dropdown card"
            >
              <div
                v-for="car in searchStore.filteredResults"
                :key="car.id"
                class="dropdown-item"
                @click="selectCar(car.id)"
              >
                <img :src="car.image" class="car-thumb" alt="Car Thumbnail" />
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

      <div class="header__actions">
        <button class="action-btn" title="Favoriler">
          <span class="icon">
            <img :src="FavoriteIconPath" alt="Favorites" />
          </span>
          <span class="badge"></span>
        </button>
        <button class="action-btn" title="Notification">
          <span class="icon">
            <img :src="NotificationIconPath" alt="Notification" />
          </span>
          <span class="badge"></span>
        </button>
        <button class="action-btn" title="Settings">
          <span class="icon">
            <img :src="SettingsIconPath" alt="Settings" />
          </span>
        </button>
        <div class="user-profile">
          <img :src="ProfilePath" alt="Profile" />
        </div>
      </div>
    </div>
  </header>
</template>
