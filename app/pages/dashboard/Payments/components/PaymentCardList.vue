<script setup lang="ts">

import PaymentCard from "./PaymentCard.vue";

interface CreditCard {
  id: string;
  bankName: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
  type: "visa" | "mastercard";
  isDefault: boolean;
}

defineProps<{
  cards: CreditCard[];
}>();

const emit = defineEmits<{
  (e: "set-default", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="cards-grid">
    <PaymentCard
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @set-default="emit('set-default', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>
