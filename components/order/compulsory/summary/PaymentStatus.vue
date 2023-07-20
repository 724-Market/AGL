<template>
  <div class="status-list" v-if="$props.payment && $props.payment.PaymentType=='BILL_PAYMENT'">
    <figure class="status-icon">
      <div class="icon qr warning"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย QR</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div>

    <div class="status-info">
      <div class="notice-info">
        <i class="fa-regular fa-circle-info"></i> ค่าธรรมเนียม {{ $props.payment.FeeAmount }} บาท
      </div>
      <div class="status-action">
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน"
          >เปลี่ยนช่องทางการชำระเงิน</a
        >
      </div>
    </div>
  </div>

  <div class="status-list" v-if="$props.payment && $props.payment.PaymentType=='CREDIT_CARD'">
    <figure class="status-icon">
      <div class="icon cards warning"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย บัตรเครดิต/บัตรเดบิต</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div>

    <div class="status-info">
      <div class="status-action">
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน"
          >เปลี่ยนช่องทางการชำระเงิน</a
        >
      </div>
    </div>
  </div>

  <div class="status-list"  v-if="$props.payment && $props.payment.PaymentType=='PLEDGE'">
    <figure class="status-icon">
      <div class="icon pledge danger"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย วงเงินมัดจำ</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div>
    <div class="status-item">
      <h5 class="topic">ยอดเงินในวงเงินมัดจำ</h5>
      <p>500.00 บาท</p>
    </div>

    <div class="status-info">
      <div class="notice-danger">
        <i class="fa-regular fa-circle-xmark"></i> วงเงินมัดจำไม่เพียงพอ
      </div>
      <div class="status-action">
        <a class="btn btn-primary" href="#" title="เติมเงินมัดจำ">เติมเงินมัดจำ</a>
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน"
          >เปลี่ยนช่องทางการชำระเงิน</a
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {  PaymentDetails } from "~/shared/entities/order-entity";


const props = defineProps({
  payment: {
    type: Object as () => PaymentDetails,
  },
});
</script>