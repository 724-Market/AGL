<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col-lg-6">
        <OrderCompulsoryThanksSuccess v-if="paymentGetInfo && status == 'Success'" :payment-get="paymentGetInfo" :order-get="orderGetInfo">
        </OrderCompulsoryThanksSuccess>

        <OrderCompulsoryThanksCancel v-if="paymentGetInfo && status == 'Cancel'" :payment-get="paymentGetInfo">
        </OrderCompulsoryThanksCancel>
      </div>

      <div class="col-lg-6">
        <OrderCompulsoryThanksContact v-if="status != ''"></OrderCompulsoryThanksContact>
      </div>
    </div>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { isString } from "@vueuse/core";
import type {
  NoticePaymentData,
  PaymentGetRequest,
  PaymentGetResponse,
} from "~/shared/entities/payment-entity";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";
import { useStorePayment } from "~/stores/order/storePayments";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";

// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

const isError = ref(false);
const messageError = ref("");

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

let values = reactive({});

const paymentGetInfo: globalThis.Ref<PaymentGetResponse | undefined> = ref();
const orderGetInfo = ref();
var status = ref("");

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const placeorder = useStorePlaceorder();
const information = useStoreInformation();
const packages = useStorePackage();
const packageList = useStorePackageList();
const orderSummary = useStoreOrderSummary();
const { OrderSummaryInfo } = storeToRefs(orderSummary);
const payment = useStorePayment();
const paymentGateway = useStorePaymentGateway();

const paymentGat = useStorePaymentGet();
const { PaymentGetInfo } = storeToRefs(paymentGat);

const state = useStoreStateOrder()

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    isLoading.value = true;
    if (!OrderSummaryInfo.value) {
      router.push("/order");
    }
    const route = useRoute();
    if (PaymentGetInfo.value && PaymentGetInfo.value.PaymentNo != "") {
      // paymentGetInfo.value = PaymentGetInfo.value //TODO: Pass by referrence data be lost
      paymentGetInfo.value = {
        ID: PaymentGetInfo.value.ID,
        OwnerID: PaymentGetInfo.value.OwnerID,
        UserID: PaymentGetInfo.value.UserID,
        PaymentNo: PaymentGetInfo.value.PaymentNo,
        PaymentType: PaymentGetInfo.value.PaymentType,
        DiscountType: PaymentGetInfo.value.DiscountType,
        CouponCode: PaymentGetInfo.value.CouponCode,
        NumCredit: PaymentGetInfo.value.NumCredit,
        Status: PaymentGetInfo.value.Status,
        LogMessage: PaymentGetInfo.value.LogMessage,
        TransferFileID: PaymentGetInfo.value.TransferFileID,
        TransferBankCode: PaymentGetInfo.value.TransferBankCode,
        TransferDate: PaymentGetInfo.value.TransferDate,
        DeliveryAmount: PaymentGetInfo.value.DeliveryAmount,
        FeeAmount: PaymentGetInfo.value.FeeAmount,
        DiscountAmount: PaymentGetInfo.value.DiscountAmount,
        PaperAmount: PaymentGetInfo.value.PaperAmount,
        CreditAmount: PaymentGetInfo.value.CreditAmount,
        OrderAmount: PaymentGetInfo.value.OrderAmount,
        GrandAmount: PaymentGetInfo.value.GrandAmount,
        IsTransfer: PaymentGetInfo.value.IsTransfer,
        IsConsent: PaymentGetInfo.value.IsConsent,
        IsCallback: PaymentGetInfo.value.IsCallback,
        IsSuccess: PaymentGetInfo.value.IsSuccess,
        IsCancel: PaymentGetInfo.value.IsCancel,
        IsPending: PaymentGetInfo.value.IsPending,
        IsDelete: PaymentGetInfo.value.IsDelete,
        PaymentDate: PaymentGetInfo.value.PaymentDate,
        PaymentUser: PaymentGetInfo.value.PaymentUser,
        CancelDate: PaymentGetInfo.value.CancelDate,
        CancelUser: PaymentGetInfo.value.CancelUser,
        CreateDate: PaymentGetInfo.value.CreateDate,
        CreateUser: PaymentGetInfo.value.CreateUser,
        UpdateDate: PaymentGetInfo.value.UpdateDate,
        UpdateUser: PaymentGetInfo.value.UpdateUser
      }
      console.log("paymentGetInfo.value", paymentGetInfo.value);
      status.value =
        paymentGetInfo.value.IsSuccess && !paymentGetInfo.value.IsDelete
          ? "Success"
          : "Cancel";
      if (status.value == "Success") {
        await clearStore()
      }
    } else if (route.query && isString(route.query.PaymentNo)) {
      const PaymentNo: string = route.query.PaymentNo;
      const req: PaymentGetRequest = {
        PaymentNo: PaymentNo,
      };
      const response = await useRepository().payment.get(req);
      if (
        response.apiResponse.Status &&
        response.apiResponse.Status == "200" &&
        response.apiResponse.Data
      ) {
        paymentGetInfo.value = response.apiResponse.Data.Payment[0];
        orderGetInfo.value = response.apiResponse.Data.Order[0];
        status.value =
          paymentGetInfo.value.IsSuccess && !paymentGetInfo.value.IsDelete
            ? "Success"
            : "Cancel";
        if (status.value == "Success") {
          await clearStore()
        }
      }
    } else {
      router.push("/order");
    }
  } else {
    router.push("/login");
  }
  isLoading.value = false;
});

const clearStore = async () => {
  setTimeout(() => {
    placeorder.clearOrder()
    information.clearInformation()
    orderSummary.clearOrderSummary()
    packages.clearPackage()
    packageList.clearPackageList()
    payment.clearPayment()
    paymentGateway.clearPaymenGateway()
    paymentGat.clearPaymentGet()
    state.clearState();
  }, 1000);
};

// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

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
