<template>
  <div>
    <div class="card" v-for="(item,i) in exchangeDataList" :key="item.ProductID">
      <div class="card-body">
        <div class="package-item-new is-paper">
          <div class="detail">
            <figure class="brand">
              <img
                :src="`${ useUtility().getCompanyImage() }${item.ProductCompanyImage.replace('LOGO', 'logo')}`"
                alt=""
              />
            </figure>

            <div class="topic">
              <h4 class="title">{{ item.CompanyName }}</h4>
              <h5 class="subtitle">
                ราคามัดจำ
                <span class="big">{{
                  useUtility().getCurrency(item.ProductPrice, 0)
                }}</span>
              </h5>
            </div>
          </div>

          <div class="tags">
            <span class="badge">{{ item.ProductCompany }}</span>
            <span class="badge-bg-secondary">พ.ร.บ.</span>
            <span class="badge-info">{{
              useUtility().getCurrency(item.ProductPrice, 0)
            }}</span>
          </div>

          <div class="action">
            <div class="quantity">
              <div class="form-hide-label">
                <FormKit
                  v-model="item.Amount"
                  :name="`paperListAmount_${i}`"
                  type="number"
                  label="จำนวน"
                  :validation="`required|max:${item.ProductOnHandAmount}|between:1,${item.ProductOnHandAmount}`"
                  value="1"
                  min="1"
                  :max="item.ProductOnHandAmount"
                  :validation-messages="{
                    required: 'ระบุจำนวน',
                    between: 'จำนวนไม่ถูกต้อง',
                    max: 'จำนวนไม่เพียงพอ',
                  }"
                  inputmode="numeric"
                />
              </div>
              <span class="remain"
                >มีอยู่ {{ item.ProductOnHandAmount }} แผ่น</span
              >
            </div>

            <button class="btn-primary" type="button" @click="onSelection(item)">
              ใส่ตระกร้า
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="card">
      <div class="card-body">
        <div class="package-item-new is-paper">
          <div class="detail">
            <figure class="brand">
              <img
                src="https://724.co.th/image/logo_insurance_company/logo_TMW.png"
                alt=""
              />
            </figure>

            <div class="topic">
              <h4 class="title">ไทยศรีเออโก้</h4>
              <h5 class="subtitle">ราคามัดจำ <span class="big">1,000</span></h5>
            </div>
          </div>

          <div class="tags">
            <span class="badge">TMW</span>
            <span class="badge-bg-secondary">พ.ร.บ.</span>
            <span class="badge-info">1000</span>
          </div>

          <div class="action">
            <div class="quantity">
              <div class="form-hide-label">
                <FormKit
                  type="number"
                  label="จำนวน"
                  validation="required|max:30000|between:1,30000"
                  value="1"
                  min="1"
                  max="30000"
                  :validation-messages="{
                    required: 'ระบุจำนวน',
                    between: 'จำนวนไม่ถูกต้อง',
                    max: 'จำนวนไม่เพียงพอ',
                  }"
                  inputmode="numeric"
                />
              </div>
              <span class="remain">มีอยู่ 30,000 แผ่น</span>
            </div>

            <button class="btn-primary" type="button">ใส่ตระกร้า</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import {  ExchangeDataSummary, SearchMatchRes } from "~/shared/entities/paper-entity";
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo";
const emits = defineEmits(['onSelectMatch'])
const props = defineProps({
	MatchList: Array<SearchMatchRes>,

})

const storeExchange = useStoreExchangeDataInfo();
const exchangeDataList:globalThis.Ref<SearchMatchRes[]> =ref([])
const onLoad = onMounted(()=>{

  //loadExchangeDataList()
})
const onSelection = async(item:SearchMatchRes)=>{
  item.Amount = item.Amount ?? 1
  emits('onSelectMatch',item);
}
watch(()=>props.MatchList,()=>{
  if(props.MatchList)
  {
    exchangeDataList.value = props.MatchList
  }

  //loadExchangeDataList()
})
watch(
  () => storeExchange.$state,
  () => {
    console.log("storeExchange.$state", storeExchange.$state);
    const list = storeExchange.$state
    const exchangeList = exchangeDataList.value
    list.forEach((value,i)=>{
      
      const index = exchangeList.findIndex(x=>x.ProductID===value.Item.ProductID && x.WarehouseID===value.Item.WarehouseID)
      if(index>-1)
      {
        if( exchangeList[index].ProductOnHandAmount - value.Item.Amount>0)
        {
          exchangeList[index].ProductOnHandAmount = exchangeList[index].ProductOnHandAmount - value.Item.Amount
        }
        
      }
    })
    exchangeDataList.value = exchangeList

  },
  
);
// const loadExchangeDataList = ()=>{
//   let array:ExchangeDataSummary[] = [];
//   if(props.MatchList && props.MatchList.length>0)
//   {
//     props.MatchList.forEach((value,index)=>{
//       const item:ExchangeDataSummary = {
//         MatchItem:value,
//         Item:{
//           Amount:1,
//         ProductID:value.ProductID,
//         WarehouseID:value.WarehouseID
//         }

//       }
//       array.push(item)
//       exchangeDataList.value = array
//     })
//   }
// }

</script>
