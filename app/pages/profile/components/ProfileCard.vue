<script setup lang="ts">
import { ref } from "vue";

import { Icon } from "@iconify/vue";

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
  <aside class="profileCard">
    <div class="profile-avatarWrapper">
      <img :src="avatar" alt="User Avatar" class="profileAvatar" />
      <label v-if="isEditing" class="profile-avatarUploadLabel">
        <input
          type="file"
          hidden
          accept="image/*"
          @change="handleAvatarChange"
        />
        <span class="profile-uploadIcon">
          <Icon
            icon="mdi:camera-plus-outline"
            width="18"
            height=""
            class="notifications-emptyIcon"
          />
        </span>
      </label>
    </div>
    <div class="profile-infoWrapper">
      <h2 class="profile-infoName">
        {{ user?.name }}
      </h2>
      <p class="profile-infoRole">
        {{ user?.role }}
      </p>
      <p class="profile-infoLocation">Istanbul, Turkey</p>
    </div>
    <div class="profile-statsWrapper">
      <div class="profile-statItem">
        <span class="profile-statItemcount">12</span>
        <span class="profile-statItemlabel">Rentals</span>
      </div>
      <div class="profile-statItem">
        <span class="profile-statItemcount">4.8</span>
        <span class="profile-statItemlabel">Rating</span>
      </div>
    </div>
  </aside>
</template>
