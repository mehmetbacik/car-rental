<script setup lang="ts">
import { useSettingsStore } from "@/stores/useSettings";
const settingsStore = useSettingsStore();

const languages = ["English", "Turkish", "German", "French"];
const currencies = ["USD", "EUR", "TRY"];
</script>

<template>
  <div class="settings-page">
    <div class="container max-w-4xl">
      <header class="page-header">
        <h1>Settings</h1>
        <p>Update your photo and personal details here.</p>
      </header>

      <div class="settings-grid">
        <aside class="settings-tabs">
          <button class="tab-btn active">General</button>
          <button class="tab-btn">Security</button>
          <button class="tab-btn">Billing</button>
        </aside>

        <main class="settings-content card">
          <section class="settings-section">
            <h3>Appearance</h3>
            <div class="setting-row">
              <div class="text">
                <label>Dark Mode</label>
                <p>Toggle between light and dark theme.</p>
              </div>
              <div class="control" @click="settingsStore.toggleDarkMode">
                <div
                  class="toggle-switch large"
                  :class="{ active: settingsStore.darkMode }"
                ></div>
              </div>
            </div>
          </section>

          <section class="settings-section">
            <h3>Localization</h3>
            <div class="setting-row">
              <div class="text"><label>Language</label></div>
              <select v-model="settingsStore.language" class="form-select">
                <option v-for="lang in languages" :key="lang" :value="lang">
                  {{ lang }}
                </option>
              </select>
            </div>
            <div class="setting-row">
              <div class="text"><label>Currency</label></div>
              <select v-model="settingsStore.currency" class="form-select">
                <option v-for="curr in currencies" :key="curr" :value="curr">
                  {{ curr }}
                </option>
              </select>
            </div>
          </section>

          <section class="settings-section">
            <h3>Notifications</h3>
            <div class="setting-row">
              <div class="text">
                <label>Email Notifications</label>
                <p>Receive updates about your rentals.</p>
              </div>
              <input
                type="checkbox"
                v-model="settingsStore.notificationsEnabled"
                class="custom-checkbox"
              />
            </div>
          </section>

          <div class="settings-footer">
            <button class="btn-cancel">Cancel</button>
            <button class="btn-save">Save Changes</button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>