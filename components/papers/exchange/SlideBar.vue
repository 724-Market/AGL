<template>
  <div class="col col-sidebar">
    <section class="site-sidebar is-sticky">
      <aside class="card">
        <div class="card-header">
          <h3 class="card-title">รายการที่เลือก</h3>
          <button type="button" class="btn-gray btn-open-papers" href="#">
            <i class="fa-solid fa-layer-group"></i>คลังกระดาษ
          </button>
        </div>

        <div class="card-body card-table">
          <PapersExchangeSummary
            :exchange-data="$props.exchangeData"
            :match-all-list="$props.matchAllList"
            :payment-fee-limit="$props.paymentFeeLimit"
            :shipping-fee="$props.shippingFee"
            :shipping-method="$props.shippingMethod"
          ></PapersExchangeSummary>
        </div>
        <!-- Component Checklist -->
        <OrderChecklist :list="props.checkList" @change-check-save="handlerCheckSave" />
      </aside>

      <!-- <div class="formkit-outer form-actions" data-type="submit">
        <div class="formkit-wrapper">
          <button
            loading="false"
            class="formkit-input btn btn-primary btn-accept pledge-action"
            type="button"
            name="order-submit"
            id="order-submit"
          >
            ไปต่อ
          </button>
        </div>
      </div> -->
      <button
            loading="false"
            class="formkit-input btn-continue btn btn-primary btn-accept pledge-action"
            type="button"
            name="order-submit"
            id="order-submit"
            :disabled="!checkSave"
          >
            ไปต่อ
          </button>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { IChecklist } from "~/shared/entities/checklist-entity"
import {  ExchangeDataSummary, OrderExchangeCreateReq, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"

const emits = defineEmits(['onSelectMatch'])
const props = defineProps({
	checkList: Array<IChecklist>,
  matchAllList:Array<SearchMatchRes>,
  exchangeData:Array<ExchangeDataSummary>,
  paymentFeeLimit: Array<PaymentFeeLimitRes>,
  shippingMethod:String,
  shippingFee:String

})
const checkSave = ref(false)

const onContinue = async ()=>{
  const request:OrderExchangeCreateReq = usePagePaper().mappingExchangeConfirmRequest() 
  const response =await  usePagePaper().onContinue(request);
}
const handlerCheckSave = (check: boolean) => {
  //checkSave.value = check;
  checkSave.value = true;
};
</script>
<style scoped>
.btn-continue.btn-primary  {
  background-color: #138543 !important;
  border-color: #138543 !important;
  color: #fff !important;
}
.btn-continue.btn:disabled {
  background: var(--fk-color-border) !important;
  color: var(--fk-color-button) !important;
  cursor: not-allowed;
}
</style>
