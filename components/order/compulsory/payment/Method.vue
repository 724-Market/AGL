<template>
    <div class="card">

<div class="card-header">
  <h3 class="card-title">วิธีการชำระเงิน</h3>
</div>

<div class="card-body">

  <section class="payment-methods">

    <ElementsFormRadioPaymentMethods 
      v-model="paymentMethodText" 
      :order="order"
      :fee="radiioPaymentObject"
    />

  </section>

  <section class="discount-methods" v-if="paymentMethodText != ''">

    <ElementsFormRadioDiscountMethods 
      v-model="discountMethodText" 
      :max="max"
    />

  </section>

  <section class="custom-discount inner-section">
    <h5 class="discount-text">ส่วนลดที่สามารถใช้ได้สูงสุด {{someDiscountMax}} บาท</h5>

    <div class="discount-range">

      <div class="prefix">0 บาท</div>

      <FormKit type="slider" label="ใช้ส่วนลด" value="0" min="0" :max="someDiscountMax" step="1" show-input
        tooltip="true" v-model="someDiscount"/>

      <div class="suffix">{{someDiscountMax}} บาท</div>

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
  DebitCredit,
  BillPayment,
  Pledge,
  Fee, 
  Max,
  RadiioPaymentObject,
  SummaryDiscountObject
} from "~/shared/entities/payment-entity";
import { CreditBalanceResponse } from '~/shared/entities/pledge-entity'
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";

const emit = defineEmits(['passSummary'])

const isError = ref(false);
const messageError = ref("");

const orderInfo: globalThis.Ref<PlaceOrderRequest | undefined> = ref()
var orderNo: globalThis.Ref<String> = ref("")

const calculate: globalThis.Ref<CalculateResponse | undefined> = ref()
const billPayment: globalThis.Ref<DebitCredit | undefined> = ref()
const debitCredit: globalThis.Ref<BillPayment | undefined> = ref()
const pledge: globalThis.Ref<Pledge | undefined> = ref()
const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref()
const max: globalThis.Ref<Max | undefined> = ref()

const feeQr: globalThis.Ref<Fee | undefined> = ref()
const feeCard: globalThis.Ref<Fee | undefined> = ref()
const remainPledge: globalThis.Ref<number> = ref(0)
const someDiscount: globalThis.Ref<number> = ref(0)
const someDiscountMax: globalThis.Ref<number> = ref(0)
// const totalDiscount: globalThis.Ref<TotalDiscount | undefined> = ref()
// const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref()
const radiioPaymentObject: globalThis.Ref<RadiioPaymentObject | undefined> = ref()

const packagePrice: globalThis.Ref<number> = ref(0)
const shipopingCost: globalThis.Ref<number> = ref(0)
const feeCost: globalThis.Ref<number> = ref(0)
const totalPrice: globalThis.Ref<number> = ref(0)
const disPrice: globalThis.Ref<number> = ref(0)
const sumPrice: globalThis.Ref<number> = ref(0)
// const summaryDiscountObject: globalThis.Ref<SummaryDiscountObject | undefined> = ref()

var paymentMethodText: globalThis.Ref<String> = ref("")
var discountMethodText: globalThis.Ref<String> = ref("")

const props = defineProps({ //TODO: Check Object Null To Display Discount
  order: {
    type: Object as () => PlaceOrderRequest,
  },
  calculate: {
    type: Object as () => CalculateResponse,
  },
  creditBalance: {
    type: Object as () => CreditBalanceResponse,
  },
})

const onLoad = onMounted(async () => {
  if(props.order){
    orderInfo.value = props.order
    orderNo.value =  props.order.OrderNo ?? ''
  }
  if(props.calculate){
    calculate.value = props.calculate
  }
  if(props.creditBalance){
    creditBalance.value = props.creditBalance
  }
})

watch(paymentMethodText, async (newPaymentMethod) => {
  await handleRadioPaymentMethodChange(newPaymentMethod)
})

watch(discountMethodText, async (newDiscountMethod) => {
  await handleRadioDiscountMethodChange(newDiscountMethod)
})

// watch(orderNo, async (neworderNo) => {
// })

watch(calculate, async (newCalculate) => {
  await getCalculate()
})

watch(creditBalance, async (newCreditBalance) => {
  await getCalculate()
})

watch(someDiscount, async (newSomeDiscount) => {
  await getSummary()
})

const handleRadioPaymentMethodChange = async (event: String) => {
  //TODO: Pass param to Component 'discount'
  switch (event) {
    case "qr":
      max.value = {
        ZeroCommission: billPayment.value?.ZeroCommission?.Max ?? undefined,
        SomeCommission: billPayment.value?.SomeCommission?.Max ?? undefined,
        FullCommission: billPayment.value?.FullCommission?.Max ?? 0
      }
      // totalDiscount.value = calculate.value?.BillPayment.TotalDiscount
      await handleRadioDiscountMethodChange(discountMethodText.value)
      break
    case "card":
      max.value = {
        ZeroCommission: debitCredit.value?.ZeroCommission?.Max ?? undefined,
        SomeCommission: debitCredit.value?.SomeCommission?.Max ?? undefined,
        FullCommission: debitCredit.value?.FullCommission?.Max ?? 0
      }
      // totalDiscount.value = calculate.value?.DebitCredit.TotalDiscount
      await handleRadioDiscountMethodChange(discountMethodText.value)
      break
    case "pledge":
      max.value = {
        ZeroCommission: pledge.value?.ZeroCommission?.Max ?? undefined,
        SomeCommission: pledge.value?.SomeCommission?.Max ?? undefined,
        FullCommission: pledge.value?.FullCommission?.Max ?? 0
      }
      // totalDiscount.value = calculate.value?.Pledge.TotalDiscount
      await handleRadioDiscountMethodChange(discountMethodText.value)
      break
  }
}

