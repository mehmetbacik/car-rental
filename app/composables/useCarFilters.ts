import { ref } from "vue";

export const useCarFilters = () => {
  const activeFilters = ref({
    types: [] as string[],
    capacities: [] as string[],
    transmissions: [] as string[],
    fuels: [] as string[],
    maxPrice: Infinity,
  });

  const setFilters = (newFilters: typeof activeFilters.value) => {
    activeFilters.value = newFilters;
  };

  return {
    activeFilters,
    setFilters,
  };
};