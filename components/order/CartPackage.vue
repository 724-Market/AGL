<template>
  <div class="selected-item" v-if="packageSelect">
    <figure class="brand">
      <img :src="getCompanyPath(packageSelect.PackageResult[0].CompanyImage)" alt="companyName" />
    </figure>

    <div class="detail">
      <h4 class="topic">พ.ร.บ. สำหรับรถยนต์นั่ง{{ packageSelect.PackageResult[0].UseCarName }}</h4>
      <div class="info">
        <span class="price">{{ getCurrency(packageSelect.PackageResult[0].PriceACT) }}</span>
        <p class="description">ค่าส่งเสริมการขาย {{ getCurrency(packageSelect.PackageResult[0].PriceACTDiscount) }} บาท</p>
      </div>
    </div>

    <div class="meta">
      <div class="tags">
        <span class="badge-bg-success" v-if="packageSelect.IsOnlineActive"
          ><i class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span
        >
        <span class="badge-bg-orange" v-else
          ><i class="fa-solid fa-clock-four"></i>ได้กรมธรรม์ 1-3 วันทำการ</span
        >
        <span class="badge-secondary" v-if="packageSelect.IsTaxInclude=='1'"
          ><i class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
                  


import { IPackageResponse } from '~/shared/entities/packageList-entity';

const props = defineProps({
  packageSelect:Object,

});

const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const onLoad = onMounted(()=>{

  
  if(props.packageSelect)
  {
    const _packageSelect = props.packageSelect as IPackageResponse
    packageSelect.value = _packageSelect
  }
})

const getCompanyPath = (CompanyImage: string): string => {
  const image = useUtility().getCompanyImage() + CompanyImage.replace("LOGO", "logo");

  return image;
};
const getCurrency = (currency: number): string => {
  const formatCurrency = useUtility().getCurrency(currency);

  return formatCurrency;
};

watch(
  ()=>props.packageSelect,
  ()=>{
    console.log(props.packageSelect)
    if(props.packageSelect){
      const _packageSelect = props.packageSelect as IPackageResponse
    packageSelect.value = _packageSelect

    }
  }
)
</script>
