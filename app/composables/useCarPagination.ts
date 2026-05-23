import { ref, computed } from "vue";

export const useCarPagination = (filteredCars: any) => {
  const displayCount = ref(4);

  const displayedCars = computed(() => {
    return filteredCars.value.slice(0, displayCount.value);
  });

  const showMore = () => {
    displayCount.value += 4;
  };

  const resetPagination = () => {
    displayCount.value = 4;
  };

  return {
    displayCount,
    displayedCars,
    showMore,
    resetPagination,
  };
};