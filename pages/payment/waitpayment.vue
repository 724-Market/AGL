<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory">

        <div class="row">
            <div class="col-12">
                <div class="loading-card">
                    <div class="loading-icon">
                        <div class="logo"></div>
                    </div>
                    <div class="loading-loader"><span class="loading-bar"><span class="loading-progress"></span></span>
                    </div>
                    <div class="loading-text">กรุณารอสักครู่</div>
                </div>
            </div>
            <div class="col-12 d-flex justify-content-center">
                <button type="button" v-if="isCheck" class="btn btn-outline-primary" @click="checkPayment">
                    Check
                </button>
            </div>
        </div>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { UserResponse } from "~/shared/entities/user-entity";
import {
  NoticePaymentRequest,
  NoticePaymentData,
  PaymentGatewayResponse,
  PaymentGetRequest,
} from "~/shared/entities/payment-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";

const paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref();
var isCheck = ref(false);

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const orderSummary = useStoreOrderSummary();
const { OrderSummaryInfo } = storeToRefs(orderSummary);

const paymentGateway = useStorePaymentGateway();
const { PaymenGatewaytInfo } = storeToRefs(paymentGateway);

const paymentGat = useStorePaymentGet();

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
    setTimeout(() => {
        isCheck.value = true;
    }, 10000);

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
                    ReferenceID: PaymenGatewaytInfo.value.refno1,
                    UserID: user.ID,
                    GroupType: "wait",
                    AccessToken: AuthenInfo.value.accessToken,
                };
                await paymentService.connect(paymentServiceReq);
                await paymentService.RequestUpdateOrderPayment(PaymenGatewaytInfo.value);
            }
        }
    } else {
        router.push("/history");
    }
});

const checkPayment = async () => {
    const router = useRouter();
    const req: PaymentGetRequest = {
      PaymentNo: paymenGatewaytInfo.value?.refno2 ?? "",
    };
    const response = await useRepository().payment.get(req);
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      await paymentGat.setPaymentGet(response.apiResponse.Data[0]);
      router.push("/order/compulsory/thanks");
    }
};

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = true;
const showPageHeader = true;

// Define page meta
const pageTitle = "รอชำระเงิน";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "Compulsory รอชำระเงิน";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-summary",
  },
});

</script>