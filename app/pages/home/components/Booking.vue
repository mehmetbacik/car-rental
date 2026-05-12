<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const SwitchIconPath = "/icons/switch.svg";
const SearchIconPath = "/icons/search.svg";

const bookingData = ref({
  pickup: { location: "", date: "", time: "" },
  dropoff: { location: "", date: "", time: "" },
});

const handleSwitch = () => {
  const temp = { ...bookingData.value.pickup };
  bookingData.value.pickup = { ...bookingData.value.dropoff };
  bookingData.value.dropoff = temp;
};

const handleSearch = () => {
  router.push({
    path: "/cars",
    query: {
      p_loc: bookingData.value.pickup.location,
      p_date: bookingData.value.pickup.date,
      d_loc: bookingData.value.dropoff.location,
    },
  });
};
</script>

<template>
  <section class="booking-wrapper">
    <div class="booking-content">
      <SharedBookingCard type="Pick-Up" :data="bookingData.pickup" />
      <div class="booking-actions">
        <button
          class="switch-btn"
          @click="handleSwitch"
          type="button"
          title="Switch Locations"
        >
          <img :src="SwitchIconPath" alt="Switch" />
        </button>
        <button
          class="search-btn"
          @click="handleSearch"
          type="button"
          title="Search"
        >
          <img :src="SearchIconPath" alt="Search" />
        </button>
      </div>
      <SharedBookingCard type="Drop-Off" :data="bookingData.dropoff" />
    </div>
  </section>
</template>
