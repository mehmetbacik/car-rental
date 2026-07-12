<script setup lang="ts">
const SafetyIconPath = "/images/payment/safety.svg";
</script>

<template>
  <section class="paymentCard">
    <div class="paymentHeader">
      <h3>Confirmation</h3>
      <div class="paymentHeader-content">
        <p>
          We are getting to the end. Just few <br>clicks and your rental is ready!
        </p>
        <span>Step 4 of 4</span>
      </div>
    </div>
    <div class="paymentForm-checkbox">
      <div class="paymentForm-checkboxGroup">
        <label>
          <input type="checkbox" />
          I agree with sending an Marketing and newsletter emails. No spam,
          promissed!
        </label>
      </div>
      <div class="paymentForm-checkboxGroup">
        <label>
          <input type="checkbox" />
          I agree with our terms and conditions and privacy policy.
        </label>
      </div>
    </div>
    <div class="paymentForm-rentAction">
      <button class="rentBtn">Rent Now</button>
    </div>
    <div class="paymentForm-safety">
      <img :src="SafetyIconPath" alt="Safety" />
      <span>All your data are safe</span>
      <p>
        We are using the most advanced security to provide you the best
        experience ever.
      </p>
    </div>
  </section>
</template>
