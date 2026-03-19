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
  cvv: string;
  type: "visa" | "mastercard";
  isDefault: boolean;
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
const newCard = ref({
  bankName: "",
  cardNumber: "",
  expiryDate: "",
  cardHolder: "",
  cvv: "",
  type: "visa" as "visa" | "mastercard",
});

const validateName = (event: any) => {
  newCard.value.cardHolder = event.target.value.replace(
    /[^a-zA-ZğüşıöçĞÜŞİÖÇ ]/g,
    "",
  );
};

const validateNumber = (field: "cardNumber" | "cvv", event: any) => {
  newCard.value[field] = event.target.value.replace(/\D/g, "");
};

const setDefault = (id: string) => {
  cards.value.forEach((card) => (card.isDefault = card.id === id));
};

const deleteCard = (id: string) => {
  if (confirm("Are you sure you want to delete this card?")) {
    cards.value = cards.value.filter((c) => c.id !== id);
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  errorMsg.value = "";
  newCard.value = {
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cvv: "",
    type: "visa",
  };
};

const addNewCard = () => {
  const hasEmptyField = Object.values(newCard.value).some(
    (val) => !val || val.trim() === "",
  );

  if (hasEmptyField) {
    errorMsg.value = "All fields are required!";
    return;
  }

  if (newCard.value.cardNumber.length < 16) {
    errorMsg.value = "Card number must be 16 digits.";
    return;
  }

  const lastFour = newCard.value.cardNumber.slice(-4);
  cards.value.push({
    id: Date.now().toString(),
    ...newCard.value,
    cardNumber: `**** **** **** ${lastFour}`,
    isDefault: cards.value.length === 0,
  });

  closeModal();
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
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content card">
          <div class="modal-header">
            <h3>Add New Payment Method</h3>
            <button @click="closeModal" class="close-icon">&times;</button>
          </div>

          <form @submit.prevent="addNewCard">
            <div class="form-grid">
              <p v-if="errorMsg" class="error-banner">{{ errorMsg }}</p>

              <div class="input-group">
                <label>Card Holder</label>
                <input
                  v-model="newCard.cardHolder"
                  type="text"
                  @input="validateName"
                  placeholder="John Doe"
                />
              </div>

              <div class="input-group">
                <label>Card Number</label>
                <input
                  v-model="newCard.cardNumber"
                  type="text"
                  maxlength="16"
                  @input="validateNumber('cardNumber', $event)"
                  placeholder="16-digit number"
                />
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label>Expiration Date</label>
                  <input v-model="newCard.expiryDate" type="month" />
                </div>
                <div class="input-group">
                  <label>CVV</label>
                  <input
                    v-model="newCard.cvv"
                    type="text"
                    maxlength="3"
                    @input="validateNumber('cvv', $event)"
                    placeholder="123"
                  />
                </div>
              </div>

              <div class="input-row">
                <div class="input-group">
                  <label>Card Type</label>
                  <select v-model="newCard.type">
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Bank Name</label>
                  <input
                    v-model="newCard.bankName"
                    type="text"
                    placeholder="Global Bank"
                  />
                </div>
              </div>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn-cancel">
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
