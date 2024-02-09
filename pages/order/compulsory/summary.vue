<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <FormKit
      type="form"
      @submit="submitOrder"
      :actions="false"
      id="form-summary"
      form-class="form-order form-theme"
      v-model="values"
      :incomplete-message="false"
    >
      <div class="row">
        <div class="col-lg-7">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">สรุปข้อมูลประกันภัย</h3>
            </div>

            <div class="card-body">
              <div class="notice-warning">
                <i class="fa-regular fa-circle-info"></i> ข้อมูลมีผลต่อความคุ้มครอง
                กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนชำระเงิน <br /><b
                  ><u>ไม่รับคืนเงินทั้งสิ้น ทุกกรณี</u></b
                >
              </div>
            </div>

            <OrderCompulsorySummaryInsureDetail
              :order-detail="orderDetail"
              v-if="orderDetail"
            ></OrderCompulsorySummaryInsureDetail>
          </div>
        </div>

        <div class="col-lg-5">
          <aside class="card">
            <div class="card-body" v-if="paymentDetail && orderDetail">
              <OrderCompulsorySummaryPurchaseDetail
                :payment="paymentDetail"
                :order-no="orderDetail.OrderNo"
                :create-date="orderDetail.OrderDate"
                :credit-balance="creditBalance"
              ></OrderCompulsorySummaryPurchaseDetail>
              <OrderCompulsorySummaryPaymentStatus
                :payment="paymentDetail"
                :options="optionDetail"
                @open-wallet="handlerOpenWallet"
              ></OrderCompulsorySummaryPaymentStatus>
            </div>

            <div class="card-footer">
              <div class="form-hide-label">
                <FormKit
                  type="checkbox"
                  value="pdpa"
                  name="PDPA"
                  label="ยอมรับเงื่อนไขความคุ้มครองและข้อยกเว้นการทำประกัน และรับทราบนโยบายคุ้มครองข้อมูลส่วนบุคคล"
                  validation="required"
                  :validation-messages="{ required: 'กรุณาคลิกยอมรับเงื่อนไขและนโยบายฯ' }"
                  v-model="isConsent"
                />
              </div>
            </div>
          </aside>
          <FormKit
            type="submit"
            label="ยืนยันการชำระ"
            name="order-submit"
            id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }"
            :disabled="!isConsent"
            :loading="isLoading"
          />
          <!-- validatePaymment() -->
          <!-- :to="'placeorder?orderNo=' + orderDetail.OrderNo" -->
          <NuxtLink v-if="orderDetail" to="payment" class="btn btn-back"
            >ย้อนกลับ</NuxtLink
          >
        </div>
      </div>
    </FormKit>
    <PaymentWalletModalWallet
    v-if="showWallet"
      :show="showWallet"
      @close-wallet="handleCloseWallet"
      @topup-confirm="handleTopupConfirm"
      :wallet-payment-gateway="walletPaymentGateway"
      :credit-order="paymentConfirm"
    ></PaymentWalletModalWallet>
    <PaymentWalletModalWarningWallet
      :show="showWarningWallet"
      @close-warning="handleCloseWarning"
    ></PaymentWalletModalWarningWallet>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
    <ElementsModalAlert v-if="isError" :is-error="isError" :message="messageError" :reload="true" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
// using pinia
import { isString } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { IInformation } from "~/shared/entities/information-entity";
import type {
  OptionsResponse,
  OrderDetailRequest,
  OrderDetails,
  OrderResponse,
  PaymentDetails,
} from "~/shared/entities/order-entity";
import type {
  PaymentConfirmRequest,
  PaymentGatewayRequest,
  PaymentGatewayResponse,
  PaymentGetRequest,
} from "~/shared/entities/payment-entity";
import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import type {
  CreditBalanceResponse,
  CreditHistoryPaymentAdd,
  CreditOrderPaymentCreateRequest,
  CreditOrderPaymentCreateResponse,
  PaymentFeeLimitRequest,
  PaymentFeeLimitResponse,
} from "~/shared/entities/pledge-entity";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";
import { useStoreFeeLimit } from "~/stores/plege/storeFeeLimit";
//import { defineEventHandler } from "~/server/api/setting.post";
import settingData from "~/shared/data/setting-data";
import type { IPackageRequest, IPackageResponse, Paging } from "~/shared/entities/packageList-entity";

//define store
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const store = useStoreOrderSummary();
// define getter in store
const { OrderSummaryInfo } = storeToRefs(store);

