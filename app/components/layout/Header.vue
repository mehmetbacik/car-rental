<script setup lang="ts">
const LogoPath = "/images/logo.svg";
const SearchIconPath = "/icons/search.svg";
const FilterIconPath = "/icons/filter.svg";
const FavoriteIconPath = "/icons/heart.svg";
const NotificationIconPath = "/icons/notification.svg";
const SettingsIconPath = "/icons/settings.svg";
const ProfilePath = "/icons/profile.svg";

const searchQuery = ref("");
</script>

<template>
  <header class="header">
    <div class="container header__wrapper">
      <NuxtLink to="/" class="header__logo">
        <img :src="LogoPath" alt="Logo" />
      </NuxtLink>

      <div class="header__search">
        <div class="search-input">
          <span class="icon">
            <img :src="SearchIconPath" alt="Search" />
          </span>
          <input v-model="searchQuery" type="text" placeholder="Search something here" />
          <span class="icon">
            <img :src="FilterIconPath" alt="Filter" />
          </span>
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
