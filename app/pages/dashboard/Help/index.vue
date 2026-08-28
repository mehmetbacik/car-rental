<script setup lang="ts">
import { useHelpStore } from "@/stores/useHelp";

import HelpHero from "./components/HelpHero.vue";
import HelpCategories from "./components/HelpCategories.vue";
import FaqSection from "./components/FaqSection.vue";
import ContactSupport from "./components/ContactSupport.vue";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

const helpStore = useHelpStore();

const searchQuery = ref("");

const toggleFaq = (faq: { isOpen: boolean }) => {
  faq.isOpen = !faq.isOpen;
};

const filteredFaqs = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return helpStore.faqs.filter((faq) =>
    faq.question.toLowerCase().includes(query),
  );
});

const handleStartChat = () => {
  // Open live chat
};
</script>

<template>
  <div class="help-page">
    <HelpHero v-model:search-query="searchQuery" />
    <HelpCategories :categories="helpStore.categories" />
    <div class="help-content-grid">
      <FaqSection :faqs="filteredFaqs" @toggle="toggleFaq" />
      <ContactSupport @start-chat="handleStartChat" />
    </div>
  </div>
</template>
