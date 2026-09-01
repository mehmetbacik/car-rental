<script setup lang="ts">
defineProps<{
  totalPending: number;
}>();
</script>

<template>
  <div class="header">
    <div>
      <h2>Reimbursements</h2>
      <p>Manage and approve fleet expenses</p>
    </div>

    <div class="stats-mini card">
      <span>Pending Total:</span>
      <strong>${{ totalPending.toFixed(2) }}</strong>
    </div>
  </div>
</template>