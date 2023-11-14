<template>
  <div class="summary-table">
    <table class="table no-striped">
      <thead>
        <tr>
          <th scope="col">รายการกระดาษ</th>
          <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
        </tr>
      </thead>
      <tbody v-if="list && list.length > 0">
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="product" v-for="(item, i) in list" :key="i">
          <th scope="row">
            {{ i + 1 }}. {{ item.MatchItem.ProductName
            }}<span>พ.ร.บ. • {{ item.MatchItem.CompanyName }}</span><a class="btn-delete" @click="onDelete(item)"
              title="ลบรายการนี้"><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a>
          </th>
          <td class="text-end price">
            {{ useUtility().getCurrency(item.MatchItem.ProductPrice * item.Item.Amount, 0) }}

            <FormKit type="stepNumber" label="ราคามัดจำ"
              :validation="`required|between:1,${item.MatchItem.ProductOnHandAmount}`" validation-label="Number"
              v-model="item.Item.Amount" min="1" :max="item.MatchItem.ProductOnHandAmount" step="1"
              :validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }" readonly @input-raw="onChangeAmount(item)" />
          </td>
        </tr>

        <tr class="shipping" v-if="cal && cal.ShippingFee > 0">
          <th scope="row">
            ค่าจัดส่ง<span>{{ cal.ShippingMethod }}</span>
          </th>
          <td class="text-end price">
            {{ cal.ShippingFee > 0 ? useUtility().getCurrency(cal.ShippingFee, 2) : "" }}
          </td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="subtotal" v-if="cal">
          <th scope="row">รวมราคามัดจำ</th>
          <td class="text-end price">
            {{ useUtility().getCurrency(cal.OrderAmount, 2) }}
          </td>
        </tr>
        <tr class="discount"
          v-if="cal && cal.PaymentFeeLimit > 0 && cal.OrderAmount >= cal.PaymentFeeLimit && cal.ShippingFee > 0">
          <th scope="row">
            หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน
              {{ useUtility().getCurrency(cal.PaymentFeeLimit, 0) }} บาท</span>
          </th>
          <td class="text-end price">{{ useUtility().getCurrency(cal.Discount, 0) }}</td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="2"><span class="empty-cart">คุณยังไม่ได้เลือกกระดาษ</span></td>
        </tr>
      </tbody>
      <tfoot>
        <tr v-if="cal">
          <td scope="col">รวมยอดมัดจำที่ต้องใช้</td>
          <td scope="col" class="text-end price">
            {{ useUtility().getCurrency(cal.GrandAmount, 2) }}
          </td>
        </tr>
        <tr v-if="cal">
          <td scope="col">เงินมัดจำคงเหลือ</td>
          <td scope="col" class="text-end price">
            {{ useUtility().getCurrency(cal.AvailableBalanceCredit, 2) }}
          </td>
        </tr>
      </tfoot>
    </table>
    <ElementsDialogConfirm v-if="isDeleteConfirm" :modal-show="isDeleteConfirm" :modal-type="ModalType.Danger"
      :modal-title="'ยืนยันการลบรายการ'" :modal-text="textDeleteConfirm" @on-confirm-modal="onDeleteConfirm"
      @on-close-modal="onCloseConfirm" />
  </div>
</template>
<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity";
import { CalculateGrandTotal, ExchangeDataSummary, PaymentFeeLimitRes } from "~/shared/entities/paper-entity";

import { SearchMatchRes } from "~/shared/entities/paper-entity";
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo";

const isDeleteConfirm = ref(false)
const textDeleteConfirm = ref('')
const itemSelection: globalThis.Ref<ExchangeDataSummary | undefined> = ref()
const list: globalThis.Ref<ExchangeDataSummary[]> = ref([])
const cal: globalThis.Ref<CalculateGrandTotal | undefined> = ref()
const storeExchange = useStoreExchangeDataInfo();
const props = defineProps({
  matchAllList: Array<SearchMatchRes>,
  exchangeData: Array<ExchangeDataSummary>,
  paymentFeeLimit: Array<PaymentFeeLimitRes>,
  shippingMethod: String,
  shippingFee: String

})

const onCalculate = () => {
  // if(list.value.length>0)
  // {
  cal.value = usePagePaper().calculateGrandTotal(list.value, props.paymentFeeLimit ?? [], props.shippingMethod ?? "", (props.shippingFee ?? "0") != '' ? parseInt(props.shippingFee ?? "0") : 0)
  //}
}
const onChangeAmount = async (item: ExchangeDataSummary) => {

  await usePagePaper().onChangeExchangePaper(item);
  if (list.value && props.paymentFeeLimit && props.shippingMethod && props.shippingFee)
    cal.value = usePagePaper().calculateGrandTotal(list.value, props.paymentFeeLimit, props.shippingMethod, (props.shippingFee ?? "0") != '' ? parseInt(props.shippingFee ?? "0") : 0)

}
const onDelete = async (item: ExchangeDataSummary) => {
  itemSelection.value = item
  isDeleteConfirm.value = true
  textDeleteConfirm.value = `คุณต้องการลบรายการ ${item.MatchItem.ProductName} จำนวนกระดาษ ${item.Item.Amount} หรือไม่ ?`
}
const onDeleteConfirm = async () => {
  if (itemSelection.value) {
    const exchangeData = await usePagePaper().onDeleteConfirm(itemSelection.value)
    list.value = exchangeData
    onCalculate()
  }

}
const onCloseConfirm = async () => {
  isDeleteConfirm.value = false
}
const onLoadExchangetoStore = () => {
  list.value = []
  list.value = storeExchange.$state;

};
watch(() => props.exchangeData, () => {
  onLoadExchangetoStore()
  onCalculate()

},
  { deep: true })

watch(() => props.paymentFeeLimit, () => {
  onCalculate()
}, { deep: true })
watch(() => props.shippingMethod, () => {
  onCalculate()
})
watch(() => props.shippingFee, () => {
  onCalculate()
})
</script>
