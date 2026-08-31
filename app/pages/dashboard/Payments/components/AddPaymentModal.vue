<script setup lang="ts">

import PaymentForm from "./PaymentForm.vue";

defineProps<{
  errorMsg: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (
    e: "submit",
    card: {
      bankName: string;
      cardNumber: string;
      expiryDate: string;
      cardHolder: string;
      cvv: string;
      type: "visa" | "mastercard";
    },
  ): void;
}>();
</script>

<template>
  <Transition name="fade">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal-content card">
        <div class="modal-header">
          <h3>Add New Payment Method</h3>

          <button class="close-icon" @click="emit('close')">&times;</button>
        </div>

        <PaymentForm
          :error-msg="errorMsg"
          @submit="emit('submit', $event)"
          @cancel="emit('close')"
        />
      </div>
    </div>
  </Transition>
</template>
