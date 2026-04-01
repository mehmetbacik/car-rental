import { defineStore } from "pinia";
import { useInventoryStore } from "./useInventory";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchQuery: "",
    isDropdownOpen: false,
  }),
  getters: {
    filteredResults: (state) => {
      const inventory = useInventoryStore();
      if (state.searchQuery.length < 2) return [];

      return inventory.items.filter(
        (car) =>
          car.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          car.type.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  actions: {
    setSearchQuery(query: string) {
      this.searchQuery = query;
      this.isDropdownOpen = query.length > 0;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
  },
});
