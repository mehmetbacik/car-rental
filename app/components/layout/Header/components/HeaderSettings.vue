<script setup lang="ts">
const settingsStore = useSettingsStore();
const router = useRouter();
const settingsContainer = ref<HTMLElement | null>(null);

const props = defineProps<{
  requireAuth: (callback: () => void) => void;
}>();

defineExpose({ settingsContainer });
</script>

<template>
  <div class="settings-wrapper" ref="settingsContainer">
    <button class="action-btn" @click="settingsStore.toggleDropdown">
      <span class="icon">
        <img src="/icons/settings.svg" alt="Settings" />
      </span>
    </button>

    <transition name="slide-up">
      <div v-if="settingsStore.isDropdownOpen" class="settings-dropdown card">
        <div class="dropdown-item" @click="settingsStore.toggleDarkMode">
          <span>{{ settingsStore.darkMode ? "Light Mode" : "Dark Mode" }}</span>
          <div
            class="toggle-switch"
            :class="{ active: settingsStore.darkMode }"
          ></div>
        </div>
        <div
          class="dropdown-item"
          @click="
            requireAuth(() => {
              router.push('/settings');
              settingsStore.isDropdownOpen = false;
            })
          "
        >
          All Settings
        </div>
      </div>
    </transition>
  </div>
</template>
