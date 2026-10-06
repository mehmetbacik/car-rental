<script setup lang="ts">
import ExpenseRow from "./ExpenseRow.vue";

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

defineProps<{
  expenses: Expense[];
  cars: InventoryCar[];
}>();

const emit = defineEmits<{
  (e: "update-status", id: string, status: "Approved" | "Rejected"): void;
}>();
</script>

<template>
  <div class="expense-list">
    <table v-if="expenses.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Car / Category</th>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <ExpenseRow
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
          :cars="cars"
          @update-status="(id, status) => emit('update-status', id, status)"
        />
      </tbody>
    </table>

    <div v-else class="empty-state">No reimbursement expenses available.</div>
  </div>
</template>
