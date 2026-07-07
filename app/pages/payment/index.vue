<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { carsData } from "@/data/carsData";

import BillingInfo from "./components/BillingInfo.vue";
import RentalInfo from "./components/RentalInfo.vue";
import PaymentMethod from "./components/PaymentMethod.vue";
import ConfirmationSection from "./components/ConfirmationSection.vue";
import RentalSummary from "./components/RentalSummary.vue";

const route = useRoute();

const carId = computed(() => {
  const id = route.query.id;
  return Array.isArray(id) ? id[0] : id;
});

const car = computed(() => {
  if (!carId.value) return null;
  return carsData.find((item) => item.id === carId.value) || null;
});
</script>

<template>
  <div class="container">
    <div class="payment-page">
      <div class="payment-grid">
        <div class="payment-forms">
          <BillingInfo />
          <RentalInfo />
        </div>
        <RentalSummary v-if="car" :car="car" />
        <div v-else class="card">Car not found</div>
      </div>
    </div>
  </div>
  <div class="payment-page container">
    <div class="payment-grid">
      <div class="payment-forms">
        <PaymentMethod />
        <ConfirmationSection />
      </div>
    </div>
  </div>
</template>
