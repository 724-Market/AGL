<template>
    <!-- <div class="card"> -->


    <FormKit type="form" @submit="handleConfirmOrder" :actions="false" id="form-papers" form-class="form-order form-theme"
    :incomplete-message="false">
        <div class="card-body card-table">

            <h5 class="card-title">รายการกระดาษ</h5>

            <div class="checked-all" v-if="props.orderGet?.OrderStatus == 'NotShow'">

                <div class="formkit-outer" data-type="toggle" data-id="input_09" data-complete="true" >
                    <div class="formkit-wrapper">
                        <label class="formkit-alt-label" for="input_09" data-label-alt="true">เตรียมกระดาษครบทั้งหมด</label>
                        <label class="formkit-inner" for="input_09" id="input_09_label">
                            <input class="formkit-input" type="checkbox" id="input_09" value="false">
                            <div class="formkit-track">
                                <div class="formkit-thumb"></div>
                            </div>
                        </label>
                    </div>
                </div>

            </div>

            <div class="summary-table is-admin">
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
                        <tr class="product" v-for="(item, i) in props.orderDetail" v-bind:key="i">
                            <th scope="row" v-if="item.UseType=='DeliveryFee'">ค่าจัดส่ง</th>
                            <th scope="row" v-else >ราคามัดจำ {{ item.Model }}<span>{{ item.SubCategory }} • {{ item.Brand }}</span>
                                <div class="toggle" v-if="props.orderGet?.OrderStatus == 'Receive'">
                                    <FormKit 
                                    type="toggle" 
                                    on-value="true" 
                                    off-value="false" 
                                    off-value-label="ไม่ครบ"
                                    validation="required|accepted"
                                    on-value-label="ครบ"
                                    name="IsActive"
                                    autocomplete="off" />
                                </div>

                            </th>
                            <td class="quantity">X {{ item.Quantity }}</td>
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
                            <td scope="col" class="text-end price">{{ useUtility().getCurrency($props.orderGet?.GrandPrice ?? 0, 2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <div class="card-footer">

            <div class="status-action" v-if="props.orderGet?.OrderStatus == 'Receive'">
                <!--                 
                <button class="btn-primary" type="button">กระดาษครบแล้ว เตรียมจัดส่ง</button> -->

                <FormKit type="submit" class="btn-primary" label="รับรายการ" name="papers-submit" id="papers-submit" :classes="{
                    input: 'btn-primary',
                    outer: 'form-actions',
                }" :disabled="isLoading" :loading="isLoading" />
                

                <FormKit type="button" label="ยกเลิกรายการ" name="cancel-submit" :classes="{
                    input: 'btn-red btn-open-papers-cancellation',
                    outer: 'form-actions',
                }" @click="getRemarkRejectOrder" :disabled="isLoading" :loading="isLoading" />

            </div>

            <div class="status-action" v-else-if="props.orderGet?.OrderStatus == 'Prepare'">
                <!--                 
                <button class="btn-primary" type="button">กระดาษครบแล้ว เตรียมจัดส่ง</button> -->

                <FormKit type="button" label="กระดาษครบแล้ว เตรียมจัดส่ง" name="papers-submit" :classes="{
                    input: 'btn-primary',
                    outer: 'form-actions',
                }" @click="handleConfirmDelivery" :disabled="isLoading" :loading="isLoading" />
                

                <FormKit type="button" label="ไม่อนุมัติ" name="cancel-submit" :classes="{
                    input: 'btn-red btn-open-papers-cancellation',
                    outer: 'form-actions',
                }" @click="handleConfirmUnApproveOrder" :disabled="isLoading" :loading="isLoading" />

            </div>

        </div>

    </FormKit>

    <!-- </div> -->
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>

    <ElementsDialogRejectOrder :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
        :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
        :get-remark-list="getRemarkList" :order-i-d="props.orderGet?.OrderNo" @on-accept-confirm="handleAcceptConfirm" 
        @on-close-confirm="handleCloseConfirm" />

    <ElementsDialogUnApprove :isShowUnApprove="isShowUnApprove" :confirm-type="confirmType" :confirm-title="confirmTitle"
      :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
      @on-accept-confirm="acceptUpApproveOrder" @on-close-confirm="handleCloseConfirm" />

</template>

<script setup lang="ts">
import type {
    cancelOrderReq,
    OrderNoReq,
    getOrderDetailRes,
    getRemarkListReq,
    getRemarkListRes,
    getSubOrderListRes
} from "~/shared/entities/backendpaper-entity";

// Loading state after form submiting
const isLoading = ref(false);/////////////////////////////////////////


const emit = defineEmits(['confirmOrderStatus', 'confirmOrderDelivery', 'reload']);
const router = useRouter()

/////////////////////////////////////////
// Confirm Dialog
const isShowConfirm = ref(false)
const isShowUnApprove = ref(false)
const confirmType = ref('')
const confirmTitle = ref('')
const confirmText = ref('')
const confirmButton = ref('')
const confirmCancelButton = ref('')

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

const getRemarkList: globalThis.Ref<getRemarkListRes[] | undefined> = ref([]);

// Define Variables

const props = defineProps({
    orderGet: {
        type: Object as () => getOrderDetailRes,
    },
    orderDetail: {
        type: Array<getSubOrderListRes>,
        default: Array<getSubOrderListRes>,
    },
});

// Function to handle close confirm events
const handleConfirmOrder = async () => {
  emit("confirmOrderStatus")
}

// Function to handle close confirm events
const handleConfirmDelivery = async () => {
  emit("confirmOrderDelivery")
}

// Function to handle close confirm events
const handleConfirmUnApproveOrder = async () => {
  // Open UnApprove Order dialog
    isShowUnApprove.value = true
    confirmType.value = 'danger'
    confirmTitle.value = 'ไม่อนุมัติรายการนี้?'
    confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
    confirmCancelButton.value = 'ไม่ยกเลิก'
    confirmButton.value = 'ยืนยัน' // After confirm then goto `handleAcceptConfirm` function
}

const getRemarkRejectOrder = async () => {
    
    let req: getRemarkListReq = {
        Type: "PAPER_ORDER_ADMIN",
    };

    isLoading.value = true

    var response = await useRepository().backendpaper.getRemarkList(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        getRemarkList.value = response.apiResponse.Data;
        
    } else {
        alert(response.apiResponse.ErrorMessage);
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

const acceptUpApproveOrder = async () => {
    const req: OrderNoReq = {
        OrderNo: props.orderGet?.OrderNo ?? "", // Provide a default value if OrderNo is undefined
    };
    isShowUnApprove.value = false

    isLoading.value = true

    var response = await useRepository().backendpaper.unApproveOrder(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        emit("reload")
    } else {
        alert(response.apiResponse.ErrorMessage);
    }

    isLoading.value = false
}

// Function to handle close confirm events
const handleCloseConfirm = async () => {
  isShowConfirm.value = false
  isShowUnApprove.value = false
}


// Function to handle accept confirm events
const handleAcceptConfirm = async (orderID: any, remarkID: any, remarkText: any) => {
    const req: cancelOrderReq = {
        OrderNo: orderID ?? "",
        RemarkSystem: remarkID,
        Remark: remarkText,
    };

    var response = await useRepository().backendpaper.cancelOrderByAdmin(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        router.push({ path: "/backend/papers" });      
    } else {
        alert(response.apiResponse.ErrorMessage);
    }

  // Close confirm dialog
  isShowConfirm.value = false
}


// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ติดตามสถานะ"
const pageCategory = "ตรวจสอบกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-status template-timeline"
    }
})
</script>