<script setup lang="ts">
const SwitchIconPath = "/icons/switch.svg";
const handleSwitch = () => {
  console.log("Locations switched");
};
</script>

<template>
  <section class="booking-wrapper">
    <SharedBookingCard type="Pick-Up" />
    <button class="switch-btn" @click="handleSwitch">
      <img :src="SwitchIconPath" alt="Switch" />
    </button>
    <SharedBookingCard type="Drop-Off" />
  </section>
</template>