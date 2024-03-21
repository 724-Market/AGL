<template>
  <Teleport to="body">
    <dialog id="papers-dialog">
      <div class="dialog-card">
        <div class="card-header">
          <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
        </div>
        <div class="card-body">
          <figure class="dialog-icon"><i class="fa-solid fa-layer-group"></i></figure>
          <h5>คลังกระดาษ</h5>
          <ul class="nav nav-tabs justify-content-center nav-fill" id="papers-stock-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="compulsory-tab" data-bs-toggle="tab"
                data-bs-target="#compulsory-tab-pane" type="button" role="tab" aria-controls="compulsory-tab-pane"
                aria-selected="true">พ.ร.บ.</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="voluntary-tab" data-bs-toggle="tab" data-bs-target="#voluntary-tab-pane"
                type="button" role="tab" aria-controls="voluntary-tab-pane" aria-selected="false" tabindex="-1"
                disabled>ประเภท</button>
            </li>
          </ul>
        </div>

        <div class="card-body card-table">
          <div class="tab-content papers-stock-tabs">
            <div class="tab-pane fade show active" id="compulsory-tab-pane" role="tabpanel"
              aria-labelledby="compulsory-tab" tabindex="0">
              <div class="papers-stock-table">
                <table class="table no-striped">
                  <thead>
                    <tr>
                      <th>รายการกระดาษ</th>
                      <th class="text-end">จำนวนที่มี (แผ่น)</th>
                    </tr>
                  </thead>
                  <tbody v-if="pledgePaperOnhandBalanceGet && pledgePaperOnhandBalanceGet.length > 0">
                    <tr class="product" v-for="(item, i) in pledgePaperOnhandBalanceGet" v-bind:key="i">
                      <td>
                        <div class="item">
                          <figure class="brand">
                            <img :src="`https://724.co.th/image/logo_insurance_company/logo_${item.Company}.png`"
                              alt="">
                          </figure>
                          <div class="info">
                            <h6> {{ item.Brand }} </h6>
                            <p>ราคามัดจำ<span class="big"> {{ item.Model }} </span></p>
                          </div>
                        </div>
                      </td>
                      <td class="text-end quantity"> {{ item.Quantity }} </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="2"><span class="empty-cart">คุณยังไม่มีกระดาษในคลัง</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="tab-pane fade" id="voluntary-tab-pane" role="tabpanel" aria-labelledby="voluntary-tab"
              tabindex="0">
              <div class="papers-stock-table">
                <table class="table no-striped">
                  <thead>
                    <tr>
                      <th>รายการกระดาษ</th>
                      <th class="text-end">จำนวนที่มี (แผ่น)</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div class="card-footer">
          <button type="button" class="btn-secondary" @click="hideNext">
            <i class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
          </button>

        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import type {
  PledgePaperOnhandBalanceReq,
  PledgePaperOnhandBalanceRes
} from "~/shared/entities/pledge-entity";
// Define emit function to emit events on confirm
const emit = defineEmits(['onCloseConfirm', 'onAcceptConfirm', 'onConfirmAndGo'])
const pledgePaperOnhandBalanceGet: globalThis.Ref<PledgePaperOnhandBalanceRes[] | undefined> = ref([]);


// Define props for the component
const props = defineProps({
  isShowPaper: Boolean,
})

// Function to emit the 'onAcceptConfirm' event
const confirmModal = () => emit('onAcceptConfirm')

// Function to emit the 'onCloseConfirm' event
const hideModal = () => emit('onCloseConfirm')

// Function to emit the 'onCloseConfirm' event
const hideNext = () => emit('onConfirmAndGo')


// on Mounted
onMounted(() => {
  // Selecting the close and cancel buttons
  const closeDialogPaper = document.querySelector('.btn-close-modal')
  const cancelDialogPaper = document.querySelector('.btn-cancel-modal')


  // Showing the dialog confirm if isShowPaper prop is true
  if (props.isShowPaper) showDialogPaper()
})

// Function to show the dialog confirm
function showDialogPaper() {
  const dialogPaper = document.getElementById('papers-dialog')

  // Check if the dialogPaper exists and show it
  if (dialogPaper) dialogPaper.showModal()
}

// Function to hide the dialog confirm
function hiddenDialogPaper() {
  const dialogPaper = document.getElementById('papers-dialog')

  // Check if the dialogPaper exists and close it
  if (dialogPaper) dialogPaper.close()
}

const loadPledgeHistoryPaymentAddList = async (productID: string) => {
  const req: PledgePaperOnhandBalanceReq = {
    ProductID: productID,
  };
  const response = await useRepository().pledge.paperOnhandBalanceGet(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      pledgePaperOnhandBalanceGet.value = response.apiResponse.Data;

      return pledgePaperOnhandBalanceGet.value
    } else {
      // data not found
    }
  } else {
  }
};

// Watcher to detect changes in isShowPaper prop
watch(() => props.isShowPaper, () => {
  // If isShowPaper changes, show or hide the confirm accordingly
  if (props.isShowPaper) {
    loadPledgeHistoryPaymentAddList("");
    new Promise((r) => setTimeout(r, 1000))
    showDialogPaper()
  } else {
    hiddenDialogPaper()
  }
})
</script>