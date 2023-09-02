
<template>
  <div class="dropdown">
    <a
      class="btn btn-ellipsis dropdown-toggle"
      href="#"
      role="button"
      title="เครื่องมือจัดการเพิ่มเติม"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </a>
    <ul class="dropdown-menu">
      <li>
        <a class="dropdown-item" @click="resume" title="ทำรายการต่อ"
          ><span class="icon-edit">ทำรายการต่อ</span></a
        >
      </li>
      <li>
        <a class="dropdown-item" @click="pay" title="ชำระเงิน"
          ><span class="icon-payment">ชำระเงิน</span></a
        >
      </li>
      <li>
        <a class="dropdown-item" @click="trackStatus" title="ติดตามสถานะ"
          ><span class="icon-tracking">ติดตามสถานะ</span></a
        >
      </li>
      <li>
        <a class="dropdown-item"  @click="policyDetail" title="รายละเอียดกรมธรรม์"
          ><span class="icon-policy">รายละเอียดกรมธรรม์</span></a
        >
      </li>
      <li>
        <a class="dropdown-item" @click="download" title="ดาวน์โหลดกรมธรรม์"
          ><span class="icon-download-file">ดาวน์โหลดกรมธรรม์</span></a
        >
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li>
        <a class="dropdown-item" @click="contactStaff" title="ติดต่อเจ้าหน้าที่"
          ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
        >
      </li>
      <li>
        <a class="dropdown-item" @click="deleteDraft" title="ลบแบบร่างนี้"
          ><span class="icon-trash">ลบแบบร่างนี้</span></a
        >
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { HistoryResponse } from "~/shared/entities/order-entity";

const props = defineProps({
  row: {
    type: Object as () => HistoryResponse,
  },
});
const resume = () => {
  alert("resume");
};
const pay = () => {
  alert("pay");
};

const trackStatus = () => {
  alert("trackStatus");
};

const policyDetail = () => {
  alert("policyDetail");
};
const download = ()=>{
    alert("download");
}
const contactStaff = () => {
  alert("contactStaff");
};
const deleteDraft = () => {
  alert("deleteDraft");
};
</script>
