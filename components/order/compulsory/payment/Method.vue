<template>
    <div class="card">

<div class="card-header">
  <h3 class="card-title">วิธีการชำระเงิน</h3>
</div>

<div class="card-body">

  <section class="payment-methods">

    <ElementsFormRadioPaymentMethods />

  </section>

  <section class="discount-methods">

    <ElementsFormRadioDiscountMethods />

  </section>

  <section class="custom-discount inner-section">
    <h5 class="discount-text">ส่วนลดที่สามารถใช้ได้สูงสุด 160 บาท</h5>

    <div class="discount-range">

      <div class="prefix">0 บาท</div>

      <FormKit type="slider" label="ใช้ส่วนลด" value="0" min="0" max="160" step="0.01" show-input
        tooltip="true" />

      <div class="suffix">160 บาท</div>

    </div>
  </section>

</div>
</div>
</template>
<style scoped>
.custom-discount {
  display: none;
}

.discount-methods:has(.formkit-input[value="partialdiscount" i]:checked)~.custom-discount {
  display: block;
}
</style>