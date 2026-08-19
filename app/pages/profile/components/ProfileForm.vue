<script setup lang="ts">
import { reactive, watch } from "vue";

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

const emit = defineEmits<{
  save: [];
}>();

const profileForm = reactive({
  name: "",
  email: "",
  bio: "Software Developer & UI Enthusiast",
  location: "Istanbul, Turkey",
});

watch(
  () => props.user,
  (user) => {
    if (!user) return;

    profileForm.name = user.name || "";
    profileForm.email = user.email || "";
  },
  {
    immediate: true,
  },
);

const handleSubmit = () => {
  emit("save");
};
</script>

<template>
  <form class="profileForm" @submit.prevent="handleSubmit">
    <div class="profileForm-wrapper">
      <div class="profileForm-group">
        <label for="full-name">Full Name</label>
        <input
          id="full-name"
          v-model="profileForm.name"
          :disabled="!isEditing"
          type="text"
          placeholder="Your Name"
        />
      </div>
      <div class="profileForm-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          v-model="profileForm.email"
          disabled
          type="email"
          placeholder="email@example.com"
        />
        <small class="profileForm-inf"> Email cannot be changed. </small>
      </div>
      <div class="profileForm-group full-width">
        <label for="bio">Bio</label>
        <textarea
          id="bio"
          v-model="profileForm.bio"
          :disabled="!isEditing"
          rows="3"
        />
      </div>
    </div>
  </form>
</template>
