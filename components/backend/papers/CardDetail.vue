<template>
    <div class="card">


        <div class="card-body card-table">

            <h5 class="card-title">รายการกระดาษ</h5>

            <div class="checked-all">

                <div class="formkit-outer" data-type="toggle" data-id="input_09" data-complete="true">
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
                            <th scope="row">ราคามัดจำ {{ item.Model }}<span>{{ item.SubCategory }} • {{ item.Brand }}</span>
                                <div class="toggle">
                                    <FormKit 
                                    type="toggle" 
                                    on-value="true" 
                                    off-value="false" 
                                    off-value-label="ไม่ครบ"
                                    on-value-label="ครบ"
                                    name="IsActive"
                                    @change="handleToggleChange(item.ID)" />
                                </div>
                                <!-- 
                                <div class="formkit-outer" data-type="toggle" data-id="input_00" data-complete="false">
                                    <div class="formkit-wrapper">
                                        <label class="formkit-inner" for="input_00" id="input_00_label">
                                            <input class="formkit-input" type="checkbox" id="input_00" value="false">
                                            <div class="formkit-track">
                                                <div class="formkit-thumb"></div>
                                            </div>
                                        </label>
                                        <label class="formkit-value-label" for="input_00">ไม่ครบ</label>
                                    </div>
                                </div> 
                            -->

                            </th>
                            <td class="quantity">X {{ item.Quantity }}</td>
                            <td class="text-end price">{{ useUtility().getCurrency(item.GrandAmount, 2) }}</td>
                        </tr>

                        <tr class="shipping" v-for="(item, j) in props.ordersubFeedelivery" v-bind:key="j">
                            <th scope="row">ค่าจัดส่ง{{ item.ProductPrice }}<span>{{ item.SubCategory }} {{ item.UseType }}
                                    {{ item.Brand }}</span></th>
                            <td></td>
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
                            <td scope="col" class="text-end price">{{ useUtility().getCurrency($props.orderGet?.GrandPrice,
                                2) }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>

        <div class="card-footer">

            <div class="status-action">
                <button class="btn-primary" type="button">กระดาษครบแล้ว เตรียมจัดส่ง</button>
                <!--                 
                <button class="btn-white btn-open-papers-cancellation" type="button">ยกเลิกรายการ</button> 
            -->

                <FormKit type="button" label="ยกเลิกรายการ" name="cancel-submit" :classes="{
                    input: 'btn-red btn-open-papers-cancellation',
                    outer: 'form-actions',
                }" @click="getRemarkRejectOrder" :disabled="isLoading" :loading="isLoading" />

            </div>

        </div>

    </div>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>

    <ElementsDialogRejectOrder :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
        :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
        :get-remark-list="getRemarkList" @on-accept-confirm="handleAcceptConfirm" @on-close-confirm="handleCloseConfirm" />
</template>

<script setup lang="ts">
import type {
    getOrderDetailRes,
    getRemarkListReq,
    getRemarkListRes,
    getSubOrderListRes
} from "~/shared/entities/backendpaper-entity";

// Loading state after form submiting
const isLoading = ref(false);/////////////////////////////////////////

/////////////////////////////////////////
// Confirm Dialog
const isShowConfirm = ref(false)
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
const itemID = ref('');

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
    ordersubFeedelivery: {
        type: Array<getSubOrderListRes>,
        default: Array<getSubOrderListRes>,
    }
});

function handleToggleChange(id: string) {
  itemID.value = id;
  console.log("handleToggleChange "+itemID.value)
}

const getRemarkRejectOrder = async () => {
    
    let req: getRemarkListReq = {
        Type: "PAPER_ORDER_USER",
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

// Function to handle close confirm events
const handleCloseConfirm = async () => {
  isShowConfirm.value = false
}

// Function to handle accept confirm events
const handleAcceptConfirm = async () => {
  // Close confirm dialog
  isShowConfirm.value = false

  await new Promise((r) => setTimeout(r, 1000))

  // Open modal dialog
  isShowModal.value = true
  modalType.value = 'success'
  modalTitle.value = 'ทำงานได้ตามปกติเนอะ'
  modalText.value = 'ราบรื่นนนนนนนนนน'
  modalButton.value = 'รับทราบจ้าาาา'

  await new Promise((r) => setTimeout(r, 1000))
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