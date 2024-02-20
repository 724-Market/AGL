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
              <td scope="col">ยอดมัดจำที่ใช้</td>
              <td scope="col"></td>
              <td scope="col" class="text-end price">{{
                useUtility().getCurrency($props.orderGet?.GrandPrice ?? 0, 2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
    <div class="card-footer" v-if="props.orderGet?.OrderStatus == 'Receive'">

      <div class="status-action">
        <button class="btn-outline-danger btn-open-papers-cancellation" type="button" name="cancel-submit"
          @click="getRemarkRejectOrder">ยกเลิกรายการ</button>
      </div>

    </div>
  </div>

  <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>

  <ElementsDialogRejectOrder :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
    :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
    :get-remark-list="getRemarkList" :order-i-d="props.orderGet?.OrderNo" @on-accept-confirm="handleAcceptConfirm"
    @on-close-confirm="handleCloseConfirm" />
</template>

<script setup lang="ts">
import type {
  cancelOrderReq,
  OrderListRes,
  RemarkListReq,
  RemarkListRes,
} from "~/shared/entities/paper-entity"
import type { SubOrderListRes } from "~/shared/entities/paper-entity"

// Loading state after form submiting
const isLoading = ref(false)

const getRemarkList: globalThis.Ref<RemarkListRes[] | undefined> = ref([])
const router = useRouter()

/////////////////////////////////////////
// Confirm Dialog
const isShowConfirm = ref(false)
const confirmType = ref('')
const confirmTitle = ref('')
const confirmText = ref('')
const confirmButton = ref('')
const confirmCancelButton = ref('')

// Define Variables

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

// Function to handle accept confirm events
const handleAcceptConfirm = async (orderID: any, remarkID: any, remarkText: any) => {
  const req: cancelOrderReq = {
    OrderNo: orderID ?? "",
    RemarkSystem: remarkID,
    Remark: remarkText,
  }

  var response = await useRepository().paper.cancelOrderByUser(req)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    router.push({ path: "/papers" })
  } else {
    alert(response.apiResponse.ErrorMessage)
  }

  // Close confirm dialog
  isShowConfirm.value = false
}

// Function to handle close confirm events
const handleCloseConfirm = async () => {
  isShowConfirm.value = false
}

const getRemarkRejectOrder = async () => {

  let req: RemarkListReq = {
    Type: "PAPER_ORDER_USER",
  }

  isLoading.value = true

  var response = await useRepository().paper.remark(req)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    getRemarkList.value = response.apiResponse.Data

  } else {
    alert(response.apiResponse.ErrorMessage)
  }

  isLoading.value = false

  // Open Reject Order dialog
  isShowConfirm.value = true
  confirmType.value = 'danger'
  confirmTitle.value = 'เหตุผลในการยกเลิกรายการ?'
  confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
  confirmCancelButton.value = 'ไม่ยกเลิก'
  confirmButton.value = 'ยืนยัน' // After confirm then goto `handleAcceptConfirm` function
}
</script>