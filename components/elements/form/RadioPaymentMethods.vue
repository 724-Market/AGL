<template>
  <FormKit type="radio" label="ช่องทางการชำระเงิน" name="PaymentMethods" :options="paymentMethodsOption"
    validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<script lang="ts" setup>
import type { Fee, RadiioPaymentObject } from "~/shared/entities/payment-entity";
import type { RadioOption } from "~/shared/entities/select-option";
import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";

const props = defineProps({
  order: {
    type: Object as () => PlaceOrderRequest,
  },
  fee: {
    type: Object as () => RadiioPaymentObject,
  }
})

const paymentMethodsOption: globalThis.Ref<RadioOption[]> = ref([
  {
    label: 'สแกน QR',
    value: 'qr',
    help: `ค่าธรรมเนียม - บาท`
  },
  {
    label: 'บัตรเครดิต/บัตรเดบิต',
    value: 'card',
    help: `ค่าธรรมเนียม -%`,
  },
  {
    label: 'วงเงินมัดจำ',
    value: 'pledge',
    help: `คงเหลือ - บาท`,
  }
])

const fee: globalThis.Ref<RadiioPaymentObject | undefined> = ref()
const order: globalThis.Ref<PlaceOrderRequest | undefined> = ref()

const onLoad = onMounted(async () => {
  if (props.order) {
    order.value = props.order
  }
  if (props.fee) {
    fee.value = props.fee
  }
})

const setPaymentMethodsOption = async (fee: RadiioPaymentObject | undefined) => {
  if (fee != undefined) {
    paymentMethodsOption.value = [
      {
        label: 'สแกน QR',
        value: 'qr',
        help: `ค่าธรรมเนียม ${fee.FeeQr ?? '-'} บาท`,
        attrs: { disabled: order.value?.DeliveryMethod1?.DeliveryType == 'PAPER' ? true : false }
      },
      {
        label: 'บัตรเครดิต/บัตรเดบิต',
        value: 'card',
        help: `ค่าธรรมเนียม ${fee.PercenCard ?? '-'}%`,
        attrs: { disabled: order.value?.DeliveryMethod1?.DeliveryType == 'PAPER' ? true : false }
      },
      {
        label: 'วงเงินมัดจำ',
        value: 'pledge',
        help: `คงเหลือ ${fee.RemainPledge ?? '-'} บาท`,
      }
    ]
  }
}

watch(fee, async (newFee) => {
  await setPaymentMethodsOption(newFee)
})
watch(order, async (newOrder) => {
  await setPaymentMethodsOption(fee.value)
})

watch(
  () => props.order,
  async () => {
    if (props.order) {
      order.value = props.order
    }
  }
)
watch(
  () => props.fee,
  async () => {
    if (props.fee) {
      fee.value = props.fee
    }
  }
)
</script>