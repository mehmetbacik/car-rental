<script setup lang="ts">
const settingsStore = useSettingsStore();
</script>

<template>
  <section class="settingsSection">
    <h3>Notifications</h3>

    <div class="settingsRow">
      <div class="settingsText">
        <label>Email Notifications</label>
        <p>Receive updates about your rentals.</p>
      </div>

      <input
        v-model="settingsStore.notificationsEnabled"
        type="checkbox"
        class="settings-customCheckbox"
      />
    </div>
  </section>
</template>
