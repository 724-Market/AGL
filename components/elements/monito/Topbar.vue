<template>
    <!-- <div class="col">
        <div class="available">Topbar area</div>
    </div> -->
    <div class="col d-flex justify-content-end">
        <div class="mt-4">
            <h3>
              ยอดเงินคงเหลือ 
              <span :class="{ 'text-danger' : remaining <= 0, 'text-success' : remaining > 0 }">{{useUtility().getCurrency(remaining,2)}}</span> 
              บาท
            </h3>
        </div>
        <div class="m-2">
            <button class="btn btn-primary" @click="handlerOpenWallet(true)">เติมเงิน</button>
        </div>
    </div>
    
    <div class="container">
      <PaymentWalletModalWallet
          v-if="showWallet"
          :show="showWallet"
          @close-wallet="handleCloseWallet"
          @topup-confirm="handleTopupConfirm"
          :wallet-payment-gateway="walletPaymentGateway"
      ></PaymentWalletModalWallet>
    </div>
    

    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<script setup lang="ts">
import { defineEventHandler } from "~/server/api/setting.post";
import {
    CreditBalanceResponse,
    CreditHistoryPaymentAdd,
    CreditOrderPaymentCreateRequest
} from "~/shared/entities/pledge-entity";
import {
    PaymentGatewayRequest,
    PaymentGatewayResponse
} from "~/shared/entities/payment-entity";

const creditPaymenyAddList: globalThis.Ref<CreditHistoryPaymentAdd | undefined> = ref();
const walletPaymentGateway: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();
const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref();

const isLoading = ref(false);
const isError = ref(false);
const messageError = ref("");

var remaining = ref(0)
const showWallet = ref(false);

const onLoad = onMounted(async () => {
  await loadPledgeCreditBalance()
});

const handlerOpenWallet = (open: boolean) => {
  showWallet.value = false;
  showWallet.value = open;
};

const handleCloseWallet = async (status: boolean, refresh: boolean) => {
  if (refresh) {
    isLoading.value = true;
    await loadPledgeCreditBalance();
    isLoading.value = false;
  }
  showWallet.value = false;
};

const handleTopupConfirm = async (
  isConsent: boolean,
  Amount: number,
  paymentType: string
) => {
  isLoading.value = true;
  console.log(isConsent, Amount, paymentType);
  const req: CreditOrderPaymentCreateRequest = {
    Amount: Amount,
    IsConsent: isConsent,
    PaymentType: "BILL_PAYMENT",
  };
  const response = await useRepository().pledge.creditorderPaymentCreate(req);
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    let paymentConfirmRes = response.apiResponse.Data[0];

    const reqGateway: PaymentGatewayRequest = {
      payment_type: "bill_payment",
      endpoint_code: "credit_payment",
      orderid: paymentConfirmRes.CreditOrderNo,
      refno: paymentConfirmRes.CreditPaymentNo,
      expire_type: defineEventHandler.paymentGateWayExpireType,
      expire_value: defineEventHandler.paymentGateWayExpireValue,
      amount: paymentConfirmRes.OrderAmount,
    };

    const responseGateway = await useRepository().payment.gateway(reqGateway);
    if (responseGateway.status == "0000") {
      console.log("Wallet responseGateway", responseGateway);
      let gatewayInfo = responseGateway.data as PaymentGatewayResponse;
      walletPaymentGateway.value = gatewayInfo;
    }
   else{
    isError.value = true
    messageError.value = responseGateway.message ?? ""
   }
  }
  else{
    isError.value = true
    messageError.value = response.apiResponse.Message ?? ""
  }
  isLoading.value = false;
};

const loadPledgeHistoryPaymentAddList = async () => {
  const response = await useRepository().pledge.creditHistoryPaymentAddList();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      creditPaymenyAddList.value = response.apiResponse.Data;
      return creditPaymenyAddList.value
    } else {
      // data not found
    }
  } else {
  }
};

const loadPledgeCreditBalance = async () => {
  const response = await useRepository().pledge.creditBalance();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      creditBalance.value = response.apiResponse.Data[0];
      remaining.value = creditBalance.value.AvailableBalance
      return creditBalance.value
    } else {
      // data not found
    }
  } else {
  }
};
</script>