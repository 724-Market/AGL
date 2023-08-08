<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <ElementsModalLoading :loading="true"></ElementsModalLoading>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { UserResponse } from "~/shared/entities/user-entity";
import {
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

</script>