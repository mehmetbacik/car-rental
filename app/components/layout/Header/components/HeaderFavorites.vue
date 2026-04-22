<script setup lang="ts">
const inventoryStore = useInventoryStore();
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps<{
  requireAuth: (callback: () => void) => void;
}>();
</script>

<template>
  <div class="favorites-wrapper" title="Favorites">
    <div
      class="action-btn"
      @click="requireAuth(() => router.push('/favorites'))"
    >
      <span class="icon">
        <img src="/icons/heart.svg" alt="Favorites" />
      </span>
      <span
        v-if="
          authStore.isAuthenticated && inventoryStore.favoriteCars.length > 0
        "
        class="badge"
      >
        {{ inventoryStore.favoriteCars.length }}
      </span>
    </div>
  </div>
</template>
