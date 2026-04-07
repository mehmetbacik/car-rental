<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/useSearch";
import { useInventoryStore } from "@/stores/useInventory";
import { useNotificationStore } from "@/stores/useNotification";

const LogoPath = "/images/logo.svg";
const SearchIconPath = "/icons/search.svg";
const FilterIconPath = "/icons/filter.svg";
const FavoriteIconPath = "/icons/heart.svg";
const NotificationIconPath = "/icons/notification.svg";
const SettingsIconPath = "/icons/settings.svg";
const ProfilePath = "/icons/profile.svg";

const searchStore = useSearchStore();
const inventoryStore = useInventoryStore();
const notificationStore = useNotificationStore();
const router = useRouter();
const route = useRoute();

const searchInputContainer = ref<HTMLElement | null>(null);
const notificationContainer = ref<HTMLElement | null>(null);

watch(
  () => route.path,
  () => {
    searchStore.closeDropdown();
    searchStore.searchQuery = "";
    notificationStore.isDropdownOpen = false;
  },
);

const handleInput = () => {
  searchStore.isDropdownOpen = searchStore.searchQuery.length > 0;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;

  if (
    searchInputContainer.value &&
    !searchInputContainer.value.contains(target)
  ) {
    searchStore.closeDropdown();
  }

  if (
    notificationContainer.value &&
    !notificationContainer.value.contains(target)
  ) {
    notificationStore.isDropdownOpen = false;
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
        <NuxtLink to="/favorites" class="action-btn" title="Favorites">
          <span class="icon">
            <img :src="FavoriteIconPath" alt="Favorites" />
          </span>
          <span v-if="inventoryStore.favoriteCars.length > 0" class="badge">
            {{ inventoryStore.favoriteCars.length }}
          </span>
        </NuxtLink>
        <div
          class="notification-wrapper"
          ref="notificationContainer"
          title="Notification"
        >
          <button class="action-btn" @click="notificationStore.toggleDropdown">
            <span class="icon">
              <img :src="NotificationIconPath" alt="Notification" />
            </span>
            <span v-if="notificationStore.unreadCount > 0" class="badge">
              {{ notificationStore.unreadCount }}
            </span>
          </button>
          <transition name="slide-up">
            <div
              v-if="notificationStore.isDropdownOpen"
              class="notification-dropdown card"
            >
              <div class="dropdown-header">
                <span>Notifications</span>
                <button @click="notificationStore.markAllAsRead">
                  Mark all read
                </button>
              </div>

              <div class="dropdown-list">
                <div
                  v-for="item in notificationStore.recentNotifications"
                  :key="item.id"
                  class="notification-item"
                  :class="{ unread: !item.isRead }"
                  @click="notificationStore.markAsRead(item.id)"
                >
                  <div class="dot" v-if="!item.isRead"></div>
                  <div class="content">
                    <p class="title">{{ item.title }}</p>
                    <p class="time">{{ item.time }}</p>
                  </div>
                </div>
              </div>

              <NuxtLink
                to="/notifications"
                class="view-all"
                @click="notificationStore.isDropdownOpen = false"
              >
                View All Notifications
              </NuxtLink>
            </div>
          </transition>
        </div>
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
