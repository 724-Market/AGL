<template>
    <div class="card">
        <div class="card-body">
            <div class="status-list">
                <figure class="status-icon">
                    <div class="icon check success"></div>
                </figure>
                <h4 class="title">ทำรายการสั่งซื้อ<br>และชำระเงินเรียบร้อยแล้ว</h4>
                <div class="status-item text-info text-big">
                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                    <!-- <p>{{ $props.paymentGet.PaymentNo }}</p> -->
                    <p>{{ props.orderGet }}</p>
                </div>
                <div class="status-item text-info text-big">
                    <h5 class="topic">หมายเลขอ้างอิง</h5>
                    <!-- <p>{{ $props.paymentGet.PaymentNo }}</p> -->
                    <p>{{ props.paymentGet?.PaymentNo }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                    <!-- <p>{{ useUtility().formatDate($props.paymentGet.PaymentDate,"D MMMM BBBB HH:mm:ss") }}</p> -->
                     <p>{{ useUtility().formatDate(props.paymentGet?.PaymentDate,"D MMMM BBBB HH:mm:ss") }}</p>

                </div>
                <div class="status-item text-warning">
                    <h5 class="topic">สถานะ</h5>
                    <p>กำลังดำเนินการ</p>
                </div>
                <!-- <div class="status-item">
                    <h5 class="topic">จะได้รับกรมธรรม์</h5>
                    <p>ภายใน 5 นาที</p>
                </div> -->
                <div class="status-info">
                    <div class="callout">
                        <i class="fa-regular fa-face-smile-hearts fa-beat"></i> 724 ประกันออนไลน์
                        ขอขอบพระคุณเป็นอย่างสูง ที่ได้เลือก 724 ให้เป็นที่ปรึกษาด้านประกันภัย
                    </div>
                    <div class="status-action">
                        <a class="btn btn-outline-info" href="#" title="แชร์หน้านี้">แชร์หน้านี้</a>
                        <NuxtLink class="btn btn-primary" :to="'/order/compulsory/status/'+$props.orderGet"
                            title="ตรวจสอบสถานะสั่งซื้อ">ตรวจสอบสถานะสั่งซื้อ</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentGetResponse }  from "~/shared/entities/payment-entity"

const paymentGetInfo: globalThis.Ref<PaymentGetResponse | undefined> = ref()
var PaymentNo = ref('')
var PaymentDate = ref('')

const props = defineProps({ 
  paymentGet: {
    type: Object as () => PaymentGetResponse,
  },
  orderGet: String,
})

const onLoad = onMounted(async () => {
  if(props.paymentGet){
    paymentGetInfo.value = props.paymentGet
    PaymentNo.value = paymentGetInfo.value.PaymentNo
    PaymentDate.value = paymentGetInfo.value.PaymentDate
  }
})

watch(
  () => props.paymentGet,
  async () => {
    if (props.paymentGet) {
      paymentGetInfo.value = props.paymentGet
      PaymentNo.value = paymentGetInfo.value.PaymentNo
      PaymentDate.value = paymentGetInfo.value.PaymentDate
    }
  }
)
</script>