<template>
  <div class="card-shortcut" :class="{ 'is-danger': remaining <= 0, 'is-success': remaining > 0 }">
    <div class="shortcut-wrapper">
      <div class="shortcut-figure">
        <figure class="figure">
          <i class="fa-duotone fa-wallet"></i>
        </figure>
      </div>
      <div class="shortcut-info">
        <h5 class="topic">เงินมัดจำที่ใช้ได้ <small>(บาท)</small></h5>
        <span class="value">{{ useUtility().getCurrency(remaining, 2) }}</span>
      </div>
      <div class="shortcut-action">
        <button type="button" class="btn-secondary btn-open-wallet" @click="handlerOpenWallet(true)">
          <i class="fa-solid fa-wallet"></i>เติมเงิน</button>
      </div>
    </div>
  </div>

  <PaymentWalletModalWallet v-if="showWallet" :show="showWallet" @on-close-wallet="handleCloseWallet"
    @topup-confirm="handleTopupConfirm" :wallet-payment-gateway="walletPaymentGateway" :credit-order="paymentConfirm">
  </PaymentWalletModalWallet>
</template>

<script setup lang="ts">
//import { defineEventHandler } from "~/server/api/setting.post";
import settingData from "~/shared/data/setting-data";
import type {
  CreditBalanceResponse,
  CreditHistoryPaymentAdd,
  CreditOrderPaymentCreateRequest,
  CreditOrderPaymentCreateResponse
} from "~/shared/entities/pledge-entity";
import type {
  PaymentGatewayRequest,
  PaymentGatewayResponse
} from "~/shared/entities/payment-entity";
import { useStoreCreditBalance } from "~/stores/plege/storeCreditBalance";
import { storeToRefs } from "pinia";

const creditPaymenyAddList: globalThis.Ref<CreditHistoryPaymentAdd | undefined> = ref();
const walletPaymentGateway: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();
const paymentConfirm: globalThis.Ref<CreditOrderPaymentCreateResponse | undefined> = ref();
const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref();

const isLoading = ref(false);
const isError = ref(false);
const messageError = ref("");

var remaining = ref(0)
const showWallet = ref(false);

//define store
const storeCredit = useStoreCreditBalance()


const onLoad = onMounted(async () => {
  //Hidden to implement pledge 
  //await loadPledgeCreditBalance()
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
    paymentConfirm.value = response.apiResponse.Data[0];

    const reqGateway: PaymentGatewayRequest = {
      payment_type: "bill_payment",
      endpoint_code: "credit_payment",
      orderid: paymentConfirm.value.CreditOrderNo,
      refno: paymentConfirm.value.CreditPaymentNo,
      expire_type: settingData.paymentGateWayExpireType,
      expire_value: settingData.paymentGateWayExpireValue,
      amount: paymentConfirm.value.OrderAmount,
    };

    const responseGateway = await useRepository().payment.gateway(reqGateway);
    if (responseGateway.status == "0000") {
      // console.log("Wallet responseGateway", responseGateway);
      let gatewayInfo = responseGateway.data as PaymentGatewayResponse;
      walletPaymentGateway.value = gatewayInfo;
    }
    else {
      isError.value = true
      messageError.value = responseGateway.message ?? ""
    }
  }
  else {
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
      storeCredit.setCreditBalance(response.apiResponse.Data[0])
      return creditBalance.value
    } else {
      // data not found
    }
  } else {
  }
};
</script>