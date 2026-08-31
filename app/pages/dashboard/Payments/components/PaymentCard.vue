<script setup lang="ts">
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
  card: CreditCard;
}>();

const emit = defineEmits<{
  (e: "set-default", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <div class="payment-card" :class="{ 'default-border': card.isDefault }">
    <div class="card-chip-row">
      <span class="chip"></span>
      <span class="card-type">
        {{ card.type.toUpperCase() }}
      </span>
    </div>
    <div class="card-number">
      {{ card.cardNumber }}
    </div>
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
        class="btn-text"
        @click="emit('set-default', card.id)"
      >
        Set as Default
      </button>
      <span v-else class="default-badge"> Default </span>
      <button class="btn-delete" @click="emit('delete', card.id)">
        Delete
      </button>
    </div>
  </div>
</template>
