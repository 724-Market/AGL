
<template>
<!--   
    <div class="btn btn-actions"  title="ติดตามสถานะ1" :data-id="$props.row?.OrderNo">
      <span class="fa-regular fa-eye"></span>
    </div> -->

    <a class="btn btn-actions" :href="'/papers/status/' + $props.row.OrderNo" title="ติดตามสถานะ">
      <span class="fa-regular fa-eye"></span>
    </a>
  </template>
    
    <script setup lang="ts">
    import type { PaperHistoryResponse } from "~/shared/entities/paper-entity";
  
    const props = defineProps({
      row: {
        type: Object as () => PaperHistoryResponse,
      },
    });
    </script>
    