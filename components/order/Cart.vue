<template>
  <div class="selected-item">
    <figure class="brand">
      <img :src="companyImage" alt="companyName">
    </figure>

    <div class="detail">
      <h4 class="topic">พ.ร.บ. สำหรับรถยนต์นั่ง{{ carName }}</h4>
      <div class="tags">
        <span class="badge">{{ companyName }}</span>
        <span class="badge-info">พ.ร.บ</span>
        <span class="badge-bg-success" v-if="isOnline"><i class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span>
        <span class="badge-bg-orange" v-else><i class="fa-solid fa-clock-four"></i>ได้กรมธรรม์ 1-3 วันทำการ</span>
        <span class="badge-secondary"><i class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span>
      </div>
    </div>

    <div class="price">
      <span class="actual-price">{{ price }}</span>
      <span class="promotion">ค่าส่งเสริมการขาย {{ priceDiscount }} บาท</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isOnline: Boolean,
  companyName: String,
  companyImage: String,
  price: Number,
  priceDiscount: Number,
  carName: String
});
</script>
