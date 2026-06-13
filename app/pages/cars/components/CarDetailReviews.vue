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
  <section class="carDetail-reviews">
    <div class="carDetail-reviews__header">
      <h3>Reviews</h3>
      <span class="carDetail-reviews__badge">
        {{ reviews.length }}
      </span>
    </div>
    <div
      v-for="review in displayedReviews"
      :key="review.id"
      class="carDetail-reviews__reviewItem"
    >
      <div class="carDetail-reviews__reviewUser">
        <div class="carDetail-reviews__userInfo">
          <img
            :src="`https://ui-avatars.com/api/?name=${review.user}&background=random`"
            :alt="review.user"
          />
          <div class="carDetail-reviews__userInfoDetail">
            <h4>{{ review.user }}</h4>
            <p>{{ review.role }}</p>
          </div>
        </div>
        <div class="carDetail-reviews__ratingWrapper">
          <span class="carDetail-reviews__reviewDate">
            {{ review.date }}
          </span>
          <div class="carDetail-reviews__rating">
            <span
              v-for="star in 5"
              :key="star"
              class="carDetail-reviews__ratingStar"
              :class="{
                'carDetail-reviews__ratingStar--filled': star <= review.rating,
                'carDetail-reviews__ratingStar--empty': star > review.rating,
              }"
            />
          </div>
        </div>
      </div>
      <p class="carDetail-reviews__reviewText">
        {{ review.comment }}
      </p>
    </div>
    <button class="show-all-btn" @click="toggleShowAll">
      {{ showAll ? "Show Less ↑" : "Show All ↓" }}
    </button>
  </section>
</template>
