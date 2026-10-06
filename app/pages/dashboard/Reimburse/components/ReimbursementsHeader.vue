<script setup lang="ts">
defineProps<{
  totalPending: number;
}>();
</script>

<template>
  <div class="reimburse-header">
    <div>
      <h2>Reimbursements</h2>
    </div>
    <div class="stats-mini">
      <span>Pending Total:</span>
      <strong>${{ totalPending.toFixed(2) }}</strong>
    </div>
  </div>
</template>
