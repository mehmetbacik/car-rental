<script setup lang="ts">
import PasswordHeader from "./PasswordHeader.vue";

defineProps<{
  passwordForm: {
    current: string;
    new: string;
    confirm: string;
  };
}>();

const emit = defineEmits<{
  "update-password": [];
}>();
</script>

<template>
  <div class="settings-card card">
    <PasswordHeader />

    <form @submit.prevent="emit('update-password')" class="password-form">

      <div class="input-group">
        <label>New Password</label>
        <input
          v-model="passwordForm.new"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <div class="input-group">
        <label>Confirm New Password</label>
        <input
          v-model="passwordForm.confirm"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <button type="submit" class="btn btn--primary">Update Password</button>
    </form>
  </div>
</template>
