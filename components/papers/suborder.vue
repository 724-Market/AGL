<template>
    

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
                        <tr class="product" v-for="(item, i) in props.orderSub" v-bind:key="i">
                            <th scope="row">ราคามัดจำ {{ item.ProductPrice }}<span>{{ item.SubCategory }} •12
                                    <strong>{{ item.Brand }}</strong></span></th>
                            <td class="quantity">X {{ item.Quantity }}</td>
                            <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
                        </tr>
                        <tr class="product" v-for="(item, j) in props.ordersubFeedelivery" v-bind:key="j">
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

const props = defineProps({
    orderGet: {
        type: Object as () => OrderListRes,
    },
    orderSub: {
        type: Array<SubOrderListRes>,
        default: Array<SubOrderListRes>,
    },
    ordersubFeedelivery: {
        type: Array<SubOrderListRes>,
        default: Array<SubOrderListRes>,
    }
});



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