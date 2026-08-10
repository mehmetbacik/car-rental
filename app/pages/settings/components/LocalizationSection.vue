<script setup lang="ts">
defineProps<{
  languages: string[];
  currencies: string[];
}>();

const settingsStore = useSettingsStore();
</script>

<template>
  <section class="settingsSection">
    <h3>Localization</h3>

    <div class="settingsRow">
      <div class="settingsText">
        <label>Language</label>
      </div>

      <select v-model="settingsStore.language" class="settings-formSelect">
        <option v-for="lang in languages" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>
    </div>

    <div class="settingsRow">
      <div class="settingsText">
        <label>Currency</label>
      </div>

      <select v-model="settingsStore.currency" class="settings-formSelect">
        <option v-for="curr in currencies" :key="curr" :value="curr">
          {{ curr }}
        </option>
      </select>
    </div>
  </section>
</template>
