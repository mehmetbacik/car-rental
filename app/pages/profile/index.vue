<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

import ProfileCard from "./components/ProfileCard.vue";
import ProfileDetails from "./components/ProfileDetails.vue";

const authStore = useAuthStore();

const user = computed(() => authStore.user);
const isEditing = ref(false);

const handleEdit = () => {
  isEditing.value = true;
};

const handleSave = async () => {
  isEditing.value = false;
};
</script>

<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-grid">
        <ProfileCard :user="user" :is-editing="isEditing" />
        <ProfileDetails
          :user="user"
          :is-editing="isEditing"
          @edit="handleEdit"
          @save="handleSave"
        />
      </div>
    </div>
  </div>
</template>
