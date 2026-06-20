<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { carsData } from "@/data/carsData";

const route = useRoute();

const carId = computed(() => {
  const id = route.query.id;
  return Array.isArray(id) ? id[0] : id;
});

const car = computed(() => {
  if (!carId.value) return null;
  return carsData.find((item) => item.id === carId.value) || null;
});
</script>

<template>
  <div class="payment-page container">
    <div class="payment-grid">
      <div class="payment-forms">
        <!-- Billing Info -->
        <section class="card">
          <h3>Billing Info</h3>

          <div class="form-row">
            <div class="input-group">
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>

            <div class="input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="Phone number" />
            </div>
          </div>

          <div class="form-row">
            <div class="input-group">
              <label>Address</label>
              <input type="text" placeholder="Address" />
            </div>

            <div class="input-group">
              <label>Town / City</label>
              <input type="text" placeholder="Town or city" />
            </div>
          </div>
        </section>

        <!-- Rental Info -->
        <section class="card mt-2">
          <h3>Rental Info</h3>

          <div class="rental-section">
            <h4>Pick-Up</h4>

            <div class="form-row">
              <div class="input-group">
                <label>Location</label>
                <input type="text" placeholder="Select your city" />
              </div>

              <div class="input-group">
                <label>Date</label>
                <input type="date" />
              </div>

              <div class="input-group">
                <label>Time</label>
                <input type="time" />
              </div>
            </div>
          </div>

          <div class="rental-section">
            <h4>Drop-Off</h4>

            <div class="form-row">
              <div class="input-group">
                <label>Location</label>
                <input type="text" placeholder="Select your city" />
              </div>

              <div class="input-group">
                <label>Date</label>
                <input type="date" />
              </div>

              <div class="input-group">
                <label>Time</label>
                <input type="time" />
              </div>
            </div>
          </div>
        </section>

        <!-- Payment Method -->
        <section class="card mt-2">
          <h3>Payment Method</h3>

          <div class="payment-option active">
            <label>
              <input type="radio" checked />
              Credit Card
            </label>

            <div class="card-inputs">
              <input type="text" placeholder="Card number" />
              <input type="text" placeholder="Expiration date" />
              <input type="text" placeholder="Card holder" />
              <input type="text" placeholder="CVC" />
            </div>
          </div>

          <div class="payment-option">
            <label>
              <input type="radio" />
              PayPal
            </label>
          </div>

          <div class="payment-option">
            <label>
              <input type="radio" />
              Bitcoin
            </label>
          </div>
        </section>

        <!-- Confirmation -->
        <section class="card mt-2">
          <h3>Confirmation</h3>

          <div class="checkbox-group">
            <label>
              <input type="checkbox" />
              I agree with the terms and conditions and privacy policy.
            </label>
          </div>

          <div class="checkbox-group">
            <label>
              <input type="checkbox" />
              I agree to receive marketing and newsletter emails.
            </label>
          </div>
        </section>

        <!-- Rent Now -->
        <section class="rent-action">
          <button class="rent-btn">Rent Now</button>
        </section>
      </div>

      <!-- Summary -->
      <aside class="payment-summary card" v-if="car">
        <h3>Rental Summary</h3>

        <div class="summary-car">
          <img :src="car.images[0]" :alt="car.name" />

          <div>
            <h4>{{ car.name }}</h4>
            <span>⭐⭐⭐⭐⭐ {{ car.rating }} Rating</span>
          </div>
        </div>

        <hr />

        <div class="summary-prices">
          <div class="row">
            <span>Subtotal</span>
            <strong>${{ car.pricePerDay }}</strong>
          </div>

          <div class="row">
            <span>Tax</span>
            <strong>$0.00</strong>
          </div>
        </div>

        <div class="total-price">
          <div>
            <h4>Total Rental Price</h4>
            <p>Overall price and includes rental discount</p>
          </div>

          <h2>${{ car.pricePerDay }}</h2>
        </div>
      </aside>

      <!-- fallback -->
      <div v-else class="card">Car not found</div>
    </div>
  </div>
</template>
