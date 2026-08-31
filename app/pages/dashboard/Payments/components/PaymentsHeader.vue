<script setup lang="ts">
const emit = defineEmits<{
  (e: "add-card"): void;
}>();
</script>

<template>
  <div class="header-section">
    <div>
      <h2>Payment Methods</h2>
      <p>Manage your cards and billing information.</p>
    </div>
    <button class="btn btn--primary" @click="emit('add-card')">
      + Add New Card
    </button>
  </div>
</template>
