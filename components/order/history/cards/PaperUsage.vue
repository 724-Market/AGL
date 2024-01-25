<template>
    <ElementsDialogPaperstock
      :isShowPaper="showPaper" 
      @on-confirm-and-go="handleGotoExchange"    
      @on-close-confirm="handleCloseConfirm"
    ></ElementsDialogPaperstock> 


    <div class="card-stat is-success is-small-warning">
        <div class="stat-wrapper has-info">
            <div class="stat-header">
                <h5 class="topic">มูลค่ากระดาษที่ใช้ได้<small>/ดำเนินการอยู่ (บาท)</small></h5>
                <span class="value">{{ paperBalanceRes?.PaperOnHandAvailable ? paperBalanceRes?.PaperOnHandAvailable : "-" }}<small>/{{ paperBalanceRes?.PaperPending ? paperBalanceRes?.PaperPending : "-"}}</small></span>
            </div>
            <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-scroll fa-swap-opacity"></i>
                </figure>
            </div>
            <div class="stat-info">
                <button type="button" class="btn-gray btn-open-papers" @click="handlerOpenPaperStock()"><i
                        class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
                <NuxtLink class="btn-secondary" to="/papers/exchange"><i
                        class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                </NuxtLink>
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
const showPaper = ref(false);
const isLoading = ref(false);
const router = useRouter();

const onLoad = onMounted(()=>{
  
  if(props.paperBalance)
  {
    const _paperBalanceRes = props.paperBalance as BalanceRes
    paperBalanceRes.value = _paperBalanceRes
  }
})

const handlerOpenPaperStock = () => {
    showPaper.value = true;
};
const handleCloseConfirm = async () => {
    showPaper.value = false;
};
const handleGotoExchange = async () => {
    router.push("/papers/exchange");
    showPaper.value = false;
};



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