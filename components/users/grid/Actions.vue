<template>
  <div class="dropdown" v-if="$props.row">
    <a class="btn btn-actions dropdown-toggle" href="#" role="button" title="เครื่องมือจัดการเพิ่มเติม"
      data-bs-toggle="dropdown" aria-expanded="false">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </a>

    <ul class="dropdown-menu">
      <li class="d-none">
        <NuxtLink class="dropdown-item action-history" :to="'/users/profile/' + $props.row.UserID" title="ดูประวัติ"><span
            class="icon-tracking emit-hitory" :data-id="$props.row.UserID">ดูประวัติ</span></NuxtLink>
      </li>
      <li>
        <a class="dropdown-item action-profile" :href="'/users/profile/' + $props.row.UserID" title="แก้ไขข้อมูล"><span
            class="icon-edit emit-profile">แก้ไขข้อมูล</span></a>
      </li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li v-if="props.row?.IsActive == false">
        <a class="dropdown-item action-delete" href="#" :data-id="$props.row.UserID" title="ลบผู้ช่วยนี้"><span
            class="icon-trash emit-delete" :data-id="$props.row.UserID">ลบผู้ช่วยนี้</span></a>
      </li>
    </ul>
  </div>
</template>
  
<script setup lang="ts">
// Define import
import type { UsersHistoryResponse } from "~/shared/entities/user-entity"

// Define props
const props = defineProps({
  row: {
    type: Object as () => UsersHistoryResponse
  }
})
</script>