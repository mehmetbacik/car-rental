import { defineStore } from "pinia";

export interface Reimbursement {
  id: string;
  carId: string;
  category: "Fuel" | "Maintenance" | "Insurance" | "Wash" | "Other";
  amount: number;
  date: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}

export const useReimburseStore = defineStore("reimburse", {
  state: () => ({
    expenses: [
      {
        id: "EXP-001",
        carId: "1",
        category: "Fuel",
        amount: 85.5,
        date: "2026-03-22",
        description: "Full tank refill",
        status: "Approved",
      },
      {
        id: "EXP-002",
        carId: "3",
        category: "Maintenance",
        amount: 450.0,
        date: "2026-03-24",
        description: "Oil and brake change",
        status: "Pending",
      },
      {
        id: "EXP-003",
        carId: "2",
        category: "Wash",
        amount: 20.0,
        date: "2026-03-25",
        description: "Interior cleaning",
        status: "Approved",
      },
    ] as Reimbursement[],
  }),
  getters: {
    totalPending: (state) =>
      state.expenses
        .filter((e) => e.status === "Pending")
        .reduce((acc, curr) => acc + curr.amount, 0),
  },
  actions: {
    addExpense(expense: Reimbursement) {
      this.expenses.unshift(expense);
    },
    updateStatus(id: string, newStatus: "Approved" | "Rejected") {
      const expense = this.expenses.find((e) => e.id === id);

      if (expense) {
        expense.status = newStatus;
      }
    },
  },
});
