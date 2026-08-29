import { computed } from "vue";
import { useInventoryStore } from "@/stores/useInventory";

export const useInsights = () => {
  const inventoryStore = useInventoryStore();

  const revenueData = computed(() => ({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [2100, 1800, 3200, 2500, 4100, 5500, 4800],
        borderColor: "#3563E9",
        backgroundColor: "rgba(53, 99, 233, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }));

  const occupancyData = computed(() => ({
    labels: ["Rented", "Available", "Maintenance"],
    datasets: [
      {
        data: [
          inventoryStore.items.filter((car) => car.status === "Rented").length,
          inventoryStore.items.filter((car) => car.status === "Available")
            .length,
          inventoryStore.items.filter((car) => car.status === "Maintenance")
            .length,
        ],
        backgroundColor: ["#3563E9", "#7C9AFF", "#1A37A7"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  }));

  const categoryRevenue = {
    labels: ["Sport", "SUV", "Sedan", "Luxury"],
    datasets: [
      {
        label: "Earnings by Category",
        data: [12000, 8500, 5000, 15000],
        backgroundColor: "#54A6FF",
        borderRadius: 10,
      },
    ],
  };

  const topCars = computed(() => inventoryStore.items.slice(0, 4));

  return {
    inventoryStore,
    revenueData,
    occupancyData,
    categoryRevenue,
    topCars,
  };
};
