<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface Props {
  type: "success" | "warning" | "info";
  isRead: boolean;
}

const props = defineProps<Props>();

const statusConfig = {
  success: {
    icon: "mdi:check-circle-outline",
    class: "icon-success",
  },
  warning: {
    icon: "mdi:alert-outline",
    class: "icon-warning",
  },
  info: {
    icon: "mdi:information-outline",
    class: "icon-info",
  },
};

const config = computed(() => statusConfig[props.type] ?? statusConfig.info);
</script>

<template>
  <div class="status-icon" :class="config.class">
    <span v-if="!isRead" class="dot" />

    <Icon :icon="config.icon" width="24" height="24" />
  </div>
</template>
