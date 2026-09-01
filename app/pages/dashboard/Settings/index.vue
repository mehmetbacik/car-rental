<script setup lang="ts">

import ProfileCard from "./components/ProfileCard.vue";
import PasswordCard from "./components/PasswordCard.vue";

import { useProfileStore } from "@/stores/useProfile";

definePageMeta({ layout: "admin", middleware: "auth" });

const profileStore = useProfileStore();
const fileInput = ref<HTMLInputElement | null>(null);

const passwordForm = ref({
  current: "",
  new: "",
  confirm: "",
});

const triggerFileInput = () => fileInput.value?.click();

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        profileStore.updateAvatar(e.target.result as string);
      }
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const updatePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert("New passwords do not match!");
    return;
  }
  alert("Password successfully updated!");
  passwordForm.value = { current: "", new: "", confirm: "" };
};
</script>

<template>
  <div class="settings-page">
    <div class="settings-grid">
      <ProfileCard
        :user="profileStore.user"
        @trigger-file-input="triggerFileInput"
        @file-upload="handleFileUpload"
      />

      <PasswordCard
        :password-form="passwordForm"
        @update-password="updatePassword"
      />
    </div>
  </div>
</template>
