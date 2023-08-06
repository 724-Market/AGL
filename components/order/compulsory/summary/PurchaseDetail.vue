<template>
  <div class="status-list" v-if="$props.payment">
    <figure class="status-icon">
      <div class="icon order success"></div>
    </figure>
    <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
    <div class="status-item text-big">
      <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
      <p>{{ $props.orderNo }}</p>
    </div>
    <div class="status-item ">
      <h5 class="topic">วันที่ทำรายการ</h5>
      <p>{{ formatDate($props.createDate ?? "") }}</p>
    </div>
    <div class="status-item">
      <h5 class="topic">ยอดชำระทั้งหมด</h5>
      <p>{{ $props.payment.GrandAmount }} บาท</p>
    </div>
    <div class="status-item">
      <h5 class="topic">สถานะ</h5>
      <p>รอชำระเงิน</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import {  PaymentDetails } from "~/shared/entities/order-entity";


const props = defineProps({
  orderNo:String,
  createDate:String,
  payment: {
    type: Object as () => PaymentDetails,
  },
});

const formatDate = (date:string):string=>{
  const format =useUtility().formatDate(date, "DD MMMM BBBB HH:mm:ss");;

  return format
}
</script>