const infomation = useStoreInformation();

const storePackage = useStorePackage(); 

const placeorder = useStorePlaceorder();
const { OrderInfo } = storeToRefs(placeorder);

const paymentGat = useStorePaymentGet();

const paymentGateway = useStorePaymentGateway();

const paymentFeeLimmit = useStoreFeeLimit();

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);
// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const paging: globalThis.Ref<Paging> = ref({
  Length: 5,
  Page: 1,
  TotalRecord: 0,
  RedirectUrl: "/order/compulsory/packages",
});

const d = new Date();
const getMonth = d.getMonth() + 1;
const EffectiveDate = `${d.getFullYear()}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
  d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
}`;
const ExpireDate = `${d.getFullYear() + 1}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
  d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
}`;

const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const optionDetail: globalThis.Ref<OptionsResponse | undefined> = ref();
const creditPaymenyAddList: globalThis.Ref<CreditHistoryPaymentAdd | undefined> = ref();
const walletPaymentGateway: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();
const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref();
const paymentFeeLimmitInfo: globalThis.Ref<PaymentFeeLimitResponse[]> = ref([]);
const paymentConfirm: globalThis.Ref<CreditOrderPaymentCreateResponse | undefined> = ref();
const isConsent = ref();
const validatePayment = ref(false);
const showWallet = ref(false);
const showWarningWallet = ref(false);
const isError = ref(false);
const messageError = ref("");
const setOrderNo = useStoreOrderNo();

let values = reactive({});

const validatePaymment = ():boolean=>{
  validatePayment.value = false
  if(isConsent)
  {
    if(paymentDetail.value && paymentDetail.value.PaymentType=="PLEDGE")
    {
      if(creditBalance.value && creditBalance.value.AvailableBalance<paymentDetail.value.OrderAmount){
        validatePayment.value = true
      }
    }
  }
  else validatePayment.value = true

  return validatePayment.value
}

// watch(isConsent, async (newConsent) => {
//   await validatePaymment();
// });

const loadOrderSummary = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };
  const response = await useRepository().order.summary(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      // save to store
      const data = response.apiResponse.Data[0];
      if (data.Order != undefined) {
        data.Order.OrderNo = orderNo;
      }
      store.setOrderSummary(data);
      console.log("Before")
      await useUtility().setStoretoStep(data, orderNo, orderDetail.value as OrderDetails)
      console.log("After")
      // setStoretoStep(data, orderNo);
    }
  }
};
const loadOrderDetail = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };

  const response = await useRepository().order.details(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      orderDetail.value = response.apiResponse.Data[0].OrderDetails;
      paymentDetail.value = response.apiResponse.Data[0].PaymentDetails;
      optionDetail.value = response.apiResponse.Options as OptionsResponse;
      //console.log('Data',response.apiResponse.Data[0])
      //console.log('Options',response.apiResponse.Options)
    } else {
      // data not found
    }
  } else {
  }
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
      return creditBalance.value
    } else {
      // data not found
    }
  } else {
  }
};
const loadPledgeFeeLimit = async () => {
  const req: PaymentFeeLimitRequest = {
    PaymentType: "BILL_PAYMENT",
  };
  const response = await paymentFeeLimmit.getFeeLimit(req);
  if (response.Status && response.Status == "200") {
    if (response.Data) {
      paymentFeeLimmitInfo.value = response.Data;
      return paymentFeeLimmitInfo.value
    } else {
      // data not found
    }
  } else {
  }
};
const onLoad = onMounted(async () => {
  const route = useRoute();
  console.log(setOrderNo.value);
  if(setOrderNo.value != ''){
    OrderInfo.value.OrderNo = setOrderNo.value;
  }
  if (OrderInfo.value && OrderInfo.value.OrderNo) {
    const OrderNo: string = OrderInfo.value.OrderNo;

    isLoading.value = true;
    //TODO testing implement order detail
    await loadOrderDetail(OrderNo); //AMC2307000036
    await loadOrderSummary(OrderNo);
    // set Payment List History Credit for wallet
    if (paymentDetail.value && paymentDetail.value.PaymentType == "PLEDGE") {
      isLoading.value = true;
      Promise.all([
        //loadPledgeHistoryPaymentAddList(),
        loadPledgeCreditBalance(),
        loadPledgeFeeLimit(),
      ]).then((values) => {
        console.log(values);
        isLoading.value = false;
      });
    }

    isLoading.value = false;
  } else {
    const router = useRouter();
    router.push("/order/compulsory/payment");
  }
});

