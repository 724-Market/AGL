
<template>
  <div class="dropdown">
    <a
      class="btn btn-ellipsis dropdown-toggle"
      @click="resume()"
      role="button"
      title="เครื่องมือจัดการเพิ่มเติม"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </a>
    <ul class="dropdown-menu">
      <li @click="resume()">
        <a class="dropdown-item"  title="ทำรายการต่อ"
          ><span class="icon-edit">ทำรายการต่อ</span></a
        >
      </li>
      <li @click="pay()">
        <a class="dropdown-item"  title="ชำระเงิน"
          ><span class="icon-payment">ชำระเงิน</span></a
        >
      </li>
      <li @click="trackStatus()">
        <a class="dropdown-item"  title="ติดตามสถานะ"
          ><span class="icon-tracking">ติดตามสถานะ</span></a
        >
      </li>
      <li @click="policyDetail()">
        <a class="dropdown-item"   title="รายละเอียดกรมธรรม์"
          ><span class="icon-policy">รายละเอียดกรมธรรม์</span></a
        >
      </li>
      <li @click="download()">
        <a class="dropdown-item"  title="ดาวน์โหลดกรมธรรม์"
          ><span class="icon-download-file">ดาวน์โหลดกรมธรรม์</span></a
        >
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li @click="contactStaff()" >
        <a class="dropdown-item" title="ติดต่อเจ้าหน้าที่"
          ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
        >
      </li>
      <li @click="deleteDraft()">
        <a class="dropdown-item"  title="ลบแบบร่างนี้"
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
