<template>
  <div v-if="props.field && props.field == 'order'">
    #200300033675<time datetime="2023-05-05 08:08">2023-05-05 08:08</time>
  </div>
  <div v-if="props.field && props.field == 'amount'">645.21<span>ส่วนลด 0.00</span></div>
  <div v-if="props.field && props.field == 'name'">
    ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span>
  </div>
  <div v-if="props.field && props.field == 'status'">
    <div class="badge-dot badge">แบบร่าง</div>
    <div class="badge-dot badge-warning">รอชำระเงิน</div>
    <div class="badge-dot badge-warning">รับแจ้งงาน</div>
    <div class="badge-dot badge-warning">กำลังจัดส่ง</div>
    <div class="badge-dot badge-success">สำเร็จ</div>
    <span
      ><a class="attached" href="#" title="ดาวน์โหลดกรมธรรม์"
        >กรมธรรม์ TR-4635-453-32-1</a
      ></span
    >
    <div class="badge-dot badge-danger">ไม่สำเร็จ</div>
  </div>
  <div v-if="props.field && props.field == 'meta'">
    <span
      class="badge meta-online"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ทำรายการแบบ online<br>โดย ปฐมพงศ์ สังคจิตต์"
      data-bs-html="true"
      ><em>On</em></span
    >
    <span
      class="badge meta-offline"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ทำรายการแบบ offline<br>โดย ปฐมพงศ์ สังคจิตต์"
      data-bs-html="true"
      ><em>Off</em></span
    >
    <span
      class="badge meta-new"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="งานใหม่"
      ><em>N</em></span
    >
    <span
      class="badge meta-renew"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="งานต่ออายุ"
      ><em>R</em></span
    >
    <span
      class="badge meta-company"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ทิพยประกันภัย"
      ><em>TIP</em></span
    >
    <span
      class="badge meta-company"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ไทยศรี"
      ><em>ERGO</em></span
    >
    <span
      class="badge meta-product"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="พ.ร.บ."
      ><em>พรบ</em></span
    >
    <span
      class="badge meta-product"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ประกันภัย ประเภท 1"
      ><em>ป.1</em></span
    >
    <span
      class="badge meta-product"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ประกันภัย ประเภท 3+"
      ><em>ป.3+</em></span
    >
    <span
      class="badge meta-product meta-include"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ป.1 & พ.ร.บ."
      ><em>ควบ</em></span
    >
    <span
      class="badge meta-qr"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย QR"
      ><em>QR</em></span
    >
    <span
      class="badge meta-card"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต"
      ><em>บัตรเครดิต/บัตรเดบิต</em></span
    >
    <span
      class="badge meta-installment"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต ผ่อน 6 เดือน"
      ><em>/ 6</em></span
    >
    <span
      class="badge meta-installment-cash"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย เงินสด ผ่อน 12 เดือน"
      ><em>/ 12</em></span
    >
    <span
      class="badge meta-pledge"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย วงเงินมัดจำ"
      ><em>วงเงินมัดจำ</em></span
    >
    <span
      class="badge meta-fulldiscount"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="หักส่วนลดเต็มจำนวน"
      ><em>หักเต็ม</em></span
    >
    <span
      class="badge meta-partialdiscount"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="หักส่วนลดบางส่วน"
      ><em>หักบางส่วน</em></span
    >
    <span
      class="badge meta-fullpay"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระเบี้ยเต็มจำนวน"
      ><em>จ่ายเต็ม</em></span
    >
  </div>
</template>
<script lang="ts" setup>
import { HistoryResponse } from "~/shared/entities/order-entity";
const props = defineProps({
  row: {
    type: Object as () => HistoryResponse,
  },
  field: String,
});
</script>
