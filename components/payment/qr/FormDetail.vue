<template>
  <div class="payment-info" v-if="$props.paymentInfo.orderid">
    <div class="status-list">
      <div class="logo">724 Payment</div>
      <div class="status-item">
        <h5 class="topic">หมายเลขอ้างอิง</h5>
        <p>{{ $props.paymentInfo.orderid }}</p>
      </div>
      <div class="status-item">
        <h5 class="topic">จำนวนเงิน</h5>
        <p>{{ useUtility().getCurrency($props.paymentInfo.amount) }} บาท</p>
      </div>
      <div class="status-item text-warning" v-if="$props.paymentInfo.payment_expired != ''">
        <h5 class="topic">กรุณาชำระภายใน</h5>
        <p>{{ useUtility().formatDate($props.paymentInfo.payment_expired, 'FullDateFullTime') }}</p>
      </div>
      <div class="status-item text-warning">
        <h5 class="topic">สถานะ</h5>
        <p>รอการชำระเงิน</p>
      </div>
    </div>

    <div class="qr-info">

      <figure class="qr-code">
        <img :src="$props.paymentInfo.payment_qr" :alt="$props.paymentInfo.refno1" />
      </figure>

      <small>{{ $props.paymentInfo.refno1 }}</small>

      <p>หรือคลิกปุ่มเพื่อบันทึก QR ด้านล่าง</p>

      <button type="button" class="btn-secondary" @click="downloadImage">
        <i class="fa-solid fa-download"></i>บันทึก QR
      </button>

      <div class="qr-action">
        <div class="notice-info">
          <p>หลังจากสแกนชำระเงินแล้ว หากท่านต้องการตรวจสอบสถานะการชำระเงิน ท่านสามารถกดปุ่มด้านล่างเพื่อตรวจสอบสถานะได้
          </p>
          <button type="button" class="btn-info" @click="checkPayment">
            ตรวจสอบสถานะการชำระเงิน
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">

import type {
  PaymentGetRequest,
} from "~/shared/entities/payment-entity"

const props = defineProps(['paymentInfo'])
const waitingText = ref('กำลังตรวจสอบข้อมูลกับธนาคาร')
var isWaitingPaymentStatus = ref(false)

const downloadImage = () => {
    if (props.paymentInfo && props.paymentInfo.payment_qr) {
        useUtility().downloadImage(props.paymentInfo.payment_qr, "paymeny_qr.png")
    }
}

const checkPayment = async () => {

    const router = useRouter()
    const req: PaymentGetRequest = {
      PaymentNo: props.paymentInfo.orderid,
    }

    const response = await useRepository().payment.get(req)
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      console.log(response)
      alert('Payment Success')
      //router.push("/order/compulsory/thanks")
    }
    else {
      console.log(response)
      alert('Payment Pending')
    }

}

</script>