<script setup lang="ts">
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
  return (
    props.cars.find((car) => car.id === carId)?.name ||
    "Unknown Car"
  );
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Fuel":
      return "⛽";
    case "Maintenance":
      return "🔧";
    case "Insurance":
      return "🛡️";
    case "Wash":
      return "🧼";
    default:
      return "📄";
  }
};
</script>

<template>
  <tr>
    <td class="id">#{{ expense.id }}</td>

    <td class="category-cell">
      <span class="icon">
        {{ getCategoryIcon(expense.category) }}
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

    <td class="amount">
      ${{ expense.amount.toFixed(2) }}
    </td>

    <td>
      <span
        class="status-badge"
        :class="expense.status.toLowerCase()"
      >
        {{ expense.status }}
      </span>
    </td>

    <td class="actions">
      <div
        v-if="expense.status === 'Pending'"
        class="btn-group"
      >
        <button
          class="btn-check"
          @click="emit('update-status', expense.id, 'Approved')"
        >
          ✅
        </button>

        <button
          class="btn-cross"
          @click="emit('update-status', expense.id, 'Rejected')"
        >
          ❌
        </button>
      </div>

      <span
        v-else
        class="processed-text"
      >
        Processed
      </span>
    </td>
  </tr>
</template>