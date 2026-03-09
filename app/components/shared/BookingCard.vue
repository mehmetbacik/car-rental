<script setup lang="ts">
defineProps<{
  type: "Pick-Up" | "Drop-Off";
}>();

const locations = ["Istanbul", "Ankara", "Izmir", "Antalya"];
</script>

<template>
  <div class="booking-card">
    <div class="booking-card__header">
      <input type="radio" checked />
      <span class="booking-card__title">{{ type }}</span>
    </div>

    <div class="booking-card__inputs">
      <div class="input-group">
        <label>Locations</label>
        <select>
          <option value="">Select your city</option>
          <option v-for="loc in locations" :key="loc">{{ loc }}</option>
        </select>
      </div>
      <div class="input-group">
        <label>Date</label>
        <input type="date" />
      </div>
      <div class="input-group">
        <label>Time</label>
        <input type="time" />
      </div>
    </div>
  </div>
</template>