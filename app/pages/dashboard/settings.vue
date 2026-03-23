<script setup lang="ts">
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
      <div class="settings-card card">
        <div class="profile-header">
          <div class="avatar-wrapper" @click="triggerFileInput">
            <img :src="profileStore.user.avatar" alt="Profile" />
            <div class="overlay"><span>Change</span></div>
          </div>
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
            hidden
          />
          <div class="info">
            <h3>{{ profileStore.user.name }}</h3>
            <p>{{ profileStore.user.role }}</p>
          </div>
        </div>

        <form @submit.prevent class="profile-form">
          <div class="input-group">
            <label>Full Name</label>
            <input v-model="profileStore.user.name" type="text" />
          </div>
          <div class="input-group">
            <label>Email Address</label>
            <input v-model="profileStore.user.email" type="email" />
          </div>
          <button class="btn btn--primary">Save Changes</button>
        </form>
      </div>

      <div class="settings-card card">
        <div class="card-header">
          <h3>Change Password</h3>
          <p>Update your password to keep your account secure.</p>
        </div>

        <form @submit.prevent="updatePassword" class="password-form">
          <div class="input-group">
            <label>Current Password</label>
            <input
              v-model="passwordForm.current"
              type="password"
              placeholder="••••••••"
            />
          </div>
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
          <button type="submit" class="btn btn--secondary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
