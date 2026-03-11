<template>
  <div class="payment-page container">
    <div class="payment-grid">
      <div class="payment-forms">
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
        </section>

        <section class="card mt-2">
          <h3>Payment Method</h3>
          <div class="payment-option active">
            <input type="radio" checked /> Credit Card
            <div class="card-inputs">
              <input type="text" placeholder="Card number" />
              <input type="text" placeholder="Expiration date" />
              <input type="text" placeholder="Card holder" />
              <input type="text" placeholder="CVC" />
            </div>
          </div>
        </section>
      </div>

      <aside class="payment-summary card">
        <h3>Rental Summary</h3>
        <div class="summary-car">
          <img src="/images/car/car-koenigsegg.png" alt="Car" />
          <div>
            <h4>Nissan GT-R</h4>
            <span>⭐⭐⭐⭐⭐ 440+ Review</span>
          </div>
        </div>
        <hr />
        <div class="summary-prices">
          <div class="row"><span>Subtotal</span> <strong>$80.00</strong></div>
          <div class="row"><span>Tax</span> <strong>$0</strong></div>
        </div>
        <div class="total-price">
          <div>
            <h4>Total Rental Price</h4>
            <p>Overall price and includes rental discount</p>
          </div>
          <h2>$80.00</h2>
        </div>
      </aside>
    </div>
  </div>
</template>
