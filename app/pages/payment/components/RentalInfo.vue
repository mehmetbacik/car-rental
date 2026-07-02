<template>
  <section class="paymentCard">
    <div class="paymentHeader">
      <h3>Rental Info</h3>
      <div class="paymentHeader-content">
        <p>Please select your rental date</p>
        <span>Step 2 of 4</span>
      </div>
    </div>
    <div class="paymentForm">
      <div class="paymentForm-rowTitle">
        <input type="radio" checked />
        <h4>Pick-Up</h4>
      </div>
      <div class="paymentForm-row">
        <div class="paymentForm-inputGroup">
          <label>Location</label>
          <input type="text" placeholder="Select your city" />
        </div>
      </div>
      <div class="paymentForm-row">
        <div class="paymentForm-inputGroup">
          <label>Date</label>
          <input type="date" />
        </div>
        <div class="paymentForm-inputGroup">
          <label>Time</label>
          <input type="time" />
        </div>
      </div>
      <div class="paymentForm-rowTitle">
        <input type="radio" checked />
        <h4>Drop-Off</h4>
      </div>
      <div class="paymentForm-row">
        <div class="paymentForm-inputGroup">
          <label>Location</label>
          <input type="text" placeholder="Select your city" />
        </div>
      </div>
      <div class="paymentForm-row">
        <div class="paymentForm-inputGroup">
          <label>Date</label>
          <input type="date" />
        </div>
        <div class="paymentForm-inputGroup">
          <label>Time</label>
          <input type="time" />
        </div>
      </div>
    </div>
  </section>
</template>
