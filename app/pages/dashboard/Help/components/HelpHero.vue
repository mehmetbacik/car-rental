<script setup lang="ts">
defineProps<{
  searchQuery: string;
}>();

const emit = defineEmits<{
  (e: "update:searchQuery", value: string): void;
}>();
</script>

<template>
  <header class="help-hero card">
    <h1>How can we help you?</h1>
    <div class="search-wrapper">
      <input
        :value="searchQuery"
        type="text"
        placeholder="Search for articles, guides..."
        @input="
          emit('update:searchQuery', ($event.target as HTMLInputElement).value)
        "
      />
      <button class="btn-search">Search</button>
    </div>
  </header>
</template>
