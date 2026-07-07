<script setup lang="ts">
import { ref } from "vue";

const selectedMethod = ref("card");

const CreditCardVisaIconPath = "/images/payment/visa.svg";
const CreditCardMasterIconPath = "/images/payment/mc.svg";
const PaypalIconPath = "/images/payment/paypal.svg";
const BitcoinIconPath = "/images/payment/bitcoin.svg";
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
      <div class="paymentForm">
        <div class="paymentForm-rowTitle">
          <div class="paymentForm-content">
            <input type="radio" value="card" v-model="selectedMethod" />
            <h4>Credit Card</h4>
          </div>
          <div class="paymentForm-icons">
            <img :src="CreditCardVisaIconPath" alt="Visa" />
            <img :src="CreditCardMasterIconPath" alt="MasterCard" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'card'">
          <div class="paymentForm-inputGroup">
            <label>Card Number</label>
            <input type="text" placeholder="Card number" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>Expiration Date</label>
            <input type="date" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'card'">
          <div class="paymentForm-inputGroup">
            <label>Card Holder</label>
            <input type="text" placeholder="Card holder" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>CVC</label>
            <input type="text" placeholder="CVC" />
          </div>
        </div>
      </div>
    </div>
    <div class="paymentOption" :class="{ active: selectedMethod === 'paypal' }">
      <div class="paymentForm">
        <div class="paymentForm-rowTitle">
          <div class="paymentForm-content">
            <input type="radio" value="paypal" v-model="selectedMethod" />
            <h4>Paypal</h4>
          </div>
          <div class="paymentForm-icons">
            <img :src="PaypalIconPath" alt="Paypal" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'paypal'">
          <div class="paymentForm-inputGroup">
            <label>Card Number</label>
            <input type="text" placeholder="Card number" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>Expiration Date</label>
            <input type="date" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'paypal'">
          <div class="paymentForm-inputGroup">
            <label>Card Holder</label>
            <input type="text" placeholder="Card holder" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>CVC</label>
            <input type="text" placeholder="CVC" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="paymentOption"
      :class="{ active: selectedMethod === 'bitcoin' }"
    >
      <div class="paymentForm">
        <div class="paymentForm-rowTitle">
          <div class="paymentForm-content">
            <input type="radio" value="bitcoin" v-model="selectedMethod" />
            <h4>Bitcoin</h4>
          </div>
          <div class="paymentForm-icons">
            <img :src="BitcoinIconPath" alt="Bitcoin" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'bitcoin'">
          <div class="paymentForm-inputGroup">
            <label>Card Number</label>
            <input type="text" placeholder="Card number" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>Expiration Date</label>
            <input type="date" />
          </div>
        </div>
        <div class="paymentForm-row" v-if="selectedMethod === 'bitcoin'">
          <div class="paymentForm-inputGroup">
            <label>Card Holder</label>
            <input type="text" placeholder="Card holder" />
          </div>
          <div class="paymentForm-inputGroup">
            <label>CVC</label>
            <input type="text" placeholder="CVC" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
