<script setup lang="ts">
const settingsStore = useSettingsStore();
</script>

<template>
  <section class="settingsSection">
    <h3>Appearance</h3>

    <div class="settingsRow">
      <div class="text">
        <label>Dark Mode</label>
        <p>Toggle between light and dark theme.</p>
      </div>

      <div class="control" @click="settingsStore.toggleDarkMode">
        <div
          class="toggle-switch large"
          :class="{ active: settingsStore.darkMode }"
        />
      </div>
    </div>
  </section>
</template>
