<script setup lang="ts">
interface NewCard {
  bankName: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
  type: "visa" | "mastercard";
}

defineProps<{
  errorMsg: string;
}>();

const emit = defineEmits<{
  (e: "submit", card: NewCard): void;
  (e: "cancel"): void;
}>();

const newCard = ref<NewCard>({
  bankName: "",
  cardNumber: "",
  expiryDate: "",
  cardHolder: "",
  cvv: "",
  type: "visa",
});

const validateName = (event: Event) => {
  const target = event.target as HTMLInputElement;

  newCard.value.cardHolder = target.value.replace(
    /[^a-zA-ZğüşıöçĞÜŞİÖÇ ]/g,
    "",
  );
};

const validateNumber = (field: "cardNumber" | "cvv", event: Event) => {
  const target = event.target as HTMLInputElement;

  newCard.value[field] = target.value.replace(/\D/g, "");
};

const handleSubmit = () => {
  emit("submit", { ...newCard.value });
};

const reset = () => {
  newCard.value = {
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cvv: "",
    type: "visa",
  };
};

defineExpose({
  reset,
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-grid">
      <p v-if="errorMsg" class="error-banner">
        {{ errorMsg }}
      </p>

      <div class="input-group">
        <label>Card Holder</label>

        <input
          v-model="newCard.cardHolder"
          type="text"
          placeholder="John Doe"
          @input="validateName"
        />
      </div>

      <div class="input-group">
        <label>Card Number</label>

        <input
          v-model="newCard.cardNumber"
          type="text"
          maxlength="16"
          placeholder="16-digit number"
          @input="validateNumber('cardNumber', $event)"
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
            placeholder="123"
            @input="validateNumber('cvv', $event)"
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
      <button type="button" class="btn-cancel" @click="emit('cancel')">
        Cancel
      </button>

      <button type="submit" class="btn btn--primary">Save Card</button>
    </div>
  </form>
</template>
