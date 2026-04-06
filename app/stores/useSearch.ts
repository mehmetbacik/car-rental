import { defineStore } from "pinia";
import { useInventoryStore } from "./useInventory";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchQuery: "",
    activeSearchTerm: "",
    isDropdownOpen: false,
  }),

  getters: {
    filteredResults: (state) => {
      const inventory = useInventoryStore();
      if (state.searchQuery.length < 1) return [];

      return inventory.items.filter(
        (car) =>
          car.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          car.type.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },

    pageResults: (state) => {
      const inventory = useInventoryStore();
      if (!state.activeSearchTerm) return inventory.items;

      return inventory.items.filter((car) =>
        car.name.toLowerCase().includes(state.activeSearchTerm.toLowerCase()),
      );
    },
  },

  actions: {
    closeDropdown() {
      this.isDropdownOpen = false;
    },

    executeSearch(term: string) {
      this.activeSearchTerm = term;
      this.searchQuery = "";
      this.isDropdownOpen = false;
    },
  },
});
