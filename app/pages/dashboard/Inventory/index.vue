<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInventoryStore } from "@/stores/useInventory";

import InventoryHeader from "./components/InventoryHeader.vue";
import InventoryTable from "./components/InventoryTable.vue";
import InventoryEditModal from "./components/InventoryEditModal.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

interface InventoryCar {
  id: string;
  name: string;
  type: string;
  status: string;
  pricePerDay: number;
  images: string[];
}

const inventoryStore = useInventoryStore();

const { items: inventory } = storeToRefs(inventoryStore);

const isEditModalOpen = ref(false);
const selectedCar = ref<InventoryCar | null>(null);

const openEditModal = (car: InventoryCar) => {
  selectedCar.value = car;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedCar.value = null;
};

const saveChanges = (data: {
  id: string;
  name: string;
  type: string;
  status: string;
  pricePerDay: number;
}) => {
  inventoryStore.updateCar(data.id, {
    name: data.name,
    type: data.type,
    status: data.status,
    pricePerDay: data.pricePerDay,
  });

  closeEditModal();
};

const confirmDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this car?")) {
    inventoryStore.deleteCar(id);
  }
};

const handleAddCar = () => {
  // Open add car modal
};
</script>

<template>
  <div class="inventory-page">
    <InventoryHeader
      :total-cars="inventoryStore.totalCars"
      @add-car="handleAddCar"
    />

    <InventoryTable
      :inventory="inventory"
      @edit="openEditModal"
      @delete="confirmDelete"
    />

    <InventoryEditModal
      v-if="isEditModalOpen"
      :car="selectedCar"
      @close="closeEditModal"
      @save="saveChanges"
    />
  </div>
</template>
