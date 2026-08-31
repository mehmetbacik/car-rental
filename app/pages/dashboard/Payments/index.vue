<script setup lang="ts">

import PaymentsHeader from "./components/PaymentsHeader.vue";
import PaymentCardList from "./components/PaymentCardList.vue";
import AddPaymentModal from "./components/AddPaymentModal.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

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

interface NewCard {
  bankName: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
  type: "visa" | "mastercard";
}

const cards = ref<CreditCard[]>([
  {
    id: "1",
    bankName: "Global Bank",
    cardNumber: "**** **** **** 4321",
    expiryDate: "2026-12",
    cardHolder: "Jane Doe",
    cvv: "123",
    type: "visa",
    isDefault: true,
  },
  {
    id: "2",
    bankName: "Digital Wallet",
    cardNumber: "**** **** **** 8899",
    expiryDate: "2025-08",
    cardHolder: "Jane Doe",
    cvv: "234",
    type: "mastercard",
    isDefault: false,
  },
]);

const isModalOpen = ref(false);
const errorMsg = ref("");

const setDefault = (id: string) => {
  cards.value.forEach((card) => {
    card.isDefault = card.id === id;
  });
};

const deleteCard = (id: string) => {
  if (confirm("Are you sure you want to delete this card?")) {
    cards.value = cards.value.filter((card) => card.id !== id);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  errorMsg.value = "";
};

const addNewCard = (card: NewCard) => {
  const hasEmptyField = Object.values(card).some(
    (value) => !value || value.trim() === "",
  );

  if (hasEmptyField) {
    errorMsg.value = "All fields are required!";
    return;
  }

  if (card.cardNumber.length < 16) {
    errorMsg.value = "Card number must be 16 digits.";
    return;
  }

  const lastFour = card.cardNumber.slice(-4);

  cards.value.push({
    id: Date.now().toString(),
    ...card,
    cardNumber: `**** **** **** ${lastFour}`,
    isDefault: cards.value.length === 0,
  });

  closeModal();
};
</script>

<template>
  <div class="payments-page">
    <PaymentsHeader @add-card="isModalOpen = true" />

    <PaymentCardList
      :cards="cards"
      @set-default="setDefault"
      @delete="deleteCard"
    />

    <AddPaymentModal
      v-if="isModalOpen"
      :error-msg="errorMsg"
      @close="closeModal"
      @submit="addNewCard"
    />
  </div>
</template>
