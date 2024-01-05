<template>
  <Teleport to="body">
  <dialog id="modal-dialog">
    <div :class="['dialog-card', 'is-'+$props.modalType]">
      <!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
      <div class="card-header">
        <button type="button" class="btn btn-close btn-close-modal">ปิด</button>
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
      <div class="card-footer">
        <button type="button" class="btn-primary btn-cancel-modal">ตกลง</button>
      </div>
    </div>
  </dialog>
  </Teleport>
</template>

<script setup>

const emit = defineEmits(['onCloseModal'])

const props = defineProps({
  modalType: String,
  modalTitle: String,
  modalText: String,
  dialogModal: Boolean,
});

onMounted(() => {

  const closeDialogModal = document.querySelector(".btn-close-modal");
  const cancelDialogModal = document.querySelector(".btn-cancel-modal");

  closeDialogModal.addEventListener("click", hiddenDialogModal);
  cancelDialogModal.addEventListener("click", hiddenDialogModal);

  if (props.dialogModal) {
    showDialogModal();
  }

});

function showDialogModal() {
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.showModal();
}

function hiddenDialogModal() {
  emit('onCloseModal')
  const dialogModal = document.getElementById("modal-dialog");
  if (dialogModal) dialogModal.close();
}

watch(
  () => props.dialogModal,
  () => {
    if (props.dialogModal) {
      showDialogModal();
    } else {
      hiddenDialogModal();
    }
  }
);
</script>
