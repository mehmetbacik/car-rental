<script setup lang="ts">
import { ref } from "vue";

interface ProfileUser {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

const props = defineProps<{
  user: ProfileUser | null;
  isEditing: boolean;
}>();

const avatar = ref(props.user?.avatar || "/icons/profile.svg");

const handleAvatarChange = (event: Event) => {
  if (!props.isEditing) return;

  const file = (event.target as HTMLInputElement).files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    avatar.value = e.target?.result as string;
  };

  reader.readAsDataURL(file);
};
</script>

<template>
  <aside class="profile-card card shadow-sm">
    <div class="profile-avatar-wrapper">
      <img :src="avatar" alt="User Avatar" class="profile-avatar" />

      <label v-if="isEditing" class="avatar-upload-label">
        <input
          type="file"
          hidden
          accept="image/*"
          @change="handleAvatarChange"
        />

        <span class="upload-icon">📸</span>
      </label>
    </div>

    <div class="profile-info text-center">
      <h2 class="profile-name">
        {{ user?.name }}
      </h2>

      <p class="profile-role">
        {{ user?.role }}
      </p>

      <p class="profile-location">Istanbul, Turkey</p>
    </div>

    <div class="profile-stats">
      <div class="stat-item">
        <span class="count">12</span>
        <span class="label">Rentals</span>
      </div>

      <div class="stat-item">
        <span class="count">4.8</span>
        <span class="label">Rating</span>
      </div>
    </div>
  </aside>
</template>
