<template>
  <div class="summary-table">
    <table class="table no-striped" >
      <thead>
        <tr>
          <th scope="col">รายการกระดาษ</th>
          <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
        </tr>
      </thead>
      <tbody v-if="list && list.length>0">
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="product" v-for="(item,i) in $props.exchangeData" :key="item.MatchItem.ProductID">
          <th scope="row">
           {{ i+1 }}. {{ item.MatchItem.ProductName }}<span>พ.ร.บ. • {{ item.MatchItem.CompanyName }}</span
            ><a class="btn-delete" href="#" title="ลบรายการนี้"
              ><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a
            >
          </th>
          <td class="text-end price">
            {{ useUtility().getCurrency(item.MatchItem.ProductPrice,0) }}

            <FormKit
              type="stepNumber"
              label="ราคามัดจำ"
              :validation="`required|between:1,${item.MatchItem.ProductOnHandAmount}`"
              validation-label="Number"
              :value="item.Item.Amount"
              min="1"
              :max="item.MatchItem.ProductOnHandAmount"
              step="1"
              :validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }"
              readonly
            />
          </td>
        </tr>

        <tr class="shipping">
          <th scope="row">ค่าจัดส่ง<span>DHL Express</span></th>
          <td class="text-end price">50.00</td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
        <tr class="subtotal">
          <th scope="row">รวมราคามัดจำ</th>
          <td class="text-end price">7,050.00</td>
        </tr>
        <tr class="discount">
          <th scope="row">หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน 5,000 บาท</span></th>
          <td class="text-end price">-50.00</td>
        </tr>
        <tr class="spacer">
          <td colspan="2"></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="2"> <h4 class="text-center">คุณยังไม่ได้เลือกกระดาษ</h4></td>
        </tr>
       
      </tbody>
      <tfoot>
        <tr>
          <td scope="col">รวมยอดมัดจำที่ต้องใช้</td>
          <td scope="col" class="text-end price">6,000.00</td>
        </tr>
        <tr>
          <td scope="col">เงินมัดจำคงเหลือ</td>
          <td scope="col" class="text-end price">275,334.00</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script lang="ts" setup>
import {  ExchangeDataSummary } from "~/shared/entities/paper-entity";

import { SearchMatchRes } from "~/shared/entities/paper-entity";

const list:globalThis.Ref<ExchangeDataSummary[]> = ref([])

const props = defineProps({
  matchAllList:Array<SearchMatchRes>,
  exchangeData:Array<ExchangeDataSummary>,
})

watch(()=>props.exchangeData,()=>{
//   let array:ExchangeDataSummary[] = [];
//   if(props.exchangeData && props.exchangeData.length>0)
//   props.exchangeData.forEach((value,index)=>{
//     const itemFilter = props.matchAllList?.filter(x=>x.WarehouseID===value.WarehouseID && x.ProductID ===value.ProductID)
//     if(itemFilter && itemFilter.length>0)
//     {
//       const req:ExchangeDataSummary = {
//         MatchItem:itemFilter[0],
//         Item:value
//       }
//       array.push(req)
//       list.value = array;
//     }
// })


})
</script>
