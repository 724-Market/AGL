<template>
    <div class="card">

<div class="card-header">
  <h3 class="card-title">วิธีการชำระเงิน</h3>
</div>

<div class="card-body">

  <section class="payment-methods">

    <ElementsFormRadioPaymentMethods v-model="paymentMethodText" />

  </section>

  <section class="discount-methods" v-if="paymentMethodText != ''">

    <ElementsFormRadioDiscountMethods v-model="discountMethodText" />

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

<script lang="ts" setup>
import { 
  CalculateRequest, 
  CalculateResponse, 
  Max, 
  Fee, 
  TotalDiscount 
} from "~/shared/entities/payment-entity";
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";

const isError = ref(false);
const messageError = ref("");

const orderInfo: globalThis.Ref<PlaceOrderRequest | undefined> = ref()
var orderNo: globalThis.Ref<String> = ref("")

const calculate: globalThis.Ref<CalculateResponse | undefined> = ref()
const max: globalThis.Ref<Max | undefined> = ref()
const fee: globalThis.Ref<Fee | undefined> = ref()
const totalDiscount: globalThis.Ref<TotalDiscount | undefined> = ref()
var paymentMethodText: globalThis.Ref<String> = ref("")
var discountMethodText: globalThis.Ref<String> = ref("")

const props = defineProps({
  order: {
    type: Object as () => PlaceOrderRequest,
  }
})

const onLoad = onMounted(async () => {
  if(props.order){
    orderInfo.value = props.order
    orderNo.value =  props.order.OrderNo ?? ''
  }
})

watch(paymentMethodText, async (newPaymentMethod) => {
  await handleRadioPaymentMethodChange(newPaymentMethod)
})

watch(discountMethodText, async (newDiscountMethod) => {
  await handleRadioDiscountMethodChange(newDiscountMethod)
})

watch(orderNo, async (neworderNo) => {
  await getCalculate(neworderNo.toString())
})

const handleRadioPaymentMethodChange = async (event: String) => {
  //TODO: Pass param to Component method, discount
  switch (event) {
    case "qr":
      max.value = calculate.value?.BillPayment.Max
      fee.value = calculate.value?.BillPayment.Fee
      totalDiscount.value = calculate.value?.BillPayment.TotalDiscount
      break
    case "card":
      max.value = calculate.value?.DebitCredit.Max
      fee.value = calculate.value?.DebitCredit.Fee
      totalDiscount.value = calculate.value?.DebitCredit.TotalDiscount
      break
    case "pledge":
      max.value = calculate.value?.Pledge.Max
      fee.value = calculate.value?.Pledge.Fee
      totalDiscount.value = calculate.value?.Pledge.TotalDiscount
      break
  }
}

const handleRadioDiscountMethodChange = async (event: String) => {
  
}

const getCalculate = async (orderNo: string) => {
  if(orderNo != '') {
    let calculateReq: CalculateRequest = {
    OrderNo: orderNo
    }
    const response = await useRepository().payment.calculate(calculateReq);
    if (response.apiResponse.Status && response.apiResponse.Status == "200" && response.apiResponse.Data) {
      calculate.value = response.apiResponse.Data
    } else {
      isError.value = true;
      messageError.value = response.apiResponse.ErrorMessage ?? "";
    }
  }
}

//watching props pass data
watch(
    () => props.order,
    async () => {
      if (props.order) {
        orderInfo.value = props.order
        orderNo.value =  props.order.OrderNo ?? ''
      }
    }
)

</script>