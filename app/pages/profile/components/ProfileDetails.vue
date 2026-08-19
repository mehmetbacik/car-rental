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
  <main class="profileDetails">
    <div class="profileDetails-header">
      <h3 class="profileDetails-headerTitle">Profile Settings</h3>
      <button
        class="profileBtn"
        :class="isEditing ? 'profileBtn-Secondary' : 'profileBtn-Primary'"
        @click="isEditing ? emit('save') : emit('edit')"
      >
        {{ isEditing ? "Save Changes" : "Edit Profile" }}
      </button>
    </div>
    <ProfileForm :user="user" :is-editing="isEditing" />
    <ProfileSecurity />
  </main>
</template>
