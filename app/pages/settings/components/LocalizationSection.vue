<script setup lang="ts">
defineProps<{
  languages: string[];
  currencies: string[];
}>();

const settingsStore = useSettingsStore();
</script>

<template>
  <section class="settings-section">
    <h3>Localization</h3>

    <div class="setting-row">
      <div class="text">
        <label>Language</label>
      </div>

      <select v-model="settingsStore.language" class="form-select">
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <div class="setting-row">
      <div class="text">
        <label>Currency</label>
      </div>

      <select v-model="settingsStore.currency" class="form-select">
        <option v-for="curr in currencies" :key="curr" :value="curr">
          {{ curr }}
        </option>
      </select>
    </div>
  </section>
</template>
