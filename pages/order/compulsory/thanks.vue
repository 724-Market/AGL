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
import { NoticePaymentData, PaymentGetResponse }  from "~/shared/entities/payment-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";

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

const paymentGat = useStorePaymentGet()
const { PaymentGetInfo } = storeToRefs(paymentGat)

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    if(PaymentGetInfo.value) {
        paymentGetInfo.value = PaymentGetInfo.value
        status.value = paymentGetInfo.value.IsSuccess && !paymentGetInfo.value.IsDelete ? 'Success' : 'Cancel'
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