<script setup lang="ts">
import SettingsTabs from "./components/SettingsTabs.vue";
import AppearanceSection from "./components/AppearanceSection.vue";
import LocalizationSection from "./components/LocalizationSection.vue";
import NotificationsSection from "./components/NotificationsSection.vue";
import SettingsFooter from "./components/SettingsFooter.vue";

const settingsStore = useSettingsStore();

const languages = ["English", "Turkish", "German", "French"];
const currencies = ["USD", "EUR", "GBP", "TRY"];
</script>

<template>
  <div class="container">
    <header class="page-header">
      <h1>Settings</h1>
      <p>Update your photo and personal details here.</p>
    </header>
    <div class="settings-grid">
      <SettingsTabs />
      <main class="settings-content card">
        <AppearanceSection />
        <LocalizationSection :languages="languages" :currencies="currencies" />
        <NotificationsSection />
        <SettingsFooter />
      </main>
    </div>
  </div>
</template>
