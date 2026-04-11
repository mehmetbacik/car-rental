<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSearchStore } from "@/stores/useSearch";
import { useInventoryStore } from "@/stores/useInventory";
import { useNotificationStore } from "@/stores/useNotification";
import { useSettingsStore } from "@/stores/useSettings";
import { useProfileStore } from "@/stores/useProfile";
import { useAuthStore } from "@/stores/useAuthStore";

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
const settingsStore = useSettingsStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const searchInputContainer = ref<HTMLElement | null>(null);
const notificationContainer = ref<HTMLElement | null>(null);
const settingsContainer = ref<HTMLElement | null>(null);
const profileContainer = ref<HTMLElement | null>(null);

watch(
  () => route.path,
  () => {
    searchStore.closeDropdown();
    searchStore.searchQuery = "";
    notificationStore.isDropdownOpen = false;
    settingsStore.isDropdownOpen = false;
    profileStore.closeDropdown();
  },
);

const requireAuth = (callback: () => void) => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
  } else {
    callback();
  }
};

const handleInput = () => {
  searchStore.isDropdownOpen = searchStore.searchQuery.length > 0;
};

const handleLogout = async () => {
  await authStore.logout();
  profileStore.closeDropdown();
  router.push("/");
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
  if (settingsContainer.value && !settingsContainer.value.contains(target)) {
    settingsStore.isDropdownOpen = false;
  }
  if (profileContainer.value && !profileContainer.value.contains(target)) {
    profileStore.closeDropdown();
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
    router.push({ path: "/search-results", query: { q: termToSearch } });
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
            <span class="icon"><img :src="SearchIconPath" alt="Search" /></span>
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
        <div
          class="action-btn"
          @click="requireAuth(() => router.push('/favorites'))"
          title="Favorites"
        >
          <span class="icon"
            ><img :src="FavoriteIconPath" alt="Favorites"
          /></span>
          <span
            v-if="
              authStore.isAuthenticated &&
              inventoryStore.favoriteCars.length > 0
            "
            class="badge"
          >
            {{ inventoryStore.favoriteCars.length }}
          </span>
        </div>

        <div
          class="notification-wrapper"
          ref="notificationContainer"
          title="Notification"
        >
          <button
            class="action-btn"
            @click="requireAuth(() => notificationStore.toggleDropdown())"
          >
            <span class="icon"
              ><img :src="NotificationIconPath" alt="Notification"
            /></span>
            <span
              v-if="
                authStore.isAuthenticated && notificationStore.unreadCount > 0
              "
              class="badge"
            >
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

        <div class="settings-wrapper" ref="settingsContainer">
          <button class="action-btn" @click="settingsStore.toggleDropdown">
            <span class="icon"
              ><img :src="SettingsIconPath" alt="Settings"
            /></span>
          </button>

          <transition name="slide-up">
            <div
              v-if="settingsStore.isDropdownOpen"
              class="settings-dropdown card"
            >
              <div class="dropdown-item" @click="settingsStore.toggleDarkMode">
                <span>{{
                  settingsStore.darkMode ? "Light Mode" : "Dark Mode"
                }}</span>
                <div
                  class="toggle-switch"
                  :class="{ active: settingsStore.darkMode }"
                ></div>
              </div>
              <div
                class="dropdown-item"
                @click="
                  requireAuth(() => {
                    router.push('/settings');
                    settingsStore.isDropdownOpen = false;
                  })
                "
              >
                All Settings
              </div>
              <div class="dropdown-divider"></div>
            </div>
          </transition>
        </div>

        <div class="user-profile-wrapper" ref="profileContainer">
          <div class="user-avatar" @click="profileStore.toggleDropdown">
            <img
              :src="
                authStore.isAuthenticated
                  ? authStore.user?.avatar || ProfilePath
                  : ProfilePath
              "
              :alt="authStore.isAuthenticated ? authStore.user?.name : 'Guest'"
              :class="{ 'is-guest': !authStore.isAuthenticated }"
            />
          </div>

          <transition name="slide-up">
            <div
              v-if="profileStore.isDropdownOpen"
              class="profile-dropdown card"
            >
              <template v-if="authStore.isAuthenticated">
                <div class="dropdown-user-info">
                  <p class="name">{{ authStore.user?.name }}</p>
                  <p class="role">{{ authStore.user?.role }}</p>
                </div>
                <div class="dropdown-divider"></div>
                <NuxtLink
                  to="/profile"
                  class="dropdown-item"
                  @click="profileStore.closeDropdown"
                  >My Profile</NuxtLink
                >
                <a
                  href="/dashboard"
                  target="_blank"
                  class="dropdown-item dashboard-link"
                  @click="profileStore.closeDropdown"
                >
                  Dashboard
                </a>
                <div class="dropdown-divider"></div>
                <button class="logout-btn" @click="handleLogout">
                  Sign Out
                </button>
              </template>

              <template v-else>
                <div class="dropdown-guest-info">
                  <p class="title">Welcome!</p>
                  <p class="subtitle">Join us to manage your account.</p>
                </div>
                <div class="dropdown-divider"></div>
                <NuxtLink
                  to="/login"
                  class="dropdown-item login-btn"
                  @click="profileStore.closeDropdown"
                  >Sign In</NuxtLink
                >
                <NuxtLink
                  to="/register"
                  class="dropdown-item register-btn"
                  @click="profileStore.closeDropdown"
                  >Register</NuxtLink
                >
              </template>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>
