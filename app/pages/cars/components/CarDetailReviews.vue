<script setup lang="ts">
import { ref, computed } from "vue";
import { reviewsData } from "@/data/reviewsData";
import type { Review } from "@/types/reviews";

const reviews: Review[] = reviewsData;

const visibleCount = ref(2);
const showAll = ref(false);

const displayedReviews = computed(() => {
  if (showAll.value) return reviews;
  return reviews.slice(0, visibleCount.value);
});

const toggleShowAll = () => {
  showAll.value = !showAll.value;

  if (!showAll.value) {
    visibleCount.value = 2;
  }
};
</script>

<template>
  <section class="reviews card">
    <div class="reviews-header">
      <h3>Reviews</h3>

      <span class="badge">
        {{ reviews.length }}
      </span>
    </div>

    <div
      v-for="review in displayedReviews"
      :key="review.id"
      class="review-item"
    >
      <div class="review-user">
        <img
          :src="`https://ui-avatars.com/api/?name=${review.user}&background=random`"
          :alt="review.user"
        />

        <div class="user-info">
          <h4>{{ review.user }}</h4>
          <p>{{ review.role }}</p>
        </div>

        <div class="review-date-rating">
          <span class="date">{{ review.date }}</span>

          <div class="stars">
            {{ "⭐".repeat(review.rating) }}
          </div>
        </div>
      </div>

      <p class="review-text">
        {{ review.comment }}
      </p>
    </div>

    <button class="show-all-btn" @click="toggleShowAll">
      {{ showAll ? "Show Less ↑" : "Show All ↓" }}
    </button>
  </section>
</template>
