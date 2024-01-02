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

    <div class="card">
        <div class="card-body card-table">

            <h5 class="card-title">รายการกระดาษ</h5>

            <div class="summary-table">
                <table class="table no-striped">
                    <thead>
                        <tr>
                            <th scope="col">รายการกระดาษ</th>
                            <th scope="col" class="text-center">จำนวน</th>
                            <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="spacer">
                            <td colspan="3"></td>
                        </tr>
                        <tr class="product" v-for="(item, i) in orderSubAll" v-bind:key="i">
                            <th scope="row">ราคามัดจำ {{ item.ProductPrice }}<span>{{ item.SubCategory }} •12
                                    <strong>{{ item.Brand }}</strong></span></th>
                            <td class="quantity">X {{ item.Quantity }}</td>
                            <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
                        </tr>
                        <tr class="product" v-for="(item, i) in orderSubDel" v-bind:key="i">
                            <th scope="row">
                                ค่าจัดส่ง {{ item.ProductPrice }}
                                <span>
                                    {{ item.SubCategory }} {{ item.UseType }} {{ item.Brand }}
                                </span>
                            </th>
                            <td class="quantity"></td>
                            <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
                        </tr>

                        <tr class="spacer">
                            <td colspan="3"></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td scope="col">ยอดมัดจำที่ใช้</td>
                            <td scope="col"></td>
                            <td scope="col" class="text-end price">{{
                                useUtility().getCurrency($props.orderGet?.GrandPrice, 2) }}</td>
                        </tr>
                    </tfoot>
                </table>
                <NuxtLink @click="backStep()" class="btn btn-back">ย้อนกลับ</NuxtLink>
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
const orderNSub: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const orderSubDel: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const orderSubAll: globalThis.Ref<SubOrderListRes[] | undefined> = ref([]);
const emit = defineEmits(["onOrderdetail"])

const route = useRoute()
const router = useRouter();
const props = defineProps({
    orderGet: {
        type: Object as () => OrderListRes,
    },
    orderSub: {
        type: Array<SubOrderListRes>,
        default: Array<SubOrderListRes>,
    }
});

const onLoad = onMounted(async () => {

    isLoading.value = true;
    emit('onOrderdetail')
    if (props.orderSub) {
        orderNSub.value = props.orderSub
        orderSubDel.value = orderNSub.value.filter((order: SubOrderListRes) => order.UseType === 'DeliveryFee');
        orderSubAll.value = orderNSub.value.filter((order: SubOrderListRes) => order.UseType !== 'DeliveryFee');

    }

    isLoading.value = false;
});

watch(
    () => props.orderSub,
    () => {
        //console.log('packageList value changed', props.packageList)
        if (props.orderSub.length > 0) {
            orderNSub.value = props.orderSub
            orderSubDel.value = orderNSub.value.filter((order: SubOrderListRes) => order.UseType === 'DeliveryFee');
            orderSubAll.value = orderNSub.value.filter((order: SubOrderListRes) => order.UseType !== 'DeliveryFee');
        }

    }
)

const formatDate = (date: string): string => {
    const format = useUtility().formatDate(date, "DD MMMM BBBB HH:mm:ss");

    return format;
};

const backStep = async () => {
    router.push("/papers/");
}


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