<template>
    <div class="card">
        <div class="card-body">

            <div class="status-list">
                <figure class="status-icon" v-if="orderStatus">
                    <div :class="['icon', 'papers', orderStatusIconClass]"></div>
                </figure>
                <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
                <div class="status-item" v-if="$props.orderGet">
                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                    <p>{{ $props.orderGet.OrderNo }}</p>
                </div>
                <div class="status-item" v-if="$props.orderGet">
                    <h5 class="topic">วันที่ทำรายการ</h5>
                    <p>{{ formatDate($props.orderGet.CreateDate) }}</p>
                </div>
                <div class="status-item" v-if="$props.orderGet">
                    <h5 class="topic">ยอดชำระทั้งหมด</h5>
                    <p>{{ formatCurrency($props.orderGet.GrandPrice) }} บาท</p>
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
// // Define import
import type { OrderListRes } from "~/shared/entities/paper-entity"

// // Define props
const props = defineProps({
    orderGet: {
        type: Object as () => OrderListRes
    }
})

// useUtility change date format
const formatDate = (date: string) => {
    const format = useUtility().formatDate(date, 'DD MMM BBBB • HH:mm')
    return format
}

// useUtility change currency format
const formatCurrency = (currency: number) => {
    const format = useUtility().getCurrency(currency, 2)
    return format
}

// Change variable to `orderStatus` and null validation
const orderStatus = computed(() => {
    return props.orderGet ? props.orderGet.OrderStatus : null
})

// Computed for class on icon
const orderStatusIconClass = computed(() => {
    switch (orderStatus.value) {
        case 'Prepare':
            return 'warning'
        case 'Delivery':
            return 'info'
        case 'Success':
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
        case 'Prepare':
            return 'text-warning'
        case 'Delivery':
            return 'text-info'
        case 'Success':
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
        case 'Prepare':
            return 'รอดำเนินการ'
        case 'Delivery':
            return 'จัดส่ง'
        case 'Success':
            return 'สำเร็จ'
        case 'Cancel':
            return 'ยกเลิกรายการ'
        default:
            return ''
    }
})
</script>