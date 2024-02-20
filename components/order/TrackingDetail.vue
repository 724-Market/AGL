<template>
    <div class="card">
        <div class="card-body">

            <div class="status-list">
                <figure class="status-icon" v-if="orderStatus">
                    <div :class="['icon', 'order', orderStatusIconClass]"></div>
                </figure>
                <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
                <div class="status-item" v-if="$props.orderGet">
                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                    <p>{{ $props.orderGet.OrderNo }}</p>
                </div>
                <div class="status-item" v-if="$props.orderGet">
                    <h5 class="topic">วันที่ทำรายการ</h5>
                    <p>{{ useUtility().formatDate($props.orderGet.OrderDate) }}</p>
                </div>
                <div class="status-item" v-if="$props.payment">
                    <h5 class="topic">ยอดชำระทั้งหมด</h5>
                    <p>{{ formatCurrency($props.payment.GrandAmount) }} บาท</p>
                </div>
                <div class="status-item" v-if="orderStatus">
                    <h5 class="topic">สถานะ</h5>
                    <p :class="orderStatusClass">{{ orderStatusText }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
// Define import
import type { OrderDetails, PaymentDetails } from "~/shared/entities/order-entity"

// Define props
const props = defineProps({
    orderGet: {
        type: Object as () => OrderDetails
    },
    payment: {
        type: Object as () => PaymentDetails,
    },
    currentStatus: String
})

// useUtility change currency format
const formatCurrency = (currency: number) => {
    const format = useUtility().getCurrency(currency, 2)
    return format
}

// Change variable to `orderStatus` and null validation
const orderStatus = computed(() => {
    return props.currentStatus ? props.currentStatus : null
})

// Computed for class on icon
const orderStatusIconClass = computed(() => {
    switch (orderStatus.value) {
        case 'OrderCreate':
            return 'warning'
        case 'OrderPayment':
            return 'info'
        case 'OrderReceive':
            return 'info'
        case 'OrderComplete':
            return 'success'
        case 'Cancel':
            return 'danger'
        default:
            return ''
    }
})

// Computed for class on status
const orderStatusClass = computed(() => {
    switch (orderStatus.value) {
        case 'OrderCreate':
            return 'text-warning'
        case 'OrderDelivery':
        case 'OrderPayment':
            return 'text-warning'
        case 'OrderReceive':
            return 'text-info'
        case 'OrderComplete':
            return 'text-success'
        case 'Cancel':
            return 'text-danger'
        default:
            return ''
    }
})

// Computed for text on status
const orderStatusText = computed(() => {
    switch (orderStatus.value) {
        case 'OrderCreate':
            return 'รอดำเนินการ'
        case 'OrderPayment':
            return 'ชำระเงิน'
        case 'OrderDelivery':
            return 'จัดส่ง'
        case 'OrderReceive':
            return 'รับกระดาษ'
        case 'OrderComplete':
            return 'สำเร็จ'
        case 'Cancel':
            return 'ยกเลิกรายการ'
        default:
            return ''
    }
})
</script>
