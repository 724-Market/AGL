<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col-lg-6">

                <OrderCompulsoryThanksSuccess
                    v-if="status == 'Success'"
                    :payment-get="paymentGetInfo"
                ></OrderCompulsoryThanksSuccess>

                <OrderCompulsoryThanksCancel
                    v-if="status == 'Cancel'"
                    :payment-get="paymentGetInfo"
                ></OrderCompulsoryThanksCancel>

            </div>

            <div class="col-lg-6">
                <OrderCompulsoryThanksContact></OrderCompulsoryThanksContact>
            </div>
        </div>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { isString } from "@vueuse/core";
import { NoticePaymentData, PaymentGetRequest, PaymentGetResponse }  from "~/shared/entities/payment-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";
import { useStorePayment } from "~/stores/order/storePayment";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";

// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

const isError = ref(false);
const messageError = ref("");

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

let values = reactive({})

const paymentGetInfo:globalThis.Ref<PaymentGetResponse | undefined> = ref()
var status = ref("");

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)

const placeorder = useStorePlaceorder()
const information = useStoreInformation()
const orderSummary = useStoreOrderSummary()
const payment = useStorePayment()
const paymentGateway = useStorePaymentGateway()

const paymentGat = useStorePaymentGet()
const { PaymentGetInfo } = storeToRefs(paymentGat)

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    const route = useRoute();
    if(PaymentGetInfo.value) {
        paymentGetInfo.value = PaymentGetInfo.value
        status.value = paymentGetInfo.value.IsSuccess && !paymentGetInfo.value.IsDelete ? 'Success' : 'Cancel'
        //TODO: Clear Store
        await placeorder.clearOrder()
        await information.clearInformation()
        await orderSummary.clearOrderSummary()
        await payment.clearPayment()
        await paymentGateway.clearPaymenGateway()
        await paymentGat.clearPaymentGet()
    } else if(route.query && isString(route.query.PaymentNo)) {
        const PaymentNo: string = route.query.PaymentNo;
        const req: PaymentGetRequest = {
            PaymentNo: PaymentNo,
        };
        const response = await useRepository().payment.get(req);
        if(response.apiResponse.Status &&  response.apiResponse.Status == "200" && response.apiResponse.Data) {
            paymentGetInfo.value = response.apiResponse.Data[0]
            status.value = paymentGetInfo.value.IsSuccess && !paymentGetInfo.value.IsDelete ? 'Success' : 'Cancel'
        }
    } else {
        router.push("/history");
    }
  } else {
    router.push("/login");
  }
})

// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'ผลการทำรายการ'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'page-order category-compulsory single-thanks',
    },
})
</script>