import { defineStore } from "pinia";
import { carsData } from "@/data/carsData";
import type { carType } from "@/types/cars";

export interface InventoryCar extends carType {
  status: string;
}

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    items: carsData.map((car) => ({
      ...car,
      status: car.status || "Available",
    })) as InventoryCar[],
  }),

  getters: {
    totalCars: (state) => state.items.length,
    totalRevenue: (state) =>
      state.items.reduce((acc, car) => acc + car.pricePerDay, 0),
    monthlyGrowth: (state) => {
      return { labels: ["Jan", "Feb", "Mar"], data: [12000, 14500, 18200] };
    },
    topPerformingCars: (state) => {
      return [...state.items]
        .sort((a, b) => b.pricePerDay - a.pricePerDay)
        .slice(0, 3);
    },
  },

  actions: {
    updateCar(id: string, updatedFields: Partial<InventoryCar>) {
      const index = this.items.findIndex((item) => item.id === id);

      if (index !== -1) {
        const currentCar = this.items[index];
        this.items[index] = {
          ...currentCar,
          ...updatedFields,
        } as InventoryCar;
      }
    },

    deleteCar(id: string) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
});
