<script setup lang="ts">
import { ref } from "vue";

const selectedMethod = ref("card");
</script>

<template>
  <section class="card mt-2">
    <h3>Payment Method</h3>

    <!-- Credit Card -->
    <div class="payment-option" :class="{ active: selectedMethod === 'card' }">
      <label>
        <input type="radio" value="card" v-model="selectedMethod" />
        Credit Card
      </label>

      <div v-if="selectedMethod === 'card'" class="card-inputs">
        <input type="text" placeholder="Card number" />
        <input type="text" placeholder="Expiration date" />
        <input type="text" placeholder="Card holder" />
        <input type="text" placeholder="CVC" />
      </div>
    </div>

    <!-- PayPal -->
    <div
      class="payment-option"
      :class="{ active: selectedMethod === 'paypal' }"
    >
      <label>
        <input type="radio" value="paypal" v-model="selectedMethod" />
        PayPal
      </label>
    </div>

    <!-- Bitcoin -->
    <div
      class="payment-option"
      :class="{ active: selectedMethod === 'bitcoin' }"
    >
      <label>
        <input type="radio" value="bitcoin" v-model="selectedMethod" />
        Bitcoin
      </label>
    </div>
  </section>
</template>
