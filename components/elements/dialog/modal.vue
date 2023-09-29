<template>
  <dialog id="modal-dialog">
    <div class="dialog-card">
      <!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
      <div class="card-header">
        <button class="btn btn-close btn-close-modal">ปิด</button>
      </div>
      <div class="card-body">
        <figure v-if="$props.modalType == 'success'" class="dialog-icon">
          <div class="icon check"></div>
        </figure>
        <figure v-else-if="$props.modalType == 'danger'" class="dialog-icon">
          <div class="icon cross"></div>
        </figure>
        <figure v-else-if="$props.modalType == 'warning'" class="dialog-icon">
          <div class="icon exclamation"></div>
        </figure>
        <figure v-else-if="$props.modalType == 'info'" class="dialog-icon">
          <div class="icon question"></div>
        </figure>
        <figure v-else class="dialog-icon">
          <i class="fa-regular fa-thumbs-up"></i>
        </figure>
        <h5>{{ $props.modalTitle }}</h5>
        <p>{{ $props.modalText }}</p>
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
        <button class="btn-primary btn-cancel-modal">ตกลง</button>
      </div>
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps({
  modalType: String,
  modalTitle: String,
  modalText: String,
  modalShow: Boolean,
});

onMounted(() => {
  const closeDialogModal = document.querySelector(".btn-close-modal");
  const cancelDialogModal = document.querySelector(".btn-cancel-modal");
  console.log(props.modalShow);

  closeDialogModal.addEventListener("click", hiddenDialogModal);
  cancelDialogModal.addEventListener("click", hiddenDialogModal);

  if (props.modalShow) {
    showDialogModal();
  }
});

function showDialogModal() {
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.showModal();
}

function hiddenDialogModal() {
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.close();
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
