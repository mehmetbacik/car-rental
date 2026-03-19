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

const isModalOpen = ref(false);
const newCard = ref({
  bankName: "",
  cardNumber: "",
  expiryDate: "",
  cardHolder: "",
  type: "visa" as "visa" | "mastercard",
});

const setDefault = (id: string) => {
  cards.value.forEach((card) => (card.isDefault = card.id === id));
};

const deleteCard = (id: string) => {
  if (confirm("Are you sure you want to delete this card?")) {
    cards.value = cards.value.filter((c) => c.id !== id);
  }
};

const addNewCard = () => {
  const lastFour = newCard.value.cardNumber.replace(/\s/g, "").slice(-4);
  const maskedNumber = `**** **** **** ${lastFour || "0000"}`;

  const cardToAdd: CreditCard = {
    id: Date.now().toString(),
    ...newCard.value,
    cardNumber: maskedNumber,
    isDefault: cards.value.length === 0,
  };

  cards.value.push(cardToAdd);

  isModalOpen.value = false;
  newCard.value = {
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    type: "visa",
  };
};
</script>

<template>
  <div class="payments-page">
    <div class="header-section">
      <div>
        <h2>Payment Methods</h2>
        <p>Manage your cards and billing information.</p>
      </div>
      <button @click="isModalOpen = true" class="btn btn--primary">
        + Add New Card
      </button>
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

    <Transition name="fade">
      <div
        v-if="isModalOpen"
        class="modal-overlay"
        @click.self="isModalOpen = false"
      >
        <div class="modal-content card">
          <div class="modal-header">
            <h3>Add New Payment Method</h3>
            <button class="close-btn" @click="isModalOpen = false">
              &times;
            </button>
          </div>

          <form @submit.prevent="addNewCard">
            <div class="form-grid">
              <div class="input-group">
                <label>Card Holder</label>
                <input
                  v-model="newCard.cardHolder"
                  type="text"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div class="input-group">
                <label>Card Number</label>
                <input
                  v-model="newCard.cardNumber"
                  type="text"
                  maxlength="16"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div class="input-row">
                <div class="input-group">
                  <label>Expiration Date</label>
                  <input
                    v-model="newCard.expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div class="input-group">
                  <label>Card Type</label>
                  <select v-model="newCard.type">
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
              </div>
              <div class="input-group">
                <label>Bank Name</label>
                <input
                  v-model="newCard.bankName"
                  type="text"
                  placeholder="Global Bank"
                  required
                />
              </div>
            </div>

            <div class="modal-actions">
              <button
                type="button"
                @click="isModalOpen = false"
                class="btn-cancel"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn--primary">Save Card</button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>
