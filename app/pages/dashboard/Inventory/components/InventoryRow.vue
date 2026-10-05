<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface InventoryCar {
  id: string;
  name: string;
  type: string;
  status: string;
  pricePerDay: number;
  images: string[];
}

defineProps<{
  car: InventoryCar;
}>();

const emit = defineEmits<{
  (e: "edit", car: InventoryCar): void;
  (e: "delete", id: string): void;
}>();

const getStatusClass = (status: string) => ({
  "status--rented": status === "Rented",
  "status--available": status === "Available",
  "status--maintenance": status === "Maintenance",
});
</script>

<template>
  <tr>
    <td class="car-info">
      <div class="car-cell">
        <img :src="car.images[0]" :alt="car.name" class="car-thumb" />
        <strong>{{ car.name }}</strong>
      </div>
    </td>
    <td>{{ car.type }}</td>
    <td>
      <span class="status-badge" :class="getStatusClass(car.status)">
        {{ car.status }}
      </span>
    </td>
    <td>${{ car.pricePerDay }}.00</td>
    <td>
      <div class="actions">
        <button class="btn-icon" @click="emit('edit', car)">
          <Icon icon="mdi:pencil-outline" />
        </button>
        <button class="btn-icon" @click="emit('delete', car.id)">
          <Icon icon="mdi:trash-can-outline" />
        </button>
      </div>
    </td>
  </tr>
</template>
