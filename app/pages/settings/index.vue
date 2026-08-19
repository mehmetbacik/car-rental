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
  <div class="settingsPage container">
    <div class="settingsHeader">
      <h1>Settings</h1>
      <p>Update system settings here.</p>
    </div>
    <div class="settingsWrapper">
      <SettingsTabs />
      <div class="settingsContent">
        <AppearanceSection />
        <LocalizationSection :languages="languages" :currencies="currencies" />
        <NotificationsSection />
        <SettingsFooter />
      </div>
    </div>
  </div>
</template>
