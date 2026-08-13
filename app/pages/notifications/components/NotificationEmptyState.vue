<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="empty-state">
    <div class="icon-wrapper">
      <Icon
        icon="mdi:bell-off-outline"
        width="40"
        height="40"
        class="empty-icon"
      />
    </div>

    <h3>No notifications yet</h3>

    <p>When you receive notifications, they will appear here.</p>

    <NuxtLink to="/" class="btn-back"> Go to Dashboard </NuxtLink>
  </div>
</template>
