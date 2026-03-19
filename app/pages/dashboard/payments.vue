<script setup lang="ts">
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
  type: "visa" | "mastercard";
  isDefault: boolean;
}

const cards = ref<CreditCard[]>([
  {
    id: "1",
    bankName: "Global Bank",
    cardNumber: "**** **** **** 4321",
    expiryDate: "12/26",
    cardHolder: "Jane Doe",
    type: "visa",
    isDefault: true,
  },
  {
    id: "2",
    bankName: "Digital Wallet",
    cardNumber: "**** **** **** 8899",
    expiryDate: "08/25",
    cardHolder: "Jane Doe",
    type: "mastercard",
    isDefault: false,
  },
]);

const setDefault = (id: string) => {
  cards.value.forEach((card) => (card.isDefault = card.id === id));
};

const deleteCard = (id: string) => {
  if (confirm("Are you sure you want to delete this card?")) {
    cards.value = cards.value.filter((c) => c.id !== id);
  }
};
</script>

<template>
  <div class="payments-page">
    <div class="header-section">
      <div>
        <h2>Payment Methods</h2>
        <p>Manage your cards and billing information.</p>
      </div>
      <button class="btn btn--primary">+ Add New Card</button>
    </div>

    <div class="cards-grid">
      <div
        v-for="card in cards"
        :key="card.id"
        class="payment-card"
        :class="{ 'default-border': card.isDefault }"
      >
        <div class="card-chip-row">
          <span class="chip"></span>
          <span class="card-type">{{ card.type.toUpperCase() }}</span>
        </div>

        <div class="card-number">{{ card.cardNumber }}</div>

        <div class="card-footer">
          <div class="holder">
            <span>Card Holder</span>
            <p>{{ card.cardHolder }}</p>
          </div>
          <div class="expiry">
            <span>Expires</span>
            <p>{{ card.expiryDate }}</p>
          </div>
        </div>

        <div class="actions">
          <button
            v-if="!card.isDefault"
            @click="setDefault(card.id)"
            class="btn-text"
          >
            Set as Default
          </button>
          <span v-else class="default-badge">Default</span>
          <button @click="deleteCard(card.id)" class="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>