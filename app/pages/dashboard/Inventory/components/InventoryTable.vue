<script setup lang="ts">
interface InventoryCar {
  id: string;
  name: string;
  type: string;
  status: string;
  pricePerDay: number;
  images: string[];
}

import InventoryRow from "./InventoryRow.vue";
import InventoryEmptyState from "./InventoryEmptyState.vue";

defineProps<{
  inventory: InventoryCar[];
}>();

const emit = defineEmits<{
  (e: "edit", car: InventoryCar): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="inventory-table card">
    <table v-if="inventory.length">
      <thead>
        <tr>
          <th>Car Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Price / Day</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <InventoryRow
          v-for="car in inventory"
          :key="car.id"
          :car="car"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
        />
      </tbody>
    </table>
    <InventoryEmptyState v-else />
  </div>
</template>
