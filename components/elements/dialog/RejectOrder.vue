<template>
  <Teleport to="body">
    <dialog id="confirm-dialog">
      <div :class="['dialog-card', 'is-' + confirmTypeClass]">
        <div class="card-header">
          <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
        </div>
        <!--         
        <div class="card-body">
          <figure v-if="confirmTypeClass !== ''" class="dialog-icon">
            <div :class="['icon', iconClasses[confirmTypeClass]]"></div>
          </figure>
          <figure v-else class="dialog-icon">
            <i class="fa-regular fa-circle-question"></i>
          </figure>
          <h5 v-if="confirmTitle">{{ confirmTitle }}</h5>
          <p v-if="confirmText">{{ confirmText }}</p>
        </div> -->

        <div class="card-body">
          <figure class="dialog-icon"><svg class="svg-inline--fa fa-regular-scroll-circle-xmark" aria-hidden="true"
              focusable="false" data-prefix="fak" data-icon="regular-scroll-circle-xmark" role="img"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="" style="width: 1.25em;">
              <path fill="currentColor"
                d="M0 112C0 67.8 35.8 32 80 32c106.7 0 213.3 0 320 0c44.2 0 80 35.8 80 80c0 26.9 0 53.8 0 80.7c-16.8 1.5-32.9 5.4-48 11.3c0-30.7 0-61.3 0-92c0-17.7-14.3-32-32-32c-82.2 0-164.5 0-246.7 0c4.3 9.8 6.7 20.6 6.7 32c0 96 0 192 0 288c0 17.7 14.3 32 32 32s32-14.3 32-32c0-16 0-32 0-48c0-26.5 21.5-48 48-48c.1 0 .3 0 .4 0c.2 0 .4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0c.1 0 .1 0 .2 0c.2 0 .4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0s.4 0 .6 0c.2 0 .5 0 .7 0c.2 0 .4 0 .6 0s.4 0 .6 0s.4 0 .6 0c.2 0 .3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0c.3 0 .7 0 1 0c.2 0 .3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0c.3 0 .7 0 1 0c.2 0 .3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0c.3 0 .7 0 1 0c.2 0 .3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0s.3 0 .5 0c-5.9 15.1-9.8 31.2-11.3 48c-.1 0-.1 0-.2 0c-.2 0-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0s-.3 0-.5 0c-.2 0-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0s-.4 0-.6 0c0 16 0 32 0 48c0 11.4-2.4 22.2-6.7 32c22.2 0 44.5 0 66.7 0c6.9 17.5 16.5 33.7 28.3 48c-56.1 0-112.2 0-168.3 0c-44.2 0-80-35.8-80-80c0-96 0-192 0-288c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 16 0 32 0 48c10.7 0 21.3 0 32 0c0 16 0 32 0 48c-10.7 0-21.3 0-32 0c-26.5 0-48-21.5-48-48c0-16 0-32 0-48zM352 368c0-79.5 64.5-144 144-144s144 64.5 144 144s-64.5 144-144 144s-144-64.5-144-144zm84.7-59.3c-6.2 6.2-6.2 16.4 0 22.6c12.2 12.2 24.5 24.5 36.7 36.7c-12.2 12.2-24.5 24.5-36.7 36.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0c12.2-12.2 24.5-24.5 36.7-36.7c12.2 12.2 24.5 24.5 36.7 36.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6c-12.2-12.2-24.5-24.5-36.7-36.7c12.2-12.2 24.5-24.5 36.7-36.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0c-12.2 12.2-24.5 24.5-36.7 36.7c-12.2-12.2-24.5-24.5-36.7-36.7c-6.2-6.2-16.4-6.2-22.6 0z">
              </path>
            </svg>
          </figure>
          <h5>เหตุผลในการยกเลิกรายการ</h5>
          <div class="form-hide-label">
            <div class="formkit-outer" data-type="radio">

              <fieldset class="formkit-fieldset" id="input_767">

                <ul class="formkit-options option-block-stack" data-type="radio">
                  <li class="formkit-option" v-for="(item, i) in $props.getRemarkList" :key="i">
                    <label class="formkit-wrapper">
                      <div class="formkit-inner">
                        <input class="formkit-input" type="radio" name="remark" :value="item.ID"
                          :id="'radio_' + i + '-option-insured'" aria-describedby="help-radio_38-option-insured"
                          @change="handleRadiochoises(item.Message)" />
                        <span class="formkit-decorator" aria-hidden="true"></span>
                      </div>
                      <span class="formkit-label">{{ item.Message }}</span>
                    </label>
                  </li>
                </ul>
              </fieldset>

            </div>
          </div>
          <div class="formkit-outer" data-type="textarea" data-empty="true">
            <div class="formkit-wrapper">
              <label class="formkit-label" for="input_0">หมายเหตุ</label>
              <div class="formkit-inner">
                <textarea rows="2" class="formkit-input" name="RemarkText" v-model="remarkText" ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button type="button" :class="'btn-' + confirmTypeClass" @click="confirmModal">
            {{ confirmButton ? confirmButton : 'ยืนยัน' }}
          </button>
          <button type="button" class="btn-gray btn-cancel-modal" @click="hideModal">
            {{ confirmCancelButton ? confirmCancelButton : 'ยกเลิก' }}
          </button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>


