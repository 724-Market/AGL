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

      <div class="formkit-outer form-actions" data-type="submit">
        <div class="formkit-wrapper">
          <button
            loading="false"
            class="formkit-input btn-primary"
            type="button"
            name="order-submit"
            id="order-submit"
          >
            ไปต่อ
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { IChecklist } from "~/shared/entities/checklist-entity"
import {  ExchangeDataSummary, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"

const emits = defineEmits(['onSelectMatch'])
const props = defineProps({
	checkList: Array<IChecklist>,
  matchAllList:Array<SearchMatchRes>,
  exchangeData:Array<ExchangeDataSummary>,
  paymentFeeLimit: Array<PaymentFeeLimitRes>,
  shippingMethod:String,
  shippingFee:String

})

const handlerCheckSave = (check: boolean) => {
  //checkSave.value = check;
};
</script>
