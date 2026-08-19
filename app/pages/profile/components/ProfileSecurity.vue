<script setup lang="ts">
const emit = defineEmits<{
  changePassword: [];
}>();
</script>

<template>
  <section class="security-section">
    <h4 class="section-title">Security</h4>

    <button
      type="button"
      class="btn btn--outline"
      @click="emit('changePassword')"
    >
      Change Password
    </button>
  </section>
</template>
