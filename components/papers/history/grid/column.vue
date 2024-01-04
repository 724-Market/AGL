<template>
    <div v-if="props.field && props.field == 'order' && props.row">
      #{{ props.row.OrderNo }}<time datetime="2023-05-05 08:08">{{ useUtility().formatDate(props.row.CreateDate) }}</time>
    </div>
    <div v-if="props.field && props.field == 'agent' && props.row">
      #{{ props.row.AgentCode
      }}
    </div>
    <div v-if="props.field && props.field == 'delivery' && props.row">
      {{ props.row.DeliveryType }} 
    </div>
    <div v-if="props.field && props.field == 'amount' && props.row">
      {{ useUtility().getCurrency(props.row.TotalPrice,2) }}
    </div>
    <div v-if="props.field && props.field == 'status' && props.row">
      <div class="badge-dot badge-warning" v-if="props.row.OrderStatus == 'Prepare'">
        รอดำเนินการ<a class="cancel" title="ยกเลิก"><span class="icon-trash event-cancel-paper" :data-id="props.row.OrderNo">ยกเลิก</span></a>
      </div>
      <div class="badge-dot badge-info" v-else-if="props.row.OrderStatus == 'Delivery'">
        จัดส่งแล้ว
      </div>
      <div class="badge-dot badge-success" v-else-if="props.row.OrderStatus == 'Success'">
        สำเร็จ
      </div>
      <div class="badge-dot badge-danger" v-else-if="props.row.OrderStatus == 'Cancel'">
        ยกเลิกรายการ
      </div>
      
    </div>
  </template>
  <script lang="ts" setup>
  import type { PaperHistoryResponse } from "~/shared/entities/paper-entity";
  
  const props = defineProps({
    row: {
      type: Object as () => PaperHistoryResponse,
    },
    field: String,
    click:Function
  });
  
  const openChild = ()=>{
    alert('opened')
  }
  </script>
  