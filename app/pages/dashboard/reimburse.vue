<script setup lang="ts">
import { useReimburseStore } from "@/stores/useReimburse";
import { useInventoryStore } from "@/stores/useInventory";

definePageMeta({ layout: "admin", middleware: "auth" });

const reimburseStore = useReimburseStore();
const inventoryStore = useInventoryStore();

const getCarName = (carId: string) => {
  return (
    inventoryStore.items.find((c) => c.id === carId)?.name || "Unknown Car"
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
  <div class="reimburse-page">
    <div class="header">
      <div>
        <h2>Reimbursements</h2>
        <p>Manage and approve fleet expenses</p>
      </div>
      <div class="stats-mini card">
        <span>Pending Total:</span>
        <strong>${{ reimburseStore.totalPending.toFixed(2) }}</strong>
      </div>
    </div>

    <div class="expense-list card">
      <table v-if="reimburseStore.expenses.length > 0">
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
          <tr v-for="exp in reimburseStore.expenses" :key="exp.id">
            <td class="id">#{{ exp.id }}</td>
            <td class="category-cell">
              <span class="icon">{{ getCategoryIcon(exp.category) }}</span>
              <div class="info">
                <strong>{{ getCarName(exp.carId) }}</strong>
                <span>{{ exp.category }}</span>
              </div>
            </td>
            <td class="desc">{{ exp.description }}</td>
            <td>{{ exp.date }}</td>
            <td class="amount">${{ exp.amount.toFixed(2) }}</td>
            <td>
              <span class="status-badge" :class="exp.status.toLowerCase()">
                {{ exp.status }}
              </span>
            </td>
            <td class="actions">
              <div v-if="exp.status === 'Pending'" class="btn-group">
                <button
                  @click="reimburseStore.updateStatus(exp.id, 'Approved')"
                  class="btn-check"
                >
                  ✅
                </button>
                <button
                  @click="reimburseStore.updateStatus(exp.id, 'Rejected')"
                  class="btn-cross"
                >
                  ❌
                </button>
              </div>
              <span v-else class="processed-text">Processed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>