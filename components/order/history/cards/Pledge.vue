<template>
  <div class="card-stat is-success">
    <div class="stat-wrapper">
      <div class="stat-header">
        <h5 class="topic">เงินมัดจำที่ใช้ได้ <small>(บาท)</small></h5>
        <span class="value">{{ paperBalanceRes?.CreditAvailable }}</span>
      </div>
      <div class="stat-action">
        <figure class="figure">
          <i class="fa-duotone fa-wallet"></i>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type {
    BalanceRes
} from "~/shared/entities/paper-entity";
const props = defineProps({
  paperBalance:Object,

});

const paperBalanceRes: globalThis.Ref<BalanceRes | undefined> = ref();

const onLoad = onMounted(()=>{
  
  if(props.paperBalance)
  {
    const _paperBalanceRes = props.paperBalance as BalanceRes
    paperBalanceRes.value = _paperBalanceRes
  }

  })

watch(
  ()=>props.paperBalance,
  ()=>{
    if(props.paperBalance)
    {
      const _paperBalanceRes = props.paperBalance as BalanceRes
      paperBalanceRes.value = _paperBalanceRes
    }
  }
)

</script>