<template>
  <div class="card">
    <div class="card-body card-table">

      <h5 class="card-title">รายการกระดาษ</h5>

      <div class="summary-table">
        <table class="table no-striped">
          <thead>
            <tr>
              <th scope="col">รายการกระดาษ</th>
              <th scope="col" class="text-center">จำนวน</th>
              <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="spacer">
              <td colspan="3"></td>
            </tr>
            <tr class="product" v-for="(item, i) in props.orderSub" v-bind:key="i">
              <th scope="row">ราคามัดจำ {{ item.ProductPrice }}<span>{{ item.SubCategory }} • <strong>{{ item.Brand
              }}</strong></span></th>
              <td class="quantity">X {{ item.Quantity }}</td>
              <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
            </tr>
            <tr class="product" v-for="(item, j) in props.ordersubFeedelivery" v-bind:key="j">
              <th scope="row">
                ค่าจัดส่ง
                <span>
                  {{ props.orderGet?.DeliveryChannelType }}
                </span>
              </th>
              <td class="quantity"></td>
              <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
            </tr>

            <tr class="spacer">
              <td colspan="3"></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td scope="col" v-if="props.orderGet?.OrderStatus === 'Cancel'">ยอดมัดจำที่คืนแล้ว</td>
              <td scope="col" v-else>ยอดมัดจำที่ใช้</td>
              <td scope="col"></td>
              <td scope="col" class="text-end price">{{
                useUtility().getCurrency($props.orderGet?.GrandPrice ?? 0, 2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
    <div class="card-footer" v-if="props.orderGet?.OrderStatus === 'Receive'">

      <div class="status-action">

        <button class="btn-outline-danger btn-open-papers-cancellation" type="button"
          @click="cancelPapersOrder">ยกเลิกรายการ</button>
      </div>

    </div>

    <div class="card-footer" v-if="props.orderGet?.OrderStatus === 'Delivery'">

      <div class="status-action">
        <button class="btn-primary btn-papers-received" type="button"
          @click="confirmReceived">ได้รับกระดาษครบแล้ว</button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderListRes, SubOrderListRes } from "~/shared/entities/paper-entity"

/////////////////////////////////////////
// Define emit function to emit events on status action
const emit = defineEmits(['onConfirmReceived', 'onCancelPapersOrder'])

// Function to emit the 'onConfirmReceived' event
const confirmReceived = () => emit('onConfirmReceived')

// Function to emit the 'onCancelPapersOrder' event
const cancelPapersOrder = () => emit('onCancelPapersOrder')

/////////////////////////////////////////
// Define Props
const props = defineProps({
  orderGet: {
    type: Object as () => OrderListRes,
  },
  orderSub: {
    type: Array<SubOrderListRes>,
    default: Array<SubOrderListRes>,
  },
  ordersubFeedelivery: {
    type: Array<SubOrderListRes>,
    default: Array<SubOrderListRes>,
  }
})
</script>