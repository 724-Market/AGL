<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
        
        <div class="row">
            <div class="col col-main">
                <ElementsUtilitiesTracking v-if="orderTrack" :order-track="orderTrack" :index-sequence="sequenceIndex"
                    :index-current="currentIndex" :is-showchild="isShowChild"></ElementsUtilitiesTracking>
            </div>

            <div class="col col-sidebar">
                <section class="site-sidebar is-sticky">
                    
                    <BackendPapersCardStatus :order-get="getOrderStatus" v-if="getOrderStatus" />
                    
                    <BackendPapersCardDetail :order-get="getOrderStatus" :ordersub-feedelivery="orderDetailFeeDel" :order-detail="orderDetailAll" v-if="orderDetailAll"></BackendPapersCardDetail>

                    
                    <NuxtLink to="/backend/papers" class="btn btn-back">ย้อนกลับ</NuxtLink>

                </section>
            </div>

        </div>
        
        <ElementsModalLoading :loading="isLoading" />

    </NuxtLayout>
</template>

<script lang="ts" setup>

import { storeToRefs } from "pinia";
import type {
    OrderNoReq,
    getOrderDetailRes,
    getSubOrderListRes

} from "~/shared/entities/backendpaper-entity";

import type {
    TrackOrderReq,
    TrackOrderRes
} from "~/shared/entities/track-entity";

import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);
const getOrderStatus: globalThis.Ref<getOrderDetailRes | undefined> = ref();
const getOrderDetails: globalThis.Ref<getSubOrderListRes[] | undefined> = ref([]);
const orderTrack: globalThis.Ref<TrackOrderRes[] | undefined> = ref([]);
const orderDetailFeeDel: globalThis.Ref<getSubOrderListRes[] | undefined> = ref([]);
const orderDetailAll: globalThis.Ref<getSubOrderListRes[] | undefined> = ref([]);
let sequenceIndex: number = 0;
let currentIndex: number = 0;
let isShowChild: boolean;

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);
//const router = useRouter();
const route = useRoute()
const router = useRouter();

const onLoad = onMounted(async () => {
    if (AuthenInfo.value) {
        isLoading.value = true;
        // Handle the possibility of route.params.id being an array
        const orderId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

        await loadTrackOrderPaper(orderId);
        await loadSubDetail(orderId);
        await loadOrderDetail(orderId);
        isLoading.value = false;
    } else {
        router.push("/login")
    }
});
const loadTrackOrderPaper = async (orderNo: string) => {
    isLoading.value = true

    const treq: TrackOrderReq = {
        ReferenceID: orderNo,
    };
    const resTrackOrder = await useRepository().track.getOrderPaper(treq);
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

    isLoading.value = false
}

const loadSubDetail = async (orderNo: string) => {
    const req: OrderNoReq = {
        OrderNo: orderNo,
    };
    const resPSubOrder = await useRepository().backendpaper.getSubOrderList(req);
    if (
        resPSubOrder.apiResponse.Status &&
        resPSubOrder.apiResponse.Status == "200" &&
        resPSubOrder.apiResponse.Data
    ) {
        getOrderDetails.value = resPSubOrder.apiResponse.Data;
        orderDetailFeeDel.value = getOrderDetails.value.filter((order: getSubOrderListRes) => order.UseType === 'DeliveryFee');
        orderDetailAll.value = getOrderDetails.value.filter((order: getSubOrderListRes) => order.UseType !== 'DeliveryFee');
    } else {
        alert(resPSubOrder.apiResponse.Status);
    }
        
    
};

const loadOrderDetail = async (orderNo: string) => {
    const req: OrderNoReq = {
        OrderNo: orderNo,
    };

    const resPOrder = await useRepository().backendpaper.getOrderDetail(req);
    if (
        resPOrder.apiResponse.Status &&
        resPOrder.apiResponse.Status == "200" &&
        resPOrder.apiResponse.Data
    ) {
        getOrderStatus.value = resPOrder.apiResponse.Data[0];
    } else {
        alert(resPOrder.apiResponse.ErrorMessage);
    }

};


// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ติดตามสถานะ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-status template-timeline"
    }
})
</script>