import { computed } from "vue";
import { carsData } from "@/data/carsData";

export const useFilteredCars = (activeFilters: any) => {
  const filteredCars = computed(() => {
    return carsData.filter((car) => {
      const matchesType =
        activeFilters.value.types.length === 0 ||
        activeFilters.value.types.includes(car.type);

      const matchesCapacity =
        activeFilters.value.capacities.length === 0 ||
        activeFilters.value.capacities.includes(car.capacity);

      const matchesTransmission =
        activeFilters.value.transmissions.length === 0 ||
        activeFilters.value.transmissions.includes(car.transmission);

      const matchesFuel =
        activeFilters.value.fuels.length === 0 ||
        activeFilters.value.fuels.includes(car.fuelCapacity);

      const matchesPrice = car.pricePerDay <= activeFilters.value.maxPrice;

      return (
        matchesType &&
        matchesCapacity &&
        matchesTransmission &&
        matchesFuel &&
        matchesPrice
      );
    });
  });

  return { filteredCars };
};
