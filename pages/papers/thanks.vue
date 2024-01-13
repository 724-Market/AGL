<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col-lg-6">

                <div class="card">
                    <div class="card-body">

                        <div class="status-list">
                            <figure class="status-icon">
                                <div class="icon check success"></div>
                            </figure>
                            <h4 class="title">ทำรายการสำเร็จ</h4>
                            <div class="status-item text-info text-big">
                                <h5 class="topic">หมายเลขทำรายการ</h5>
                                <p>{{ orderGet?.OrderNo }}</p>
                            </div>
                            <div class="status-item">
                                <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                                <p>{{ useUtility().formatDate(orderGet?.CreateDate ?? "", "D MMM BBBB HH:mm") }}</p>
                            </div>
                            <div class="status-item text-warning">
                                <h5 class="topic">ยอดชำระทั้งหมด</h5>
                                <p>{{ useUtility().getCurrency(orderGet?.GrandPrice,2) }} บาท</p>
                            </div>
                            <h4 class="title">รายการกระดาษ</h4>
                            <div class="status-item text-info" v-for="(item, i) in orderSubAll" v-bind:key="i">
                                <h5 class="topic">ราคามัดจำ {{ item.ProductPrice  }} <span> {{ item.SubCategory }}  <strong>{{item.Brand }} (X {{ item.Quantity }})</strong></span></h5>
                                <p>{{ useUtility().getCurrency(item.GrandAmount,2) }} บาท</p>
                            </div>
                        </div>
                        <div class="status-info">
                            <div class="status-action">
                                <NuxtLink class="btn" to="/papers" title="ไปหน้าประวัติการแลกกระดาษ">ไปหน้าประวัติการแลกกระดาษ</NuxtLink>
                                <NuxtLink class="btn-secondary" to="/papers/status" title="ตรวจสอบสถานะ">ตรวจสอบสถานะ</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
                

                

            </div>

            <div class="col-lg-6">

                <aside class="card">
                    <div class="card-body">

                        <div class="support">
                            <figure class="dialog-icon">
                                <i class="fa-regular fa-messages-question"></i>
                            </figure>
                            <header>
                                <h6 class="topic">ติดต่อเจ้าหน้าที่</h6>
                                <p class="subtopic">เจ้าหน้าที่พร้อมให้บริการที่ไลน์ <a href="https://lin.ee/3sktdef"
                                        rel="noopener" target="_blank" title="@724training">@724training</a> <br>หรือ
                                    โทรศัพท์ <a href="tel:020266274" title="02-026-6274">02-026-6274</a></p>
                            </header>
                            <figure class="qr-line">
                                <p>สแกน QR เพื่อเพิ่มเพื่อนในไลน์</p>
                                <img src="https://qr-official.line.me/gs/M_sqg9780m_GW.png" alt="@724training">
                            </figure>
                            <span>หรือ</span>
                            <p>คลิกปุ่มเพิ่มเพื่อนด้านล่างได้เลย</p>
                            <a class="btn-success" href="https://lin.ee/3sktdef" rel="noopener" target="_blank"
                                title="เพิ่มเพื่อน"><i class="fa-brands fa-line"></i>เพิ่มเพื่อน</a>
                        </div>

                    </div>
                </aside>

            </div>
        </div>

    </NuxtLayout>
</template>

<script lang="ts" setup>
// Define Variables
import { useRouter } from 'vue-router';
import type {
    OrderListReq,
    OrderListRes,
    SubOrderListRes,
    OrderExchangeCreateRes
} from "~/shared/entities/paper-entity";

const resPaperOrderExchange: globalThis.Ref<OrderExchangeCreateRes | undefined> = ref();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false);
const orderNo = ref(route.query.orderNo as string | undefined);
const orderGet: globalThis.Ref<OrderListRes | undefined> = ref();
const orderSub: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const orderSubDel: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const orderSubAll: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);

const onLoad = onMounted(async () => {
    if (orderNo.value != "") {
        console.log("Received OrderNo in thanks.vue:", orderNo.value);
        isLoading.value = true;
        await loadOrderDetail(orderNo.value);
        isLoading.value = false;
    }
});

const loadOrderDetail = async (orderNo: string) => {
    console.log("loadOrderDetail OrderNo in thanks.vue:", orderNo);
    //get credit balance
    const req: OrderListReq = {
        OrderNo: orderNo,
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
        orderSubDel.value = orderSub.value.filter((order: SubOrderListRes) => order.UseType === 'DeliveryFee');
        orderSubAll.value = orderSub.value.filter((order: SubOrderListRes) => order.UseType !== 'DeliveryFee');
        console.log("resPSubOrder.apiResponse.Data" + orderSub.value)
    } else if(
        resPOrder.apiResponse.Status == "400"
    ) {
        router.push("/papers");
    }
};

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ผลการทำรายการ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-thanks"
    }
})

</script>