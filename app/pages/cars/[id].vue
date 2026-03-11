<script setup lang="ts">
import carsData from "@/data/cars.json";
const route = useRoute();
const car = computed(
  () => carsData.find((c) => c.id === route.params.id) || carsData[0],
);

const mainImage = ref(car.value.image);
const reviews = [
  {
    id: 1,
    user: "Alex Stanton",
    role: "CEO at Bukalapak",
    date: "21 July 2022",
    comment: "We are very happy with the service...",
    rating: 4,
  },
  {
    id: 2,
    user: "Skylar Dias",
    role: "CEO at Amazon",
    date: "20 July 2022",
    comment: "Very comfortable car and clean...",
    rating: 5,
  },
];
</script>

<template>
  <div class="car-detail container">
    <div class="detail-grid">
      <div class="detail-visuals">
        <div class="main-card ad-card--blue">
          <h2>Sports car with the best design and acceleration</h2>
          <p>
            Safety and comfort while driving a futuristic and elegant sports car
          </p>
          <img :src="mainImage" alt="Main Car" class="main-img" />
        </div>
        <div class="thumbnails">
          <div
            v-for="i in 3"
            :key="i"
            @click="mainImage = car.image"
            class="thumb"
          >
            <img :src="car.image" alt="Thumbnail" />
          </div>
        </div>
      </div>

      <div class="detail-info-card card">
        <div class="info-header">
          <h2>{{ car.name }}</h2>
          <div class="rating">⭐⭐⭐⭐⭐ <span>440+ Review</span></div>
        </div>
        <p class="description">
          NISMO has become the embodiment of Nissan's outstanding performance,
          inspired by the most unforgiving proving ground, the race track.
        </p>
        <div class="specs-grid">
          <div class="spec-item">
            <span>Type Car</span> <strong>{{ car.type }}</strong>
          </div>
          <div class="spec-item">
            <span>Capacity</span> <strong>{{ car.capacity }}</strong>
          </div>
          <div class="spec-item">
            <span>Steering</span> <strong>{{ car.transmission }}</strong>
          </div>
          <div class="spec-item">
            <span>Gasoline</span> <strong>{{ car.fuelCapacity }}</strong>
          </div>
        </div>
        <div class="detail-footer">
          <div class="price">
            <strong>${{ car.pricePerDay }}.00/</strong> days
          </div>
          <NuxtLink :to="`/payment?id=${car.id}`" class="btn btn--primary"
            >Rent Now</NuxtLink
          >
        </div>
      </div>
    </div>

    <section class="reviews card">
      <h3>
        Reviews <span class="badge">{{ reviews.length }}</span>
      </h3>
      <div v-for="rev in reviews" :key="rev.id" class="review-item">
        <div class="review-user">
          <img src="https://ui-avatars.com/api/?name=User" alt="Avatar" />
          <div class="user-info">
            <h4>{{ rev.user }}</h4>
            <p>{{ rev.role }}</p>
          </div>
          <div class="review-date">{{ rev.date }}</div>
        </div>
        <p class="review-text">{{ rev.comment }}</p>
      </div>
    </section>
  </div>
</template>
