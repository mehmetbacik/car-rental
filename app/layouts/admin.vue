<script setup lang="ts">
const uiStore = useUIStore();

const DarkIconPath = "/icons/dark.svg";
const LightIconPath = "/icons/light.svg";
</script>

<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-top">
        <div class="sidebar-group">
          <p class="sidebar-label">MAIN MENU</p>
          <NuxtLink to="/dashboard" class="nav-link active">Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/inventory" class="nav-link">Car Inventory</NuxtLink>
          <NuxtLink to="/dashboard/cars" class="nav-link">Car Rent</NuxtLink>
          <NuxtLink to="/dashboard/insight" class="nav-link">Insight</NuxtLink>
          <NuxtLink to="/dashboard/reimburse" class="nav-link">
            Reimburse
          </NuxtLink>
          <NuxtLink to="/dashboard/inbox" class="nav-link">Inbox</NuxtLink>
          <NuxtLink to="/dashboard/calendar" class="nav-link">
            Calendar
          </NuxtLink>
        </div>

        <div class="sidebar-group">
          <p class="sidebar-label">PREFERENCES</p>
          <NuxtLink to="/dashboard/settings" class="nav-link">
            Settings
          </NuxtLink>
          <NuxtLink to="/dashboard/help" class="nav-link">
            Help & Center
          </NuxtLink>
          <button
            class="nav-link theme-toggle"
            @click="uiStore.toggleDarkMode()"
          >
            Dark Mode
            <span class="toggle-icon">
              <img
                :src="uiStore.isDarkMode ? DarkIconPath : LightIconPath"
                :alt="uiStore.isDarkMode ? 'Dark' : 'Light'"
              />
            </span>
          </button>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="nav-link logout">Log Out</button>
      </div>
    </aside>

    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>
