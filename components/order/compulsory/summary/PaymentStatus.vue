<template>
  <div
    class="status-list"
    v-if="$props.payment && $props.payment.PaymentType == 'BILL_PAYMENT'"
  >
    <!-- <figure class="status-icon">
      <div class="icon qr warning"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย QR</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div> -->

    <!-- <div class="status-info">
      <div class="notice-info">
        <i class="fa-regular fa-circle-info"></i> ค่าธรรมเนียม {{ $props.payment.FeeAmount }} บาท
      </div>
      <div class="status-action">
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน"
          >เปลี่ยนช่องทางการชำระเงิน</a
        >
      </div>
    </div> -->
  </div>

  <div
    class="status-list"
    v-if="$props.payment && $props.payment.PaymentType == 'CREDIT_CARD'"
  >
    <!-- <figure class="status-icon">
      <div class="icon cards warning"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย บัตรเครดิต/บัตรเดบิต</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div> -->

    <!-- <div class="status-info">
      <div class="status-action">
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน"
          >เปลี่ยนช่องทางการชำระเงิน</a
        >
      </div>
    </div> -->
  </div>

  <div
    class="status-list"
    v-if="$props.payment && $props.payment.PaymentType == 'PLEDGE' && $props.options"
  >
    <!-- <figure class="status-icon">
      <div class="icon pledge danger"></div>
    </figure>
    <h4 class="title">ชำระเงินด้วย วงเงินมัดจำ</h4>
    <div class="status-item text-blue text-big">
      <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div>
    <div class="status-item">
      <h5 class="topic">ยอดเงินในวงเงินมัดจำ</h5>
      <p>{{ $props.options.CreditError.Amount }} บาท</p>
    </div> -->

    <div class="status-info">
      <div
        class="notice-danger"
        v-if="$props.options.CreditError.Message == 'REQUIRE_INCREASE_CREDIT_LIMIT'"
      >
        <i class="fa-regular fa-circle-xmark"></i> ติดต่อ Agent เพื่อเพิ่มวงเงิน
      </div>
      <div
        class="notice-danger"
        v-else-if="$props.options.CreditError.Message == 'REQUIRE_CREDIT_TOPUP'"
      >
        <i class="fa-regular fa-circle-xmark"></i> วงเงินไม่พอให้เติมเงิน
      </div>
      <div class="status-action" v-if="validateWallet()">
        <button
          type="button"
          class="btn btn-primary"
          @click="openWallet"
          title="เติมเงินมัดจำ"
        >
          เติมเงินมัดจำ
        </button>
        <a class="btn" href="/order/compulsory/payment" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OptionsResponse, PaymentDetails } from "~/shared/entities/order-entity";

const showWallet = ref(false);
const emit = defineEmits(["openWallet"]);
const props = defineProps({
  payment: {
    type: Object as () => PaymentDetails,
  },
  options: {
    type: Object as () => OptionsResponse,
  },
});

const validateWallet = (): boolean => {
  let validate: boolean = false;
  if (props.options) {
    if (
      props.options.CreditError.Message == "" ||
      props.options.CreditError.Message == "REQUIRE_INCREASE_CREDIT_LIMIT"
    ) {
      validate = false;
    } else {
      validate = true;
    }
  } else {
    validate = true;
  }

  return validate;
};

const openWallet = () => {
  console.log("openWallet");
  emit("openWallet", true);
};
</script>
