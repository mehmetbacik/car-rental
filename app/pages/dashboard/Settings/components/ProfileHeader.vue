<script setup lang="ts">
defineProps<{
  user: {
    avatar: string;
    name: string;
    role: string;
  };
}>();

const emit = defineEmits<{
  "trigger-file-input": [];
  "file-upload": [event: Event];
}>();
</script>

<template>
  <div class="profile-header">
    <div class="avatar-wrapper" @click="emit('trigger-file-input')">
      <img :src="user.avatar" alt="Profile" />
      <div class="overlay"><span>Change</span></div>
    </div>

    <input
      type="file"
      ref="fileInput"
      @change="emit('file-upload', $event)"
      accept="image/*"
      hidden
    />

    <div class="info">
      <h2>{{ user.name }}</h2>
      <p>{{ user.role }}</p>
    </div>
  </div>
</template>
