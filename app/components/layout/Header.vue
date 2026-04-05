<script setup lang="ts">
const LogoPath = "/images/logo.svg";
const SearchIconPath = "/icons/search.svg";
const FilterIconPath = "/icons/filter.svg";
const FavoriteIconPath = "/icons/heart.svg";
const NotificationIconPath = "/icons/notification.svg";
const SettingsIconPath = "/icons/settings.svg";
const ProfilePath = "/icons/profile.svg";

const searchQuery = ref("");
const searchStore = useSearchStore();
const router = useRouter();

const handleSearchEnter = () => {
  if (searchStore.searchQuery.trim()) {
    searchStore.closeDropdown();
    router.push({
      path: "/search-results",
      query: { q: searchStore.searchQuery },
    });
  }
};

const selectCar = (carId: string) => {
  searchStore.closeDropdown();
  router.push({
    path: "/search-results",
    query: { q: searchStore.searchQuery },
  });
};
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <NuxtLink to="/" class="header__logo">
        <img :src="LogoPath" alt="Logo" />
      </NuxtLink>

      <div class="header__search">
        <div class="search-input-container">
          <div class="search-input">
            <span class="icon">
              <img :src="SearchIconPath" alt="Search" />
            </span>
            <input
              v-model="searchStore.searchQuery"
              type="text"
              placeholder="Search something here"
              @input="searchStore.isDropdownOpen = true"
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
                Show all results for "{{ searchStore.searchQuery }}"
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