<script setup lang="ts">
import type {
  getRemarkListRes,
  cancelOrderReq,
} from "~/shared/entities/backendpaper-entity";
// Define emit function to emit events on confirm
const emit = defineEmits(['onCloseConfirm', 'onAcceptConfirm'])
const remarkID = ref('');
const remarkText = ref('');

// Define props for the component
const props = defineProps({
  isShowConfirm: Boolean,
  confirmType: String,
  confirmTitle: String,
  confirmText: String,
  confirmButton: String,
  confirmCancelButton: String,
  orderID: String,
  getRemarkList: {
    type: Array<getRemarkListRes>,
    default: Array<getRemarkListRes>,
  },
})

// Computed property to determine the class based on confirmType
const confirmTypeClass = computed(() => {
  switch (props.confirmType) {
    case 'info':
      return 'info'
    case 'warning':
      return 'warning'
    case 'success':
      return 'success'
    case 'danger':
      return 'danger'
    default:
      return ''
  }
})

// Mapping icons class based on confirmType 
const iconClasses = {
  info: 'info',
  warning: 'exclamation',
  success: 'check',
  danger: 'cross',
}

// Function to emit the 'onAcceptConfirm' event
const confirmModal = () => {
  if (remarkID.value) {
    cancelOrder(remarkID.value)
    emit('onAcceptConfirm')
  } else {
    alert("โปรดเลือกเงื่อนไขการยกเลิก!!!")
  }
}

const cancelOrder = async (id: string) => {
    const req: cancelOrderReq = {
        OrderNo: props.orderID ?? "",
        RemarkSystem: id,
        Remark: remarkText.value,
    };


    var response = await useRepository().backendpaper.cancelOrderByAdmin(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        
    } else {
        alert(response.apiResponse.ErrorMessage);
    }


}

// Function to emit the 'onCloseConfirm' event
const hideModal = () => emit('onCloseConfirm')

// on Mounted
onMounted(() => {
  console.log("RejectOrder on")
  // Selecting the close and cancel buttons
  //const closeDialogConfirm = document.querySelector('.btn-close-modal')
  //const cancelDialogConfirm = document.querySelector('.btn-cancel-modal')

  // Adding click event listeners to the close and cancel buttons
  //closeDialogConfirm.addEventListener('click', hiddenDialogConfirm)
  //cancelDialogConfirm.addEventListener('click', hiddenDialogConfirm)

  // Showing the dialog confirm if isShowConfirm prop is true
  if (props.isShowConfirm) showDialogConfirm()
})

function handleRadiochoises(id: string) {
  remarkID.value = id;
}

// Function to show the dialog confirm
function showDialogConfirm() {
  const dialogConfirm = document.getElementById('confirm-dialog')

  // Check if the dialogConfirm exists and show it
  if (dialogConfirm) dialogConfirm.showModal()
}

// Function to hide the dialog confirm
function hiddenDialogConfirm() {
  const dialogConfirm = document.getElementById('confirm-dialog')

  // Check if the dialogConfirm exists and close it
  if (dialogConfirm) dialogConfirm.close()
}


// Watcher to detect changes in isShowConfirm prop
watch(() => props.isShowConfirm, () => {
  // If isShowConfirm changes, show or hide the confirm accordingly
  if (props.isShowConfirm) {
    showDialogConfirm()
  } else {
    hiddenDialogConfirm()
  }
})
</script>