const handleRadioDiscountMethodChange = async (event: String) => {
  //TODO: Pass param to Component 'method'
  switch (event) {
    case "fulldiscount":
      if(paymentMethodText.value == 'qr') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0, // Change
          FeeCard: debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = billPayment.value?.ZeroCommission?.Fee.Price ?? 0
      } else if(paymentMethodText.value == 'card') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0,
          FeeCard : debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0, // Change
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0
      } else {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0, 
          FeeCard: debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = pledge.value?.ZeroCommission?.Fee.Amount ?? 0
      }
      disPrice.value = max.value?.ZeroCommission ?? 0
      someDiscountMax.value = max.value?.ZeroCommission ?? 0
      break
    case "partialdiscount":
      if(paymentMethodText.value == 'qr') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.SomeCommission?.Fee.Price ?? 0, // Change
          FeeCard : debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = billPayment.value?.SomeCommission?.Fee.Amount ?? 0
      } else if(paymentMethodText.value == 'card') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0,
          FeeCard : debitCredit.value?.SomeCommission?.Fee.Amount ?? 0, // Change
          PercenCard: debitCredit.value?.SomeCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = debitCredit.value?.SomeCommission?.Fee.Amount ?? 0
      } else {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0, 
          FeeCard: debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = pledge.value?.SomeCommission?.Fee.Amount ?? 0
      }
      disPrice.value = max.value?.SomeCommission ?? 0
      someDiscountMax.value = max.value?.SomeCommission ?? 0
      break
    case "fullpay":
      if(paymentMethodText.value == 'qr') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.FullCommission?.Fee.Price ?? 0, // Change
          FeeCard : debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value =  billPayment.value?.FullCommission?.Fee.Amount ?? 0
      } else if(paymentMethodText.value == 'card') {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0, 
          FeeCard : debitCredit.value?.FullCommission?.Fee.Amount ?? 0, // Change
          PercenCard: debitCredit.value?.FullCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value = debitCredit.value?.FullCommission?.Fee.Amount ?? 0
      } else {
        radiioPaymentObject.value = {
          FeeQr: billPayment.value?.ZeroCommission?.Fee.Price ?? 0, 
          FeeCard: debitCredit.value?.ZeroCommission?.Fee.Amount ?? 0,
          PercenCard: debitCredit.value?.ZeroCommission?.Fee.Price ?? 0,
          RemainPledge: remainPledge.value 
        }
        feeCost.value =  pledge.value?.FullCommission?.Fee.Amount ?? 0
      }
      disPrice.value = max.value?.FullCommission ?? 0
      someDiscountMax.value = max.value?.FullCommission ?? 0
      break
  }
  // console.log('radiioPaymentObject.value', radiioPaymentObject.value)
  await getSummary()
}

const getCalculate = async () => {
  if(calculate.value && creditBalance.value){
    // console.log('calculate.value', calculate.value)
    remainPledge.value = creditBalance.value.AvailableBalance

    billPayment.value = calculate.value.BillPayment
    debitCredit.value = calculate.value.DebitCredit
    pledge.value = calculate.value.Pledge
    packagePrice.value = calculate.value.Total
    // console.log('billPayment.value', billPayment.value)
    // console.log('debitCredit.value', debitCredit.value)
    // console.log('pledge.value', pledge.value)

    shipopingCost.value = orderInfo.value?.DeliveryMethod1?.DeliveryType == 'DELIVERY' ? 50 : 0
    radiioPaymentObject.value = {
      FeeQr: calculate.value.BillPayment.FullCommission?.Fee.Price ?? 0,
      FeeCard: calculate.value.DebitCredit.FullCommission?.Fee.Price ?? 0,
      PercenCard: calculate.value.DebitCredit.FullCommission?.Fee.Price ?? 0,
      RemainPledge: remainPledge.value
    }
  }
}

const getSummary = async () => {
  let totalPrice = packagePrice.value + shipopingCost.value + feeCost.value
  let disCount = discountMethodText.value == 'partialdiscount' ? someDiscount.value : disPrice.value 
  let sum = totalPrice - disCount
  let summaryDiscountObject: SummaryDiscountObject = {
    PackagePrice: packagePrice.value,
    ShipopingCost: shipopingCost.value,
    FeeCost: feeCost.value,
    TotalPrice: parseFloat(totalPrice.toFixed(2)),
    DisPrice: disCount,
    SumPrice: parseFloat(sum.toFixed(2)),
    PaymentMethod: paymentMethodText.value.toString(),
    DiscountMethod: discountMethodText.value.toString()
  }
  // console.log('summaryDiscountObject', summaryDiscountObject)
  emit('passSummary', summaryDiscountObject)
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

watch(
  () => props.calculate,
  async () => {
    if (props.calculate) {
      calculate.value = props.calculate
    }
  }
)

watch(
  () => props.creditBalance,
  async () => {
    if (props.creditBalance) {
      creditBalance.value = props.creditBalance
    }
  }
)

</script>