import { ref, watch } from "vue";

export const useCarFavorite = (car: any) => {
  const isFavorite = ref(false);
  const mainImage = ref("");

  watch(
    () => car.value,
    (newCar) => {
      isFavorite.value = newCar.isFavorite;
      mainImage.value = newCar.image;
    },
    { immediate: true },
  );

  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value;
  };

  const setMainImage = (img: string) => {
    mainImage.value = img;
  };

  return {
    isFavorite,
    mainImage,
    toggleFavorite,
    setMainImage,
  };
};
