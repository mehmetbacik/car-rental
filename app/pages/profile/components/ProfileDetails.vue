<script setup lang="ts">

import ProfileForm from "./ProfileForm.vue";
import ProfileSecurity from "./ProfileSecurity.vue";

interface ProfileUser {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

defineProps<{
  user: ProfileUser | null;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  edit: [];
  save: [];
}>();
</script>

<template>
  <main class="profile-details card shadow-sm">
    <div class="details-header">
      <h3 class="title">Profile Settings</h3>

      <button
        class="btn"
        :class="isEditing ? 'btn--secondary' : 'btn--primary'"
        @click="isEditing ? emit('save') : emit('edit')"
      >
        {{ isEditing ? "Save Changes" : "Edit Profile" }}
      </button>
    </div>

    <ProfileForm :user="user" :is-editing="isEditing" />
    <ProfileSecurity />
  </main>
</template>
