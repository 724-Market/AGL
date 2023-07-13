<template>
    <div class="summary-table">
                <table class="table no-striped">
                  <thead>
                    <tr>
                      <th scope="col">รายการ</th>
                      <th scope="col" class="text-end">ราคา (บาท)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="product">
                      <th scope="row">พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล<span>พ.ร.บ. • {{companyName}}</span></th>
                      <td class="text-end price">{{packagePrice}}</td>
                    </tr>
                    <!-- <tr class="product">
                      <th scope="row">Family Man<span>ประกันภัยรถยนต์ ชั้น 1 • กรุงเทพประกันภัย</span></th>
                      <td class="text-end price">7,500.00</td>
                    </tr> -->
                    <tr class="shipping">
                      <th scope="row">ค่าจัดส่ง<span>{{deliveryText}}</span></th>
                      <td class="text-end price">{{shipopingCost}}</td>
                    </tr>
                    <tr class="fee">
                      <th scope="row">ค่าธรรมเนียม<span>{{paymentMethodText}}</span></th>
                      <td class="text-end price">{{feeCost}}</td>
                    </tr>
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="subtotal">
                      <th scope="row">รวมราคา</th>
                      <td class="text-end price">{{totalPrice}}</td>
                    </tr>
                    <tr class="discount">
                      <th scope="row">หักส่วนลด</th>
                      <td class="text-end price">-{{disPrice}}</td>
                    </tr>
                    <!-- <tr class="coupon">
                      <th scope="row">ใช้คูปองส่วนลด</th>
                      <td class="text-end price">-100.00</td>
                    </tr> -->
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td scope="col">รวมยอดที่ต้องชำระ</td>
                      <td scope="col" class="text-end price">{{sumPrice}}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
</template>

<script lang="ts" setup>
import { SelectOption } from "~/shared/entities/select-option";
import { IPackageResponse } from "~~/shared/entities/packageList-entity";
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import { SummaryDiscountObject } from "~/shared/entities/payment-entity";

type StringArray = {
  [key: string]: string;
};

const props = defineProps({
  order: {
    type: Object as () => PlaceOrderRequest,
  },
  packages: {
    type: Object as () => IPackageResponse,
  },
  summary: {
    type: Object as () => SummaryDiscountObject,
  }
})

const order: globalThis.Ref<PlaceOrderRequest | undefined> = ref()
const packages: globalThis.Ref<IPackageResponse | undefined> = ref()
const summary: globalThis.Ref<SummaryDiscountObject | undefined> = ref()

const delivery: globalThis.Ref<SelectOption[]> = ref([]);

const packagePrice: globalThis.Ref<number> = ref(0)
const shipopingCost: globalThis.Ref<number> = ref(0)
const feeCost: globalThis.Ref<number> = ref(0)
const totalPrice: globalThis.Ref<number> = ref(0)
const disPrice: globalThis.Ref<number> = ref(0)
const sumPrice: globalThis.Ref<number> = ref(0)
var paymentMethodText: globalThis.Ref<String> = ref("")

var companyName: globalThis.Ref<String> = ref("")
var deliveryText: globalThis.Ref<String> = ref("")
const paymentMethod: StringArray = {
  qr: 'สแกน QR',
  card: 'บัตรเครดิต/บัตรเดบิต',
  pledge: 'วงเงินมัดจำ'
}
const deliveryTypes: StringArray = {
  ELECTRONIC: 'รับเป็นไฟล์ PDF',
  PAPER: 'พิมพ์ลงกระดาษมัดจำ',
  DELIVERY: 'postal'
}

const onLoad = onMounted(async () => {
  if(props.order){
    order.value = props.order
  }
  if(props.packages){
    packages.value = props.packages
  }
  if(props.summary){
    summary.value = props.summary
  }

  await loadDelivery()
})

const loadDelivery = async () => {
  const response = await useRepository().delivery.channel();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      delivery.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.Type,
          option: x.Cost.toString(),
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
}

const setSummaryText = async () => {
  let tax: string = packages.value?.IsTaxInclude ? '+ ใบกำกับภาษี' : ''
  let indexShipping: string = order.value?.DeliveryMethod1?.DeliveryType ?? ''
  let shippingChanel: string = deliveryTypes[indexShipping] == 'postal' ? 
    delivery.value.find(w => w.value == order.value?.DeliveryMethod1?.DeliveryChannelType)?.value ?? ''
    : deliveryTypes[indexShipping]

  shipopingCost.value = order.value?.DeliveryMethod1?.DeliveryType == 'DELIVERY' ? 50 : 0

  companyName.value = packages.value?.CompanyName ?? ''
  deliveryText.value = `กรมธรรม์ ${tax} • โดย ${shippingChanel}`

  packagePrice.value = packages.value?.Price ?? 0

  feeCost.value = summary.value?.FeeCost ?? 0 //TODO: Why Data Is Undefinded
  totalPrice.value = summary.value?.TotalPrice ?? 0
  disPrice.value = summary.value?.DisPrice ?? 0
  sumPrice.value = summary.value?.SumPrice ?? 0

  let indexPayment = summary.value?.PaymentMethod ?? ''
  paymentMethodText.value = paymentMethod[indexPayment]
}

watch(order, async (newOrder) => {
  await setSummaryText()
})

watch(packages, async (newPackages) => {
  await setSummaryText()
})

watch(summary, async (newSummary) => {
  await setSummaryText()
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
  () => props.packages,
  async () => {
    if (props.packages) {
      packages.value = props.packages
    }
  }
)
watch(
  () => props.summary,
  async () => {
    if (props.summary) {
      summary.value = props.summary
    }
  }
)
</script>