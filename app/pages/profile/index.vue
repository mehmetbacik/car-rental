<script setup lang="ts">
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

const authStore = useAuthStore();
const isEditing = ref(false);
const showPasswordModal = ref(false);

const profileForm = reactive({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  role: authStore.user?.role || "",
  avatar: authStore.user?.avatar || "/icons/profile.svg",
  bio: "Software Developer & UI Enthusiast",
  location: "Istanbul, Turkey",
});

const handleSave = async () => {
  isEditing.value = false;
  console.log("Profile updated:", profileForm);
};

const handleAvatarChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileForm.avatar = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-grid">
        <aside class="profile-card card shadow-sm">
          <div class="profile-avatar-wrapper">
            <img
              :src="profileForm.avatar"
              alt="User Avatar"
              class="profile-avatar"
            />
            <label v-if="isEditing" class="avatar-upload-label">
              <input
                type="file"
                @change="handleAvatarChange"
                hidden
                accept="image/*"
              />
              <span class="upload-icon">📸</span>
            </label>
          </div>
          <div class="profile-info text-center">
            <h2 class="profile-name">{{ profileForm.name }}</h2>
            <p class="profile-role">{{ profileForm.role }}</p>
            <p class="profile-location">{{ profileForm.location }}</p>
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

        <main class="profile-details card shadow-sm">
          <div class="details-header">
            <h3 class="title">Profile Settings</h3>
            <button
              class="btn"
              :class="isEditing ? 'btn--secondary' : 'btn--primary'"
              @click="isEditing ? handleSave() : (isEditing = true)"
            >
              {{ isEditing ? "Save Changes" : "Edit Profile" }}
            </button>
          </div>

          <form @submit.prevent="handleSave" class="profile-form">
            <div class="form-grid">
              <div class="form-group">
                <label>Full Name</label>
                <input
                  v-model="profileForm.name"
                  :disabled="!isEditing"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input
                  v-model="profileForm.email"
                  disabled
                  type="email"
                  placeholder="email@example.com"
                />
                <small class="hint">Email cannot be changed.</small>
              </div>
              <div class="form-group full-width">
                <label>Bio</label>
                <textarea
                  v-model="profileForm.bio"
                  :disabled="!isEditing"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="security-section">
              <h4 class="section-title">Security</h4>
              <button
                type="button"
                class="btn btn--outline"
                @click="showPasswordModal = true"
              >
                Change Password
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>
