<script setup lang="ts">
const emit = defineEmits<{
  changePassword: [];
}>();
</script>

<template>
  <section class="profileSecurity">
    <h4 class="profileSecurity-title">Security</h4>

    <button
      type="button"
      class="profileBtn profileBtn-Outline"
      @click="emit('changePassword')"
    >
      Change Password
    </button>
  </section>
</template>
