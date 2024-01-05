
<template>
  <div class="dropdown" v-if="$props.row">
    <a
      class="btn btn-ellipsis dropdown-toggle"
      role="button"
      title="เครื่องมือจัดการเพิ่มเติม"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </a>
    <ul class="dropdown-menu">
      <li v-if="props.row.Status == 'Draft'">
        <a class="dropdown-item" title="ทำรายการต่อ"
          ><span class="icon-edit" :data-id="$props.row.OrderNo">ทำรายการต่อ</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Pending'">
        <a class="dropdown-item"  title="ชำระเงิน"
          ><span class="icon-payment" :data-id="$props.row.OrderNo">ชำระเงิน</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Delivery' || props.row.Status == 'Process' || (props.row.Status == 'Cancel' && props.row.IsCancel && props.row.IsCancelComplete)">
        <a class="dropdown-item" :href="'/order/compulsory/status/' + $props.row.OrderNo" title="ติดตามสถานะ"
          ><span class="icon-tracking" :data-id="$props.row.OrderNo">ติดตามสถานะ</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Success'">
        <a class="dropdown-item" :href="'/order/compulsory/status/' + $props.row.OrderNo" title="รายละเอียดกรมธรรม์"
          ><span class="icon-policy" :data-id="$props.row.OrderNo">รายละเอียดกรมธรรม์</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Success'">
        <hr class="dropdown-divider" />
      </li>

      <li v-if="props.row.Status == 'Success'">
        <a class="dropdown-item"  title="ดาวน์โหลดกรมธรรม์"
          ><span class="icon-download-file" :data-url="$props.row.PolicyURL">ดาวน์โหลดกรมธรรม์</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Cancel' && props.row.IsCancel && props.row.IsCancelComplete">
        <hr class="dropdown-divider" />
      </li>

      <li v-if="props.row.Status == 'Cancel' && props.row.IsCancel && props.row.IsCancelComplete">
        <a class="dropdown-item" title="ติดต่อเจ้าหน้าที่"
          ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
        >
      </li>

      <li v-if="props.row.Status == 'Draft'">
        <hr class="dropdown-divider" />
      </li>

      <li v-if="props.row.Status == 'Draft'">
        <a class="dropdown-item"  title="ลบแบบร่างนี้"
          ><span class="icon-trash" :data-id="$props.row.OrderNo">ลบแบบร่างนี้</span></a
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {
  HistoryResponse
} from "~/shared/entities/order-entity";

const props = defineProps({
  row: {
    type: Object as () => HistoryResponse,
  },
});
</script>
