<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Expense {
  id: string;
  carId: string;
  category: string;
  description: string;
  date: string;
  amount: number;
  status: string;
}

interface InventoryCar {
  id: string;
  name: string;
}

const props = defineProps<{
  expense: Expense;
  cars: InventoryCar[];
}>();

const emit = defineEmits<{
  (e: "update-status", id: string, status: "Approved" | "Rejected"): void;
}>();

const getCarName = (carId: string) => {
  return props.cars.find((car) => car.id === carId)?.name || "Unknown Car";
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Fuel":
      return "mdi:gas-station-outline";
    case "Maintenance":
      return "mdi:wrench-outline";
    case "Insurance":
      return "mdi:shield-check-outline";
    case "Wash":
      return "mdi:car-wash";
    default:
      return "mdi:file-document-outline";
  }
};
</script>

<template>
  <tr>
    <td class="id">#{{ expense.id }}</td>
    <td class="category-cell">
      <span class="icon">
        <Icon :icon="getCategoryIcon(expense.category)" />
      </span>
      <div class="info">
        <strong>{{ getCarName(expense.carId) }}</strong>
        <span>{{ expense.category }}</span>
      </div>
    </td>
    <td class="desc">
      {{ expense.description }}
    </td>
    <td>{{ expense.date }}</td>
    <td class="amount">${{ expense.amount.toFixed(2) }}</td>
    <td>
      <span class="status-badge" :class="expense.status.toLowerCase()">
        {{ expense.status }}
      </span>
    </td>
    <td class="actions">
      <div v-if="expense.status === 'Pending'" class="btn-group">
        <button
          class="btn-check"
          type="button"
          aria-label="Approve expense"
          @click="emit('update-status', expense.id, 'Approved')"
        >
          <Icon icon="mdi:check" />
        </button>
        <button
          class="btn-cross"
          type="button"
          aria-label="Reject expense"
          @click="emit('update-status', expense.id, 'Rejected')"
        >
          <Icon icon="mdi:close" />
        </button>
      </div>
      <span v-else class="processed-text"> Processed </span>
    </td>
  </tr>
</template>
