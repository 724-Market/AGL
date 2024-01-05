<template>
  <a v-if="$props.row" class="btn btn-actions" :href="'/papers/status/' + $props.row.OrderNo" title="ติดตามสถานะ">
    <span class="fa-regular fa-eye"></span>
  </a>
</template>
  
<script setup lang="ts">
// Define import
import type { PaperHistoryResponse } from "~/shared/entities/paper-entity"

// Define props
const props = defineProps({
  row: {
    type: Object as () => PaperHistoryResponse
  }
})
</script>