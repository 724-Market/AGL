<template>
    <div class="card">
        <div class="card-body">
            <div class="status-list">
                <figure class="status-icon">
                    <div class="icon cross danger"></div>
                </figure>
                <h4 class="title">ทำรายการไม่สำเร็จ</h4>
                <div class="status-item text-info text-big">
                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                    <p>{{ noticePaymentInfo.PaymentNo }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วันที่ทำรายการ</h5>
                    <p>{{ noticePaymentInfo.CancelDate }}</p>
                </div>
                <div class="status-item text-danger">
                    <h5 class="topic">สถานะ</h5>
                    <p>ดำเนินการไม่สำเร็จ</p>
                </div>
                <div class="status-item text-danger">
                    <h5 class="topic">จะได้รับกรมธรรม์</h5>
                    <p>ไม่สามารถออกกรมธรรม์ได้</p>
                </div>
                <div class="status-info">
                    <div class="notice-danger">
                        <i class="fa-solid fa-circle-xmark"></i> ธนาคารแจ้งว่าบัตรเครดิตถูกระงับการใช้งาน
                    </div>
                    <div class="status-action">
                        <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
                        <a class="btn btn-warning" href="#" title="ติดต่อเจ้าหน้าที่">ติดต่อเจ้าหน้าที่</a>
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