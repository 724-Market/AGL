<template>
  <Teleport to="body">
    <dialog id="papers-cancellation-dialog">
      <FormKit type="form" @submit="submitCancelPapers" :actions="false" id="form-papers"
        form-class="form-papers form-theme" :incomplete-message="false">
        <div class="dialog-card is-danger">
          <div class="card-header">
            <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
          </div>
          <div class="card-body">
            <figure class="dialog-icon">
              <i class="fa-kit fa-regular-scroll-circle-xmark"></i>
            </figure>
            <h5>เหตุผลในการยกเลิกรายการ</h5>

            <FormKit type="hidden" label="หมายเลขคำสั่งซื้อ" name="orderId" v-model="props.orderId" />

            <FormKit type="radio" name="RemarkMessage" :options="getRemarkListOptions" validation="required"
              :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block-stack" />

            <FormKit type="textarea" label="หมายเหตุ" rows="3" name="RemarkText" />
          </div>
          <div class="card-footer">
            <FormKit type="submit" label="ยืนยันการยกเลิกรายการ" name="papers-cancellation-submit" :classes="{
              input: 'btn-danger',
            }" :disabled="isLoading" :loading="isLoading" />
            <button type="button" class="btn-gray btn-cancel-modal" @click="hideModal">
              ปิดหน้าต่างนี้
            </button>
          </div>
        </div>
      </FormKit>
    </dialog>
  </Teleport>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  isShowCancel: Boolean,
  confirmText: String,
  orderId: String,
  getRemarkList: {
    type: Array,
    default: Array
  }
})

/////////////////////////////////////////
// Computed options list
const getRemarkListOptions = computed(() => {
  return props.getRemarkList.map(item => {
    return {
      label: item.Message,
      value: item.Message
    }
  })
})

/////////////////////////////////////////
// Loading state after form submiting
const isLoading = ref(false)

/////////////////////////////////////////
// Define emit function to emit events on confirm
const emit = defineEmits(['onCloseCancel', 'onSubmitCancel'])

// Function to emit the 'onSubmitCancel' event
const confirmModal = () => emit('onSubmitCancel')

// Function to emit the 'onCloseCancel' event
const hideModal = () => emit('onCloseCancel')

/////////////////////////////////////////
// Submit page
const submitCancelPapers = async (formData) => {

  const cancelOrderReq = {
    OrderNo: formData.orderId,
    RemarkSystem: formData.RemarkMessage,
    Remark: formData.RemarkText
  }

  const response = await useRepository().paper.cancelOrderByUser(cancelOrderReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    confirmModal()
  }
  else if (resultCheck.status === 'error') {
    alert(resultCheck.modalText)
  }
  else if (resultCheck.status === 'server-error') {
    alert(resultCheck.modalText)
  }
}

/////////////////////////////////////////
// on Mounted
onMounted(() => {
  // Selecting the close and cancel buttons
  const closeDialogConfirm = document.querySelector('.btn-close-modal')
  const cancelDialogConfirm = document.querySelector('.btn-cancel-modal')

  // Adding click event listeners to the close and cancel buttons
  closeDialogConfirm.addEventListener('click', hiddenDialogConfirm)
  cancelDialogConfirm.addEventListener('click', hiddenDialogConfirm)

  // Showing the dialog confirm if isShowCancel prop is true
  if (props.isShowCancel) showDialogConfirm()
})

// Function to show the dialog confirm
function showDialogConfirm() {
  const dialogConfirm = document.getElementById('papers-cancellation-dialog')

  // Check if the dialogConfirm exists and show it
  if (dialogConfirm) dialogConfirm.showModal()
}

// Function to hide the dialog confirm
function hiddenDialogConfirm() {
  const dialogConfirm = document.getElementById('papers-cancellation-dialog')

  // Check if the dialogConfirm exists and close it
  if (dialogConfirm) dialogConfirm.close()
}

// Watcher to detect changes in isShowCancel prop
watch(() => props.isShowCancel, () => {
  // If isShowCancel changes, show or hide the confirm accordingly
  if (props.isShowCancel) {
    showDialogConfirm()
  } else {
    hiddenDialogConfirm()
  }
})
</script>