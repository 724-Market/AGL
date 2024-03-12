<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col col-main">
        <div class="has-sticky">

          <ElementsUtilitiesTracking v-if="orderTrack" :order-track="orderTrack" :index-sequence="sequenceIndex"
            :index-current="currentIndex" :is-showchild="isShowChild" />

        </div>
      </div>

      <div class="col col-sidebar">
        <section class="site-sidebar is-sticky">

          <OrderTrackingDetail :payment="paymentDetail" :order-get="orderDetail" :current-status="currentStatus" />

          <OrderTrackingSubDetail :order-get="orderDetail" v-if="orderDetail" />

          <NuxtLink class="btn-back btn-gray" to="/order">ย้อนกลับ</NuxtLink>

        </section>
      </div>

    </div>

    <ElementsModalLoading :loading="isLoading" />

  </NuxtLayout>
</template>

<script lang="ts" setup>

import { storeToRefs } from "pinia";
import type {
  OrderDetailRequest,
  OrderDetails,
  PaymentDetails,

} from "~/shared/entities/order-entity";

import type {
  TrackOrderReq,
  TrackOrderRes
} from "~/shared/entities/track-entity";

import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);
const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const orderTrack: globalThis.Ref<TrackOrderRes[] | undefined> = ref([]);
const currentStatus = ref('');
let sequenceIndex: number = 0;
let currentIndex: number = 0;
let isShowChild: boolean;

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);
//const router = useRouter();
const route = useRoute()
const router = useRouter();

const onLoad = onMounted(async () => {
  console.log("Thanks to track order")
  if (AuthenInfo.value) {
    isLoading.value = true;
    // Handle the possibility of route.params.id being an array
    const orderId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
    await loadTrackOrderInsure(orderId);

    await loadOrderDetail(orderId);
    isLoading.value = false;
  } else {
    router.push("/login")
  }
});
const loadTrackOrderInsure = async (orderNo: string) => {
  const treq: TrackOrderReq = {
    ReferenceID: orderNo,
  };
  const resTrackOrder = await useRepository().track.getOrderInsure(treq);
  if (
    resTrackOrder.apiResponse.Status &&
    resTrackOrder.apiResponse.Status == "200" &&
    resTrackOrder.apiResponse.Data
  ) {
    orderTrack.value = resTrackOrder.apiResponse.Data;
    //Rever child//

    currentIndex = resTrackOrder.apiResponse.Data.findIndex(
      item => item && item.IsCurrent === true
    );
    currentStatus.value = orderTrack.value[currentIndex]?.Parent?.Type ?? '';
    if (currentIndex !== -1) {
      const currentItem = resTrackOrder.apiResponse.Data[currentIndex];
      if (currentItem && currentItem.Parent) {
        const currentIndex2 = currentItem.Child?.findIndex(
          item => item && (item.StatusCode === 'Success' || item.StatusCode === 'CancelByUser'));
        if (currentIndex2 !== -1) {
          sequenceIndex = currentIndex;
          isShowChild = true;
        } else if (currentIndex !== 0) {
          sequenceIndex = currentIndex - 1;
          isShowChild = false;
        } else {
          sequenceIndex = currentIndex;
          isShowChild = false;
        }
      }
    } else {
      console.log("No item with IsCurrent: true found");
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
    } else {
      alert(response.apiResponse.ErrorMessage)
    }
  }
};

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = 'ติดตามสถานะ'
const pageCategory = 'พ.ร.บ.'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-order single-status template-timeline'
  }
})
</script>
