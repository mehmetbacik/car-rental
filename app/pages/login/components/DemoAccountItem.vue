<script setup lang="ts">
import CopyButton from "./CopyButton.vue";

defineProps<{
  title: string;
  email: string;
  password: string;
  copied: string;
}>();

const emit = defineEmits<{
  copy: [text: string, key: string];
}>();
</script>

<template>
  <div class="account">
    <strong>{{ title }}</strong>

    <div class="copy-row">
      <span>Email: {{ email }}</span>

      <CopyButton
        :copied="copied === `${title}-email`"
        @click="emit('copy', email, `${title}-email`)"
      />
    </div>

    <div class="copy-row">
      <span>Password: {{ password }}</span>

      <CopyButton
        :copied="copied === `${title}-password`"
        @click="emit('copy', password, `${title}-password`)"
      />
    </div>
  </div>
</template>
