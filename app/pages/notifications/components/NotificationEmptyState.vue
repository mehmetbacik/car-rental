<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="notifications-emptyState">
    <div class="notifications-iconWrapper">
      <Icon
        icon="mdi:bell-off-outline"
        width="40"
        height="40"
        class="notifications-emptyIcon"
      />
    </div>

    <h3>No notifications yet</h3>

    <p>When you receive notifications, they will appear here.</p>

    <NuxtLink to="/" class="notifications-btnBack"> Go to Dashboard </NuxtLink>
  </div>
</template>
