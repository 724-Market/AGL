<template>

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

      <button
        loading="false"
        class="formkit-input btn-continue btn btn-primary btn-accept pledge-action"
        type="button"
        name="order-submit"
        id="order-submit"
        :disabled="!checkSave"
        @click="onContinue"
      >
        ไปต่อ
      </button>
      <ElementsDialogModal
        :modal-show="isError"
        :modal-text="messageError"
        :modal-title="'แจ้งเตือน'"
        :modal-type="'danger'"
        @on-continue="handlerError"
      ></ElementsDialogModal>
    </section>

</template>

<script lang="ts" setup>
import { IChecklist } from "~/shared/entities/checklist-entity"
import { ErrorCodeRes } from "~/shared/entities/error-entity";
import {  CalculateGrandTotal, DeliveryAddressReq, ExchangeDataSummary, OrderExchangeCreateReq, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"
import { useStoreSearchMatchCompulsory } from "~/stores/paper/storeSearchMatchCompulsory";

const messageError = ref('')
const isError = ref(false)
const storeSearchMatchCompulsory = useStoreSearchMatchCompulsory();
const errorRes:globalThis.Ref<ErrorCodeRes | undefined> = ref()
const cal:globalThis.Ref<CalculateGrandTotal|undefined> = ref()
const isLoading = ref(false)
const emits = defineEmits(['onSelectMatch','onHandleError','onLoading'])
const props = defineProps({
	checkList: Array<IChecklist>,
  matchAllList:Array<SearchMatchRes>,
  exchangeData:Array<ExchangeDataSummary>,
  paymentFeeLimit: Array<PaymentFeeLimitRes>,
  shippingMethod:String,
  shippingFee:String,
  deliveryType:String,
  addrAgent:Object as ()=>DeliveryAddressReq

})
const checkSave = ref(false)

const onContinue = async ()=>{
  emits('onLoading',true)
  if(props.exchangeData)
  {
    cal.value = await usePagePaper().calculateGrandTotal(props.exchangeData,props.paymentFeeLimit ?? [],props.shippingMethod ?? "",parseInt(props.shippingFee!='' ? props.shippingFee ?? "0": "0"))
  }

  messageError.value="";
  isError.value=false;
  if(cal.value && cal.value.AvailableBalanceCredit>=cal.value.GrandAmount)
  {
    const request:OrderExchangeCreateReq = usePagePaper().mappingExchangeConfirmRequest(props.deliveryType ?? "",props.shippingMethod ?? "",props.addrAgent)
    const response =await  usePagePaper().onContinue(request);
    if(response.Status=='200')
    {
      emits('onLoading',false)
      await storeSearchMatchCompulsory.clearSearchMatch();
      await usePagePaper().onClearExchangePaper();
      const router = useRouter();
      // Check if response.Data exists and is an array with at least one element
      if (response.Data && Array.isArray(response.Data) && response.Data.length > 0) {
        const orderNo = response.Data[0].OrderNo; 
        console.log("OrderNo: " + response.Data[0].OrderNo);
        router.push({ path: "/papers/thanks", query: { orderNo } });
      } else {
        console.log("No OrderNo available in the response");
      }
    }
    else{
      errorRes.value = useMapData().mappingMessageError(response.ErrorCode ?? "",response.ErrorMessage ?? "")
      messageError.value = errorRes.value.MessageResponse
      isError.value = true
    }
  }
  else{
      messageError.value = "ยอดเงินของคุณไม่เพียงพอ";
      isError.value = true
  }
  emits('onLoading',false)
}
const handlerError = ()=>{
if(errorRes.value){
  if(errorRes.value.option=="OUT_OF_STOCK"){
    emits('onHandleError')
  }
}
}
const handlerCheckSave = (check: boolean) => {
  checkSave.value = check;
  //checkSave.value = true;
};
</script>
<style scoped>
.btn-continue.btn-primary {
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
