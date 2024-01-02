<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col col-main">
                <ElementsUtilitiesTracking
                v-if="orderTrack"
                :order-track="orderTrack"
                :index-sequence="sequenceIndex"
                :index-current="currentIndex"
                :is-showchild="isShowChild"
                ></ElementsUtilitiesTracking>
            </div>

            <div class="col col-sidebar">

                <section class="site-sidebar is-sticky">

                    <PapersSuborder
                    :order-get="orderGet"
                    :order-sub="orderSub"
                    @on-orderdetail="orderDetail"
                    ></PapersSuborder>
                </section>

            </div>
            
        </div>
     <!--   
        <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>

        <ElementsDialogPaperscancellation />

        <ElementsDialogSupport />
     -->
    </NuxtLayout>
</template>

<script lang="ts" setup>

import { storeToRefs } from "pinia";
import {
    OrderListReq,
    OrderListRes,
    SubOrderListRes

} from "~/shared/entities/paper-entity";

import {
    TrackOrderReq, 
    TrackOrderRes
} from "~/shared/entities/track-entity";

import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);
const orderGet: globalThis.Ref<OrderListRes | undefined> = ref();
const orderSub: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const orderTrack: globalThis.Ref<TrackOrderRes[] | undefined> = ref([]);
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

  } else {
    router.push("/login")
  }
});

const orderDetail = async () => { 
    
    isLoading.value = true;
    await loadOrderDetail(route.params.id);
    isLoading.value = false;
    
};
    
const loadOrderDetail = async (orderNo: string) => {
    
    //get credit balance
    const req: OrderListReq = {
        OrderNo: orderNo,
    };
    const treq: TrackOrderReq = {
        ReferenceID: orderNo,
    };
  
    const resPOrder = await useRepository().paper.getOrder(req);
    if (
    resPOrder.apiResponse.Status &&
    resPOrder.apiResponse.Status == "200" &&
    resPOrder.apiResponse.Data
    ) {
        orderGet.value = resPOrder.apiResponse.Data[0];
    } else if(
        resPOrder.apiResponse.Status == "400"
    ) {
        router.push("/papers");
    }
    const resPSubOrder = await useRepository().paper.getSubOrderList(req);
    if (
        resPSubOrder.apiResponse.Status &&
        resPSubOrder.apiResponse.Status == "200" &&
        resPSubOrder.apiResponse.Data
    ) {
        orderSub.value = resPSubOrder.apiResponse.Data;
        console.log("resPSubOrder.apiResponse.Data" + orderSub.value)
    }
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
                if (currentIndex2 !== -1){
                    console.log("if"+currentIndex)  
                    sequenceIndex = currentIndex; 
                    isShowChild = true;
                } else if (currentIndex !== 0){
                    console.log("Step else if"+currentIndex)  
                    sequenceIndex = currentIndex - 1; 
                    isShowChild = false;
                } else {   
                    console.log("Step else"+currentIndex)  
                    sequenceIndex = currentIndex;  
                    isShowChild = false;
                }
            }
            

        } else {
            console.log("No item with IsCurrent: true found");
        }

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