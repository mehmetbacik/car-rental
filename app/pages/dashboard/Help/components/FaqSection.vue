<script setup lang="ts">

import FaqItem from "./FaqItem.vue";

defineProps<{
  faqs: Array<{
    question: string;
    answer: string;
    isOpen: boolean;
  }>;
}>();

const emit = defineEmits<{
  (e: "toggle", faq: { isOpen: boolean }): void;
}>();
</script>

<template>
  <section class="faq-section card">
    <h3>Frequently Asked Questions</h3>
    <div class="faq-list">
      <FaqItem
        v-for="(faq, index) in faqs"
        :key="index"
        :faq="faq"
        @toggle="emit('toggle', faq)"
      />
      <div v-if="faqs.length === 0" class="no-results">
        No matching questions found.
      </div>
    </div>
  </section>
</template>
