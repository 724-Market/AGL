<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <div class="row">
      <div class="col-lg-7">
        <div class="card payment-card">
          <div class="card-body">
            <PaymentQrFormDetail :payment-info="paymentInfo"></PaymentQrFormDetail>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <PaymentQrMethod></PaymentQrMethod>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>

interface paymentInfoData {
  orderid?: string, 
  amount?: number, 
  payment_expired?: string,
  payment_qr?: string,
  refno1?: string,
}

const paymentInfo = ref<paymentInfoData>({})

paymentInfo.value = {
  orderid: '999xxxx99',
  amount: 1234.56,
  payment_expired: '2024-02-23 20:12:34',
  payment_qr: 'xxxxx',
  refno1: 'xxxxx',
}





/*
import { storeToRefs } from "pinia";
import type { UserResponse } from "~/shared/entities/user-entity";
import type {
  NoticePaymentRequest,
  NoticePaymentData,
  PaymentGatewayResponse,
} from "~/shared/entities/payment-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";

const paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const orderSummary = useStoreOrderSummary();
const { OrderSummaryInfo } = storeToRefs(orderSummary);

const paymentGateway = useStorePaymentGateway();
const { PaymenGatewaytInfo } = storeToRefs(paymentGateway);

// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

const isError = ref(false);
const messageError = ref("");

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    if (PaymenGatewaytInfo.value) {
      paymenGatewaytInfo.value = PaymenGatewaytInfo.value;
      const responseUser = await useRepository().user.GetUser();

      if (responseUser.apiResponse.Status && responseUser.apiResponse.Status == "200") {
        if (responseUser.apiResponse.Data && responseUser.apiResponse.Data.length > 0) {
          const user: UserResponse = responseUser.apiResponse.Data[0];
          let deviceId = await useUtility().getDeviceId()
          const paymentService = await useService().paymentNotice;
          const paymentServiceReq: NoticePaymentRequest = {
            ClientID: "AgentLoveWeb",
            DeviceID: deviceId,
            ReferenceID: PaymenGatewaytInfo.value.refno2,
            UserID: user.ID,
            GroupType: "qr",
            AccessToken: AuthenInfo.value.accessToken,
          };
          await paymentService.connect(paymentServiceReq);
          await paymentService.RequestUpdateTopUpPayment(PaymenGatewaytInfo.value);
          await paymentService.RequestUpdateOrderPayment(PaymenGatewaytInfo.value);
        }
      }
    } else {
      router.push("/history");
    }
  } else {
    router.push("/login");
  }
});
*/

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "ชำระเงินด้วย QR";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "category-payment single-qr",
  },
});
</script>
