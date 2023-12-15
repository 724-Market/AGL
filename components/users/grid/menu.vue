
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
        <a class="dropdown-item" title="ดูประวัติ"
          ><span class="emit-profile" id="profile" :data-id="$props.row.UserID">ดูประวัติ</span></a
        >
        <a class="dropdown-item" title="แก้ไขข้อมูล"
          ><span class="emit-profile" id="profile" :data-id="$props.row.UserID">แก้ไขข้อมูล</span></a
        >
      <li v-if="props.row?.IsActive == false">
        <a class="dropdown-item"  title="ลบผู้ช่วยนี้"
          ><span class="emit-trash" id="delete" :data-id="$props.row.UserID">ลบผู้ช่วยนี้</span></a
        >
      </li>
    </ul>
  </div>
</template>
  
  <script setup lang="ts">
  import {
    UsersHistoryResponse
  } from "~/shared/entities/user-entity";
  
  const props = defineProps({
    row: {
      type: Object as () => UsersHistoryResponse,
    },
  });
  </script>
  