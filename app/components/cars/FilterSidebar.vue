<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { carsData } from "@/data/carsData";

defineProps<{
  isOpen?: boolean;
}>();

const emit = defineEmits(["filter-change", "close"]);

const availableTypes = computed(() =>
  [...new Set(carsData.map((car) => car.type).filter(Boolean))].sort(),
);
const availableCapacities = computed(() =>
  [...new Set(carsData.map((car) => car.capacity).filter(Boolean))].sort(),
);
const availableTransmissions = computed(() =>
  [...new Set(carsData.map((car) => car.transmission).filter(Boolean))].sort(),
);
const availableFuels = computed(() =>
  [...new Set(carsData.map((car) => car.fuelCapacity).filter(Boolean))].sort(),
);
const maxAvailablePrice = computed(() => {
  if (carsData.length === 0) return 200;
  return Math.max(...carsData.map((car) => car.pricePerDay));
});

const selectedTypes = ref<string[]>([]);
const selectedCapacities = ref<string[]>([]);
const selectedTransmissions = ref<string[]>([]);
const selectedFuels = ref<string[]>([]);
const priceValue = ref(maxAvailablePrice.value);

const getCount = (key: keyof typeof carsData[0], value: string | number) => {
  return carsData.filter((car) => {
    const carValue = car[key] !== undefined && car[key] !== null ? String(car[key]) : "";
    return carValue === String(value);
  }).length;
};

watch(
  [
    selectedTypes,
    selectedCapacities,
    selectedTransmissions,
    selectedFuels,
    priceValue,
  ],
  () => {
    emit("filter-change", {
      types: selectedTypes.value,
      capacities: selectedCapacities.value,
      transmissions: selectedTransmissions.value,
      fuels: selectedFuels.value,
      maxPrice: priceValue.value,
    });
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <aside class="filter-sidebar" :class="{ 'is-open': isOpen }">
    <button class="close-sidebar-btn" @click="emit('close')">&times;</button>
    <div class="filter-group" v-if="availableTypes.length > 0">
      <h4 class="filter-group__title">TYPE</h4>
      <div v-for="type in availableTypes" :key="type" class="filter-item">
        <input
          type="checkbox"
          :id="`type-${type}`"
          :value="type"
          v-model="selectedTypes"
        />
        <label :for="`type-${type}`"
          >{{ type }} <span>({{ getCount("type", type) }})</span></label
        >
      </div>
    </div>
    <div class="filter-group" v-if="availableCapacities.length > 0">
      <h4 class="filter-group__title">CAPACITY</h4>
      <div v-for="cap in availableCapacities" :key="cap" class="filter-item">
        <input
          type="checkbox"
          :id="`cap-${cap}`"
          :value="cap"
          v-model="selectedCapacities"
        />
        <label :for="`cap-${cap}`"
          >{{ cap }} <span>({{ getCount("capacity", cap) }})</span></label
        >
      </div>
    </div>
    <div class="filter-group" v-if="availableTransmissions.length > 0">
      <h4 class="filter-group__title">TRANSMISSION</h4>
      <div
        v-for="trans in availableTransmissions"
        :key="trans"
        class="filter-item"
      >
        <input
          type="checkbox"
          :id="`trans-${trans}`"
          :value="trans"
          v-model="selectedTransmissions"
        />
        <label :for="`trans-${trans}`"
          >{{ trans }}
          <span>({{ getCount("transmission", trans) }})</span></label
        >
      </div>
    </div>
    <div class="filter-group" v-if="availableFuels.length > 0">
      <h4 class="filter-group__title">FUEL CAPACITY</h4>
      <div v-for="fuel in availableFuels" :key="fuel" class="filter-item">
        <input
          type="checkbox"
          :id="`fuel-${fuel}`"
          :value="fuel"
          v-model="selectedFuels"
        />
        <label :for="`fuel-${fuel}`"
          >{{ fuel }} <span>({{ getCount("fuelCapacity", fuel) }})</span></label
        >
      </div>
    </div>
    <div class="filter-group">
      <h4 class="filter-group__title">PRICE</h4>
      <input
        type="range"
        v-model.number="priceValue"
        min="0"
        :max="maxAvailablePrice"
        class="price-range"
      />
      <p class="price-label">Max. ${{ priceValue }}.00</p>
    </div>
  </aside>
</template>