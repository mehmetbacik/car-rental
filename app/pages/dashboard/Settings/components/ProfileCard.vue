<script setup lang="ts">
import ProfileHeader from "./ProfileHeader.vue";

defineProps<{
  user: {
    avatar: string;
    name: string;
    role: string;
    email: string;
  };
}>();

const emit = defineEmits<{
  "trigger-file-input": [];
  "file-upload": [event: Event];
}>();
</script>

<template>
  <div class="settings-card card">
    <ProfileHeader
      :user="user"
      @trigger-file-input="emit('trigger-file-input')"
      @file-upload="emit('file-upload', $event)"
    />

    <form @submit.prevent class="profile-form">
      <div class="input-group">
        <label>Full Name</label>
        <input v-model="user.name" type="text" />
      </div>

      <div class="input-group">
        <label>Email Address</label>
        <input v-model="user.email" type="email" />
      </div>

      <button class="btn btn--primary">Save Changes</button>
    </form>
  </div>
</template>
