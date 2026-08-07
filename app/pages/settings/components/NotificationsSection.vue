<script setup lang="ts">
const settingsStore = useSettingsStore();
</script>

<template>
  <section class="settings-section">
    <h3>Notifications</h3>

    <div class="setting-row">
      <div class="text">
        <label>Email Notifications</label>
        <p>Receive updates about your rentals.</p>
      </div>

      <input
        v-model="settingsStore.notificationsEnabled"
        type="checkbox"
        class="custom-checkbox"
      />
    </div>
  </section>
</template>
