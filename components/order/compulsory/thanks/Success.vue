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
                    <p>{{ noticePaymentInfo.PaymentNo }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                    <p>{{ noticePaymentInfo.PaymentDate }}</p>
                </div>
                <div class="status-item text-warning">
                    <h5 class="topic">สถานะ</h5>
                    <p>กำลังดำเนินการ</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">จะได้รับกรมธรรม์</h5>
                    <p>ภายใน 5 นาที</p>
                </div>
                <div class="status-info">
                    <div class="callout">
                        <i class="fa-regular fa-face-smile-hearts fa-beat"></i> 724 ประกันออนไลน์
                        ขอขอบพระคุณเป็นอย่างสูง ที่ได้เลือก 724 ให้เป็นที่ปรึกษาด้านประกันภัย
                    </div>
                    <div class="status-action">
                        <a class="btn btn-outline-info" href="#" title="แชร์หน้านี้">แชร์หน้านี้</a>
                        <a class="btn btn-primary" href="#"
                            title="ตรวจสอบสถานะสั่งซื้อ">ตรวจสอบสถานะสั่งซื้อ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NoticePaymentData }  from "~/shared/entities/payment-entity"

const noticePaymentInfo: globalThis.Ref<NoticePaymentData | undefined> = ref()

const props = defineProps({ 
  noticePayment: {
    type: Object as () => NoticePaymentData,
  },
})

const onLoad = onMounted(async () => {
  if(props.noticePayment){
    noticePaymentInfo.value = props.noticePayment
  }
})

watch(
  () => props.noticePayment,
  async () => {
    if (props.noticePayment) {
      noticePaymentInfo.value = props.noticePayment
    }
  }
)
</script>