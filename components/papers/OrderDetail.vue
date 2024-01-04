<template>
    <div class="card">
        <div class="card-body">

            <div class="status-list">
                <figure class="status-icon">
                    <div class="icon papers success"></div>
                </figure>
                <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
                <div class="status-item">
                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                    <!--<p>{{$route.params.id}}</p>-->
                    <p>{{ $props.orderGet?.OrderNo }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วันที่ทำรายการ</h5>
                    <p>{{ formatDate($props.orderGet?.CreateDate ?? "") }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">ยอดชำระทั้งหมด</h5>
                    <p>{{ $props.orderGet?.GrandPrice }} บาท</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">สถานะ</h5>
                    <p v-if="props.orderGet?.OrderStatus == 'Prepare'" class="text-warning">รอดำเนินการ</p>
                    <p v-else-if="props.orderGet?.OrderStatus == 'Delivery'" class="text-info">จัดส่ง</p>
                    <p v-else-if="props.orderGet?.OrderStatus == 'Success'" class="text-success">สำเร็จ</p>
                    <p v-else-if="props.orderGet?.OrderStatus == 'Cancel'" class="text-danger">ยกเลิกรายการ</p>
                </div>
            </div>

        </div>
    </div>

    
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<script setup lang="ts">
import type {
    OrderListRes
} from "~/shared/entities/paper-entity";
import type { SubOrderListRes } from "~/shared/entities/paper-entity";

// Loading state after form submiting
const isLoading = ref(false);
// Define Variables
//const orderGet: globalThis.Ref<OrderListRes | undefined> = ref();
const emit = defineEmits(["onOrderdetail"])

const props = defineProps({
    orderGet: {
        type: Object as () => OrderListRes,
    },
    orderSub: {
        type: Array<SubOrderListRes>,
        default: Array<SubOrderListRes>,
    }
});

const formatDate = (date: string): string => {
    const format = useUtility().formatDate(date, "DD MMMM BBBB HH:mm:ss");

    return format;
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