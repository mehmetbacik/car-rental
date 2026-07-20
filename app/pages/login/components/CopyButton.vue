<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  copied: boolean;
}>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<template>
  <button
    type="button"
    class="copy-btn"
    @click="emit('click')"
    :aria-label="copied ? 'Copied' : 'Copy'"
  >
    <Icon
      :icon="
        copied
          ? 'material-symbols:check-circle-rounded'
          : 'material-symbols:content-copy-rounded'
      "
      width="20"
      height="20"
    />
  </button>
</template>
