<template>
  <div class="payment-info" v-if="$props.paymenGatewayInfo">
    <div class="status-list">
      <div class="logo">724 Payment</div>
      <div class="status-item">
        <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
        <p>{{ $props.paymenGatewayInfo.orderid }}</p>
      </div>
      <div class="status-item">
        <h5 class="topic">จำนวนเงิน</h5>
        <p>{{ $props.paymenGatewayInfo.amount }} บาท</p>
      </div>
      <div class="status-item" v-if="$props.paymentType == 'wallet'">
        <h5 class="topic">ค่าธรรมเนียม</h5>
        <p>{{ $props.feeAmount ? useUtility().getCurrency($props.feeAmount) + ' บาท' : 'ไม่มี' }}</p>
      </div>
      <div class="status-item" v-if="$props.paymentType == 'wallet'">
        <h5 class="topic">ยอดเงินเติมที่สามารถใช้ได้</h5>
        <p>{{ useUtility().getCurrency(parseInt($props.paymenGatewayInfo.amount) - ($props.feeAmount ?? 0)) }} บาท</p>
      </div>
      <div class="status-item text-warning" v-if="$props.paymenGatewayInfo.payment_expired != ''">
        <h5 class="topic">กรุณาชำระภายใน</h5>
        <p>{{ useUtility().formatDate($props.paymenGatewayInfo.payment_expired, 'FullDateFullTime') }}</p>
      </div>
      <div class="status-item text-warning">
        <h5 class="topic">สถานะ</h5>
        <p>รอการชำระเงิน</p>
      </div>
    </div>

    <div class="qr-info">

      <figure class="qr-code">
        <img :src="$props.paymenGatewayInfo.payment_qr" :alt="$props.paymenGatewayInfo.refno1" />
      </figure>

      <small>{{ $props.paymenGatewayInfo.refno1 }}</small>

      <p>หรือคลิกปุ่มเพื่อบันทึก QR ด้านล่าง</p>

      <button type="button" class="btn-secondary" @click="downloadImage">
        <i class="fa-solid fa-download"></i>บันทึก QR
      </button>

      <div class="qr-action" v-if="isCheckPaymentStatus">
        <UtilitiesLoading :waiting-text="waitingText" v-if="isWaitingPaymentStatus" />

        <div class="notice-info" v-else>
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
  PaymentGatewayResponse,
  PaymentGetRequest,
} from "~/shared/entities/payment-entity"
import { useStorePaymentGet } from "~/stores/order/storePaymentGet"

const paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref()

var isCheckPaymentStatus = ref(false)

var isWaitingPaymentStatus = ref(false)

const paymentGat = useStorePaymentGet()

const emit = defineEmits(['onCheckPayment'])

const waitingText = ref('กำลังตรวจสอบข้อมูลกับธนาคาร')

const props = defineProps({
  paymenGatewayInfo: {
    type: Object as () => PaymentGatewayResponse,
  },
  paymentType: String,
  feeAmount: Number
})

onMounted(async () => {
  if (props.paymenGatewayInfo) {
    paymenGatewaytInfo.value = props.paymenGatewayInfo
  }

  setTimeout(() => {
    isCheckPaymentStatus.value = true
  }, 10000)
})

const downloadImage = () => {
  if (props.paymenGatewayInfo && props.paymenGatewayInfo.payment_qr) {
    useUtility().downloadImage(props.paymenGatewayInfo.payment_qr, "paymeny_qr.png")
  }
}

const checkPayment = async () => {

  isWaitingPaymentStatus.value = true

  const router = useRouter()
  const req: PaymentGetRequest = {
    PaymentNo: paymenGatewaytInfo.value?.refno2 ?? "",
  }
  if (props.paymentType == "wallet") {
    const response = await useRepository().pledge.creditorderPaymentGet(req)
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      emit('onCheckPayment', response.apiResponse.Data[0])
    }
  } else {
    const response = await useRepository().payment.get(req)
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      await paymentGat.setPaymentGet(response.apiResponse.Data.Payment[0])
      router.push("/order/compulsory/thanks")
    }
  }
}

watch(
  () => props.paymenGatewayInfo,
  async () => {
    if (props.paymenGatewayInfo) {
      paymenGatewaytInfo.value = props.paymenGatewayInfo
    }
  }
)
</script>
