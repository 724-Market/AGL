<template>
  <div>
    <div class="card" v-for="item in exchangeData" :key="item.MatchItem.ProductID">
      <div class="card-body">
        <div class="package-item-new is-paper">
          <div class="detail">
            <figure class="brand">
              <img
                src="https://724.co.th/image/logo_insurance_company/logo_TIP.png"
                alt=""
              />
            </figure>

            <div class="topic">
              <h4 class="title">{{ item.MatchItem.CompanyName }}</h4>
              <h5 class="subtitle">
                ราคามัดจำ
                <span class="big">{{
                  useUtility().getCurrency(item.MatchItem.ProductPrice, 0)
                }}</span>
              </h5>
            </div>
          </div>

          <div class="tags">
            <span class="badge">{{ item.MatchItem.ProductCompany }}</span>
            <span class="badge-bg-secondary">พ.ร.บ.</span>
            <span class="badge-info">{{
              useUtility().getCurrency(item.MatchItem.ProductPrice, 0)
            }}</span>
          </div>

          <div class="action">
            <div class="quantity">
              <div class="form-hide-label">
                <FormKit
                  v-model="item.Item.Amount"
                  type="number"
                  label="จำนวน"
                  :validation="`required|max:30|between:1,${item.MatchItem.ProductOnHandAmount}`"
                  value="1"
                  min="1"
                  :max="item.MatchItem.ProductOnHandAmount"
                  :validation-messages="{
                    required: 'ระบุจำนวน',
                    between: 'จำนวนไม่ถูกต้อง',
                    max: 'จำนวนไม่เพียงพอ',
                  }"
                  inputmode="numeric"
                />
              </div>
              <span class="remain"
                >มีอยู่ {{ item.MatchItem.ProductOnHandAmount }} แผ่น</span
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
const emits = defineEmits(['onSelectMatch'])
const props = defineProps({
	MatchList: Array<SearchMatchRes>,

})

const exchangeData:globalThis.Ref<ExchangeDataSummary[]> =ref([])
const onLoad = onMounted(()=>{

  loadExchangeDataList()
})
watch(()=>props.MatchList,()=>{


  loadExchangeDataList()
})
const loadExchangeDataList = ()=>{
  let array:ExchangeDataSummary[] = [];
  if(props.MatchList && props.MatchList.length>0)
  {
    props.MatchList.forEach((value,index)=>{
      const item:ExchangeDataSummary = {
        MatchItem:value,
        Item:{
          Amount:1,
        ProductID:value.ProductID,
        WarehouseID:value.WarehouseID
        }

      }
      array.push(item)
      exchangeData.value = array
    })
  }
}
const onSelection = async(item:ExchangeDataSummary)=>{
  emits('onSelectMatch',item);
}
</script>