// Submit form event
const submitOrder = async (formData: any) => {
  isLoading.value = true;
  // Add waiting time for debug
  const req: PaymentConfirmRequest = {
    IsConsent: isConsent.value,
    OrderNo: orderDetail.value?.OrderNo ?? "",
  };

  const response = await useRepository().payment.confirm(req);
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    isLoading.value = false;

    const router = useRouter();

    let paymentConfirmRes = response.apiResponse.Data[0];
    let paymentType: string = paymentConfirmRes?.PaymentType.toLowerCase() ?? "";

    if (paymentType == "bill_payment" || paymentType == "credit_card") {
      //TODO: Check type And Pass param for type
      const config = useRuntimeConfig();
      let reqGateway: PaymentGatewayRequest;
      if (paymentType == "bill_payment") {
        reqGateway = {
          payment_type: paymentType,
          endpoint_code: "insurance_payment",
          orderid: paymentConfirmRes?.OrderNo ?? "",
          refno: paymentConfirmRes?.PaymentNo ?? "",
          expire_type: settingData.paymentGateWayExpireType,
          expire_value: settingData.paymentGateWayExpireValue,
          amount: paymentConfirmRes?.GrandAmount ?? 0,
        };
      } else {
        reqGateway = {
          payment_type: paymentType,
          endpoint_code: "insurance_payment",
          orderid: paymentConfirmRes?.OrderNo ?? "",
          refno: paymentConfirmRes?.PaymentNo ?? "",
          amount: paymentConfirmRes?.GrandAmount ?? 0,
          response_url: `${config.public.BaseUrlWeb}/order/compulsory/thanks?PaymentNo=${paymentConfirmRes?.PaymentNo}`,
        };
      }

      // const reqGateway: PaymentGatewayRequest = {
      //   payment_type: paymentType,
      //   endpoint_code: "insurance_payment",
      //   orderid: paymentConfirmRes?.OrderNo ?? "",
      //   refno: paymentConfirmRes?.PaymentNo ?? "",
      //   amount: paymentConfirmRes?.GrandAmount ?? 0,
      // };

      const responseGateway = await useRepository().payment.gateway(reqGateway);
      if (responseGateway.status == "0000") {
        let gatewayInfo = responseGateway.data as PaymentGatewayResponse;
        await paymentGateway.setPaymenGateway(gatewayInfo);
        if (gatewayInfo.payment_type == "bill_payment") {
          router.push("/payment/qr");
        } else {
          window.open(paymentGateway.payment_url, "_blank");
          router.push("/payment/waitpayment");
        }
      } else {
        if (responseGateway.message) {
          messageError.value = responseGateway.message;
          isError.value = true;
        }
      }
    } else {
      const req: PaymentGetRequest = {
        PaymentNo: paymentConfirmRes.PaymentNo,
      };
      const responsePaymentGet = await useRepository().payment.get(req);
      if (
        responsePaymentGet.apiResponse.Status &&
        responsePaymentGet.apiResponse.Status == "200" &&
        responsePaymentGet.apiResponse.Data
      ) {
        await paymentGat.setPaymentGet(responsePaymentGet.apiResponse.Data[0]);
        router.push("/order/compulsory/thanks");
      } else {
        if (responsePaymentGet.apiResponse.Message) {
          messageError.value = responsePaymentGet.apiResponse.Message;
          isError.value = true;
        }
      }
    }
  } else {
    if (response.apiResponse.ErrorMessage) {
      messageError.value = response.apiResponse.ErrorMessage;
      isError.value = true;
    }

    //showWarningWallet.value = true
  }
  isLoading.value = false;
};

const handlerOpenWallet = (open: boolean) => {
  console.log("handlerOpenWallet", open);
  showWallet.value = false;
  showWallet.value = open;
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
const handleCloseWallet = async (status: boolean, refresh: boolean) => {
  if (refresh) {
    isLoading.value = true;
    await loadPledgeCreditBalance();
    isLoading.value = false;
  }
  showWallet.value = false;
};
const handleCloseWarning = async () => {
  //window.location.reload();
  if (OrderInfo.value.OrderNo) {
    const router = useRouter();
    router.push("/order/compulsory/summary/");
  }
};
// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = true;
const showPageHeader = true;

// Define page meta
const pageTitle = "สรุปรายการ";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "Compulsory สรุปข้อมูล";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-summary",
  },
});
</script>
