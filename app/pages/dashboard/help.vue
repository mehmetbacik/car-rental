<script setup lang="ts">
import { useHelpStore } from "@/stores/useHelp";

definePageMeta({ layout: "admin", middleware: "auth" });

const helpStore = useHelpStore();
const searchQuery = ref("");

const toggleFaq = (faq: { isOpen: boolean }) => {
  if (faq) {
    faq.isOpen = !faq.isOpen;
  }
};

const filteredFaqs = computed(() => {
  return helpStore.faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
</script>

<template>
  <div class="help-page">
    <header class="help-hero card">
      <h1>How can we help you?</h1>
      <div class="search-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for articles, guides..."
        />
        <button class="btn-search">Search</button>
      </div>
    </header>

    <section class="help-categories">
      <div
        v-for="cat in helpStore.categories"
        :key="cat.id"
        class="category-card card"
      >
        <span class="icon">{{ cat.icon }}</span>
        <h3>{{ cat.title }}</h3>
        <p>{{ cat.count }} Articles</p>
      </div>
    </section>

    <div class="help-content-grid">
      <section class="faq-section card">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-list">
          <div
            v-for="(faq, index) in filteredFaqs"
            :key="index"
            class="faq-item"
            :class="{ active: faq.isOpen }"
          >
            <div class="faq-question" @click="toggleFaq(faq)">
              <span>{{ faq.question }}</span>
              <span class="arrow">{{ faq.isOpen ? "−" : "+" }}</span>
            </div>
            <div v-if="faq.isOpen" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>

          <div v-if="filteredFaqs.length === 0" class="no-results">
            No matching questions found.
          </div>
        </div>
      </section>

      <aside class="contact-support card">
        <h3>Still need help?</h3>
        <p>Our support team is available 24/7 to assist you.</p>

        <div class="contact-methods">
          <div class="method">
            <span class="m-icon">✉️</span>
            <div class="m-text">
              <strong>Email Support</strong>
              <span>support@morent.com</span>
            </div>
          </div>
          <div class="method">
            <span class="m-icon">💬</span>
            <div class="m-text">
              <strong>Live Chat</strong>
              <span>Average wait: 2 mins</span>
            </div>
          </div>
        </div>

        <button class="btn-contact-primary">Start Live Chat</button>
      </aside>
    </div>
  </div>
</template>
