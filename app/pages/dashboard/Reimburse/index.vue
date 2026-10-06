<script setup lang="ts">
import ReimbursementsHeader from "./components/ReimbursementsHeader.vue";
import ExpenseTable from "./components/ExpenseTable.vue";

import { useReimburseStore } from "@/stores/useReimburse";
import { useInventoryStore } from "@/stores/useInventory";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const reimburseStore = useReimburseStore();
const inventoryStore = useInventoryStore();

const { expenses, totalPending } = storeToRefs(reimburseStore);
const { items: inventory } = storeToRefs(inventoryStore);

const updateExpenseStatus = (id: string, status: "Approved" | "Rejected") => {
  reimburseStore.updateStatus(id, status);
};
</script>

<template>
  <div class="reimburse-page">
    <ReimbursementsHeader :total-pending="totalPending" />
    <ExpenseTable
      :expenses="expenses"
      :cars="inventory"
      @update-status="updateExpenseStatus"
    />
  </div>
</template>
