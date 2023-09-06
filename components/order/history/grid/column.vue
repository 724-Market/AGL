<template>
   <div v-if="props.field && props.field == 'has-child' && props.row">
   <div class="has-child" @click="props.click"></div>
  </div>
  <div v-if="props.field && props.field == 'order' && props.row">
    #{{ props.row.OrderNo
    }}<time datetime="2023-05-05 08:08">{{ props.row.CreateDate }}</time>
  </div>
  <div v-if="props.field && props.field == 'subject' && props.row">
    <span v-if="props.row.OrderGroupType=='INSURANCE'">ประกันภัย</span>
    <span v-else>ทรัพย์สิน</span>
    <span v-if="props.row.OrderType=='COMPULSORY'">(ภาคบังคับ)</span>
    <span v-else-if="props.row.OrderType=='VOLUNTARY'">(ภาคสมัครใจ)</span>
    
  </div>
  <div v-if="props.field && props.field == 'amount' && props.row">
    {{ props.row.OrderAmount }}<span>ส่วนลด {{ props.row.DiscountAmount }}</span>
  </div>
  <div v-if="props.field && props.field == 'name' && props.row">
    {{ props.row.FirstName }} {{ props.row.LastName
    }}<span v-if="props.row.PhoneNumber != ''"
      >{{ props.row.PhoneNumber
      }}<!--089-xxx-x478--></span
    >
  </div>
  <div v-if="props.field && props.field == 'status' && props.row">
    <div class="badge-dot badge" v-if="props.row.Status == 'Draft'">แบบร่าง</div>
    <div class="badge-dot badge-warning" v-else-if="props.row.Status == 'Pending'">
      รอชำระเงิน
    </div>
    <div class="badge-dot badge-warning" v-else-if="props.row.Status == 'Process'">
      รับแจ้งงาน
    </div>
    <div class="badge-dot badge-warning" v-else-if="props.row.Status == 'Delivery'">
      กำลังจัดส่ง
    </div>
    <div class="badge-dot badge-success" v-else-if="props.row.Status == 'Success'">
      สำเร็จ
    </div>
    <div class="badge-dot badge-danger" v-else-if="props.row.Status == 'Cancel'">
      ไม่สำเร็จ
    </div>
    <div class="badge-dot badge-warning" v-else-if="props.row.Status == 'Unknow'">
      ไม่มีสถานะ
    </div>
    <span v-if="props.row.IsPolicyFile"
      ><a
        class="attached"
        target="_blank"
        :href="props.row.PolicyURL"
        title="ดาวน์โหลดกรมธรรม์"
        >กรมธรรม์ {{ props.row.Policy }}</a
      ></span
    >
  </div>
  <div v-if="props.field && props.field == 'meta' && props.row" class="meta">
    <span
      v-if="props.row.CreateType == 'ONLINE'"
      class="badge meta-online"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      :data-bs-title="`ทำรายการแบบ Online<br>โดย ${props.row.CreateUser}: ${props.row.AssuredFullName}`"
      data-bs-html="true"
      ><em>On</em></span
    >
    <span
      v-else-if="props.row.CreateType == 'OFFLINE'"
      class="badge meta-offline"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      :data-bs-title="`ทำรายการแบบ Offline<br>โดย ${props.row.CreateUser}: ${props.row.AssuredFullName}`"
      data-bs-html="true"
      ><em>Off</em></span
    >
    <span
      v-if="props.row.JobType == 'NEW'"
      class="badge meta-new"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="งานใหม่"
      ><em>N</em></span
    >
    <span
      v-else
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
      :data-bs-title="`${props.row.CompanyCode} : ${props.row.CompanyName}`"
      ><em>{{ props.row.CompanyCode }}</em></span
    >
    <span
      v-if="props.row.OrderType == 'VOLUNTARY'"
      class="badge meta-product"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      :data-bs-title="useMapData().getOrderClassType(props.row.OrderClassType) ? useMapData().getOrderClassType(props.row.OrderClassType).text : ''"
      ><em>{{ useMapData().getOrderClassType(props.row.OrderClassType) ? useMapData().getOrderClassType(props.row.OrderClassType).title : '' }}</em></span
    >
    <span
      v-else
      class="badge meta-product"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      :data-bs-title="useMapData().getOrderType(props.row.OrderSubType)  ? useMapData().getOrderType(props.row.OrderSubType).text : ''"
      ><em>{{ useMapData().getOrderType(props.row.OrderSubType) ? useMapData().getOrderType(props.row.OrderSubType).title:'' }}</em></span
    >

    <!-- <span
      class="badge meta-product meta-include"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ป.1 & พ.ร.บ."
      ><em>ควบ</em></span
    > -->
    <span
      v-if="props.row.PaymentType == 'BILL_PAYMENT'"
      class="badge meta-qr"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย QR"
      ><em>QR</em></span
    >
    <span
      v-else-if="props.row.PaymentType == 'CREDIT_CARD'"
      class="badge meta-card"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต"
      ><em>บัตรเครดิต/บัตรเดบิต</em></span
    >
    <span v-else-if="props.row.PaymentType == 'INSTALLMENT'"
      class="badge meta-installment"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      :data-bs-title="`ชำระด้วย บัตรเครดิต/บัตรเดบิต ผ่อน ${props.row.NumCredit} เดือน`"
      ><em>/ {{props.row.NumCredit}}</em></span
    >
    
    <span
      v-else-if="props.row.PaymentType == 'PLEDGE'"
      class="badge meta-pledge"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="ชำระด้วย วงเงินมัดจำ"
      ><em>วงเงินมัดจำ</em></span
    >
    <span
      v-if="props.row.DiscountType == 'ZERO_COMMISSION'"
      class="badge meta-fulldiscount"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="หักส่วนลดเต็มจำนวน"
      ><em>หักเต็ม</em></span
    >
    <span
      v-else-if="props.row.DiscountType == 'SOME_COMMISSION'"
      class="badge meta-partialdiscount"
      data-bs-toggle="tooltip"
      data-bs-custom-class="meta-tooltip"
      data-bs-title="หักส่วนลดบางส่วน"
      ><em>หักบางส่วน</em></span
    >
    <span
      v-else-if="props.row.DiscountType == 'FULL_COMMISSION'"
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
  click:Function
});

const openChild = ()=>{
  alert('opened')
}
</script>
