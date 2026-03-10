<script setup lang="ts">
const types = [
  { label: "Sport", count: 10 },
  { label: "SUV", count: 12 },
  { label: "MPV", count: 16 },
  { label: "Sedan", count: 20 },
];
const capacities = [
  { label: "2 Person", count: 10 },
  { label: "4 Person", count: 14 },
  { label: "8 Person", count: 6 },
];
const priceValue = ref(100);
</script>

<template>
  <aside class="filter-sidebar">
    <div class="filter-group">
      <h4 class="filter-group__title">TYPE</h4>
      <div v-for="type in types" :key="type.label" class="filter-item">
        <input type="checkbox" :id="type.label" />
        <label :for="type.label"
          >{{ type.label }} <span>({{ type.count }})</span></label
        >
      </div>
    </div>

    <div class="filter-group">
      <h4 class="filter-group__title">CAPACITY</h4>
      <div v-for="cap in capacities" :key="cap.label" class="filter-item">
        <input type="checkbox" :id="cap.label" />
        <label :for="cap.label"
          >{{ cap.label }} <span>({{ cap.count }})</span></label
        >
      </div>
    </div>

    <div class="filter-group">
      <h4 class="filter-group__title">PRICE</h4>
      <input
        type="range"
        v-model="priceValue"
        min="0"
        max="200"
        class="price-range"
      />
      <p class="price-label">Max. ${{ priceValue }}.00</p>
    </div>
  </aside>
</template>
