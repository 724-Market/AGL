<template>
  <div class="qr-payment" v-if="$props.paymenGatewayInfo">
    <div class="status-list">
      <div class="logo">724 Payment</div>
      <div class="status-item">
        <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
        <p>{{ $props.paymenGatewayInfo.orderid }}</p>
      </div>
      <div class="status-item">
        <h5 class="topic">จำนวนเงิน</h5>
        <p>{{ useUtility().getCurrency(parseInt($props.paymenGatewayInfo.amount)) }}</p>
      </div>
      <div class="status-item text-warning">
        <h5 class="topic">กรุณาชำระภายใน</h5>
        <p>14 มี.ค. 2566 17:34 น.</p>
      </div>
    </div>

    <div class="qr-info">
      <figure class="qr-code">
        <img :src="$props.paymenGatewayInfo.payment_qr" alt="" />
      </figure>

      <small>{{ $props.paymenGatewayInfo.refno1 }}</small>

      <p>หรือคลิกปุ่มเพื่อบันทึก QR ด้านล่าง</p>
      <div class="btn-group">
        <button type="button" class="btn btn-secondary" @click="downloadImage">
          <i class="fa-solid fa-download"></i>บันทึก QR
        </button>
        <button
          type="button"
          v-if="isCheck"
          class="btn btn-outline-primary"
          @click="checkPayment"
        >
          Check
        </button>
      </div>
    </div>

    <!-- <div class="qr-action">
                <a class="btn btn-outline-info" href="#" title="แชร์หน้านี้">แชร์หน้านี้</a>
                <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
            </div> -->
  </div>
</template>

<style scoped>
.btn-group {
  position: relative;
  display: flex;
  vertical-align: middle;
}
</style>

<script setup lang="ts">
import {
  PaymentGatewayResponse,
  PaymentGetRequest,
} from "~/shared/entities/payment-entity";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";

const paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();
var isCheck = ref(false);

const paymentGat = useStorePaymentGet();

const emit = defineEmits(['checkPayment'])

const props = defineProps({
  paymenGatewayInfo: {
    type: Object as () => PaymentGatewayResponse,
  },
  paymentType: String,
});

const onLoad = onMounted(async () => {
  if (props.paymenGatewayInfo) {
    paymenGatewaytInfo.value = props.paymenGatewayInfo;
  }
  setTimeout(() => {
    isCheck.value = true;
  }, 30000);
});

const downloadImage = () => {
  if (props.paymenGatewayInfo && props.paymenGatewayInfo.payment_qr) {
    useUtility().downloadImage(props.paymenGatewayInfo.payment_qr, "paymeny_qr.png");
  }
};

const checkPayment = async () => {
  const router = useRouter();
  const req: PaymentGetRequest = {
    PaymentNo: paymenGatewaytInfo.value?.refno2 ?? "",
  };
  if (props.paymentType == "wallet") {
    const response = await useRepository().pledge.creditorderPaymentGet(req)
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      emit('checkPayment',response.apiResponse.Data[0])
    }
  } else {
    const response = await useRepository().payment.get(req);
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      await paymentGat.setPaymentGet(response.apiResponse.Data[0]);
      router.push("/order/compulsory/thanks");
    }
  }
};

watch(
  () => props.paymenGatewayInfo,
  async () => {
    if (props.paymenGatewayInfo) {
      paymenGatewaytInfo.value = props.paymenGatewayInfo;
    }
  }
);
</script>
