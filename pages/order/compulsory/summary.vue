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
      id="form-order"
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

            <OrderCompulsorySummaryInsureDetail :order-detail="orderDetail" v-if="orderDetail"></OrderCompulsorySummaryInsureDetail>
          </div>
        </div>

        <div class="col-lg-5">
          <aside class="card">
            <div class="card-body">
              <OrderCompulsorySummaryPurchaseDetail></OrderCompulsorySummaryPurchaseDetail>
              <OrderCompulsorySummaryPaymentStatus></OrderCompulsorySummaryPaymentStatus>
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
                />
              </div>
            </div>
          </aside>

          <FormKit
            type="submit"
            label="ไปต่อ"
            name="order-submit"
            id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }"
            :disabled="submitted"
            :loading="isLoading"
          />

          <NuxtLink to="payment" class="btn btn-back">ย้อนกลับ</NuxtLink>
        </div>
      </div>
    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageRequest, IPackageResponse } from "~~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";
import {
  OrderDetailRequest,
  OrderDetailResponse,
  OrderDetails,
  PaymentDetails,
} from "~/shared/entities/order-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const isSelect: globalThis.Ref<Boolean> = ref(false);

let values = reactive({});

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "เลือกช่องทางการชำระเงิน",
  },
  {
    id: "2",
    className: "",
    desc: "เลือกการใช้ส่วนลด",
  },
]);
const loadOrderDetail = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };
  const response = await useRepository().order.details(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      orderDetail.value = response.apiResponse.Data[0].OrderDetails;
      paymentDetail.value = response.apiResponse.Data[0].PaymentDetails;
      console.log('OrderDetails',orderDetail.value)
    } else {
      // data not found
    }
  } else {
  }
};
const onLoad = onMounted(async () => {
  isLoading.value = true;
  //TODO testing implement order detail
  await loadOrderDetail("AMC2301000165");
  isLoading.value = false;
});

// Submit form event
const submitOrder = async (formData: any) => {
  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000));
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
