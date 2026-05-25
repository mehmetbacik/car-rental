import { computed } from "vue";
import { useRoute } from "vue-router";
import { carsData } from "@/data/carsData";
import type { carType } from "@/types/cars";

export const useCarDetail = () => {
  const route = useRoute();

  const car = computed<carType>(() => {
    const routeId = route.params.id as string;

    const foundCar = carsData.find((c) => c.id === routeId);

    return (foundCar || carsData[0]) as carType;
  });

  return {
    car,
  };
};
