<script setup lang="ts">
import { ref } from "vue";

const selectedMethod = ref("card");
</script>

<template>
  <section class="paymentCard">
    <div class="paymentHeader">
      <h3>Payment Method</h3>
      <div class="paymentHeader-content">
        <p>Please enter your payment method</p>
        <span>Step 3 of 4</span>
      </div>
    </div>
    <div class="paymentOption" :class="{ active: selectedMethod === 'card' }">
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
    <div class="paymentOption" :class="{ active: selectedMethod === 'paypal' }">
      <label>
        <input type="radio" value="paypal" v-model="selectedMethod" />
        PayPal
      </label>
      <div v-if="selectedMethod === 'paypal'" class="card-inputs">
        <input type="text" placeholder="Card number" />
        <input type="text" placeholder="Expiration date" />
        <input type="text" placeholder="Card holder" />
        <input type="text" placeholder="CVC" />
      </div>
    </div>
    <div
      class="paymentOption"
      :class="{ active: selectedMethod === 'bitcoin' }"
    >
      <label>
        <input type="radio" value="bitcoin" v-model="selectedMethod" />
        Bitcoin
      </label>
      <div v-if="selectedMethod === 'bitcoin'" class="card-inputs">
        <input type="text" placeholder="Card number" />
        <input type="text" placeholder="Expiration date" />
        <input type="text" placeholder="Card holder" />
        <input type="text" placeholder="CVC" />
      </div>
    </div>
  </section>
</template>
