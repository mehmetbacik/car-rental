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
    class: "notifications-iconSuccess",
  },
  warning: {
    icon: "mdi:alert-outline",
    class: "notifications-iconWarning",
  },
  info: {
    icon: "mdi:information-outline",
    class: "notifications-iconInfo",
  },
};

const config = computed(() => statusConfig[props.type] ?? statusConfig.info);
</script>

<template>
  <div class="notifications-statusIcon" :class="config.class">
    <span v-if="!isRead" class="notifications-dot" />

    <Icon :icon="config.icon" width="24" height="24" />
  </div>
</template>
