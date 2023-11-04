
<template>
     <dialog id="modal-dialog" v-if="props.modalShow">
    <div class="dialog-card">
      <!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
      <div class="card-header">
        <button class="btn btn-close btn-close-modal">ปิด</button>
      </div>
      <div class="card-body">
        <figure class="dialog-icon" v-if="$props.modalType">
          <div :class="`${useMapData().getStyleIconColor($props.modalType)}`"></div>
        </figure>
        <figure v-else class="dialog-icon">
          <i class="fa-regular fa-thumbs-up"></i>
        </figure>
        <h5>{{ $props.modalTitle }}</h5>
        <p v-if="$props.modalType" :class="`${useMapData().getStyleColor($props.modalType)}`">{{ $props.modalText }}</p>
      </div>
      <!-- <div class="card-footer">
                <button class="btn-primary">ตกลง</button>
                <button class="btn-gray btn-cancel-modal">ยกเลิก</button>
            </div> -->
      <!-- <div class="card-footer">
                <button class="btn-danger">ยืนยันการลบ</button>
                <button class="btn-gray btn-cancel-modal">ยกเลิก</button>
            </div>-->
      <div class="card-footer">
        <button class="btn-gray btn-cancel-modal" type="button">ไม่ใช่</button>
        <button v-if="$props.modalType"  :class="`${useMapData().getStyleButtonColor($props.modalType)}`" type="button" @click="onConfirmModal()">ใช่</button>
      </div>
    </div>
  </dialog>
</template>
<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity";
const emits = defineEmits(['onConfirmModal','onCloseModal'])
const props = defineProps({
  modalType: Object as ()=>ModalType,
  modalTitle: String,
  modalText: String,
  modalShow: Boolean,
});
onMounted(() => {
  const closeDialogModal = document.querySelector(".btn-close-modal");
  const cancelDialogModal = document.querySelector(".btn-cancel-modal");
  console.log(props.modalShow);

  if(closeDialogModal)closeDialogModal.addEventListener("click", hiddenDialogModal);
  if(cancelDialogModal) cancelDialogModal.addEventListener("click", hiddenDialogModal);

  if (props.modalShow) {
    showDialogModal();
  }
});

const onConfirmModal = ()=>{
  emits('onConfirmModal')
  hiddenDialogModal()
}

function showDialogModal() {
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.showModal();
}

function hiddenDialogModal() {
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.close();
  emits('onCloseModal')

}
watch(
  () => props.modalShow,
  () => {
    console.log('modal change values',props.modalShow)
    if (props.modalShow) {
      showDialogModal();
    } else {
      hiddenDialogModal();
    }
  }
);
</script>