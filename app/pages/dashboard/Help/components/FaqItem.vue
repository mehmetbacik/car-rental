<script setup lang="ts">
defineProps<{
  faq: {
    question: string;
    answer: string;
    isOpen: boolean;
  };
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<template>
  <div class="faq-item" :class="{ active: faq.isOpen }">
    <div class="faq-question" @click="emit('toggle')">
      <span>{{ faq.question }}</span>
      <span class="arrow">
        {{ faq.isOpen ? "−" : "+" }}
      </span>
    </div>
    <div v-if="faq.isOpen" class="faq-answer">
      <p>{{ faq.answer }}</p>
    </div>
  </div>
</template>
