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
              ></OrderCompulsorySummaryPurchaseDetail>
              <OrderCompulsorySummaryPaymentStatus
                :payment="paymentDetail"
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
            label="ไปต่อ"
            name="order-submit"
            id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }"
            :disabled="!isConsent"
            :loading="isLoading"
          />

          <NuxtLink
            v-if="orderDetail"
            :to="'placeorder?orderNo=' + orderDetail.OrderNo"
            class="btn btn-back"
            >ย้อนกลับ</NuxtLink
          >
        </div>
      </div>
    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// using pinia
import { isString } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { IInformation } from "~/shared/entities/information-entity";
import {
  OrderDetailRequest,
  OrderDetails,
  OrderResponse,
  PaymentDetails,
} from "~/shared/entities/order-entity";
import { PaymentConfirmRequest } from "~/shared/entities/payment-entity";
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
//define store
const store = useStoreOrderSummary();
// define getter in store
const { OrderSummaryInfo } = storeToRefs(store);
const infomation = useStoreInformation();
const placeorder = useStorePlaceorder();
// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const isConsent = ref();

let values = reactive({});
const loadOrderSummary = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };
  const response = await useRepository().order.summary(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      // save to store
      const data = response.apiResponse.Data[0];
      store.setOrderSummary(data);

      setStoretoStep(data,orderNo);
    }
  }
};
const getCarDetail = (): string => {
  let carDetail = "";
  if (orderDetail.value) {
    carDetail = `${orderDetail.value.CarDetails.CarBrand} ${orderDetail.value.CarDetails.CarModel} ${orderDetail.value.CarDetails.SubCarModel}  ${orderDetail.value.CarDetails.CarYear}`;
  }
  return carDetail;
};
const getDayOfYear = (EffectiveDate: string, ExpireDate: string): number => {
  let days = 0;

  const startDate = new Date(EffectiveDate);
  const endDate = new Date(ExpireDate);
  const diff = Math.abs(startDate.getTime() - endDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  days = diffDays - 1;

  return days;
};
const setStoretoStep = (data: OrderResponse,orderNo:string) => {
  if (data && data.Order) {
    const order = data.Order;

    const req: PlaceOrderRequest = {
      OrderNo: orderNo,
      Package: order.Package,
      CarDetailsExtension: order.CarDetailsExtension,
      Customer: order.Customer,
      DeliveryMethod1: order.DeliveryMethod1,
      DeliveryMethod2: order.DeliveryMethod2,
      IsTaxInvoice: order.IsTaxInvoice,
    };
    console.log(req)
    if (req.Customer && req.Customer.DefaultAddress) {
      req.Customer.DefaultAddress.ZipCode = orderDetail.value?.AssuredDetails.ZipCode;
    }
    if (req.Customer && req.Customer.DeliveryAddress) {
      req.Customer.DeliveryAddress.ZipCode =
        orderDetail.value?.DeliveryPolicyDetails.ZipCode;
    }
    if (req.Customer && req.Customer.TaxInvoiceAddress) {
      req.Customer.TaxInvoiceAddress.ZipCode =
        orderDetail.value?.TaxInvoiceDetails.ZipCode;
    }
    if (req.Customer && req.Customer.TaxInvoiceDeliveryAddress) {
      req.Customer.TaxInvoiceDeliveryAddress.ZipCode =
        orderDetail.value?.DeliveryTaxInvoiceDetails.ZipCode;
    }
    placeorder.setOrder(req);

    const reqInfo: IInformation = {
      CarBrand: order.Package.CarBrandID,
      CarCC: orderDetail.value?.CarDetails.CarCC.toFixed(0) ?? "",
      CarDetail: getCarDetail(),
      CarModel: order.Package.CarModelID,
      CarSize: order.Package.CarCategoryID,
      CarType: order.Package.CarTypeCode,
      CarUse: order.Package.UseCarCode,
      CarYear: order.CarDetails.CarSalesYear.toFixed(0),
      customSubCarModel: "",
      EffectiveDate: order.Package.EffectiveDate,
      EffectiveType: order.Package.EffectiveType,
      ExpireDate: order.Package.ExpireDate,
      SubCarModel: order.Package.CarModelID,
      InsuranceDay: getDayOfYear(order.Package.EffectiveDate, order.Package.ExpireDate),
    };
    infomation.setInformation(reqInfo);
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
    } else {
      // data not found
    }
  } else {
  }
};
const onLoad = onMounted(async () => {
  const route = useRoute();
  console.log(route.query);
  if (route.query && isString(route.query.OrderNo)) {
    const OrderNo:string =  route.query.OrderNo
    isLoading.value = true;
    //TODO testing implement order detail
    await loadOrderDetail(OrderNo); //AMC2307000036
    await loadOrderSummary(OrderNo);

    isLoading.value = false;
  }
  else{
    const router = useRouter()
    router.push('/order/compulsory/payment')
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
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    isLoading.value = false;
    const router = useRouter();
    router.push('/payment/qr')
  } else {
  }
  isLoading.value = false;
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
