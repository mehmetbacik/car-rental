<script setup lang="ts">
interface InventoryCar {
  id: string;
  name: string;
  type: string;
  status: string;
  pricePerDay: number;
  images: string[];
}

const props = defineProps<{
  car: InventoryCar | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "save",
    data: {
      id: string;
      name: string;
      type: string;
      status: string;
      pricePerDay: number;
    },
  ): void;
}>();

const editForm = ref({
  name: "",
  type: "",
  status: "",
  pricePerDay: 0,
});

watch(
  () => props.car,
  (car) => {
    if (!car) return;

    editForm.value = {
      name: car.name,
      type: car.type,
      status: car.status,
      pricePerDay: car.pricePerDay,
    };
  },
  { immediate: true },
);

const saveChanges = () => {
  if (!props.car) return;

  emit("save", {
    id: props.car.id,
    ...editForm.value,
  });
};
</script>

<template>
  <Transition name="fade">
    <div v-if="car" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content card">
        <h3>Edit {{ car.name }}</h3>
        <form class="edit-form" @submit.prevent="saveChanges">
          <div class="input-group">
            <label>Price Per Day ($)</label>
            <input v-model.number="editForm.pricePerDay" type="number" />
          </div>
          <div class="input-group">
            <label>Status</label>
            <select v-model="editForm.status">
              <option value="Available">Available</option>
              <option value="Rented">Rented</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-cancel" @click="emit('close')">
              Cancel
            </button>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>
