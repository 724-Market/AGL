<template>
  <Teleport to="body">
    <dialog id="modal-dialog">
      <div :class="['dialog-card', 'is-' + modalTypeClass]">
        <div class="card-header">
          <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
        </div>
        <div class="card-body">
          <figure v-if="modalTypeClass !== ''" class="dialog-icon">
            <div :class="['icon', iconClasses[modalTypeClass]]"></div>
          </figure>
          <figure v-else class="dialog-icon">
            <i class="fa-regular fa-circle-question"></i>
          </figure>
          <h5 v-if="modalTitle">{{ modalTitle }}</h5>
          <p v-if="modalText">{{ modalText }}</p>
        </div>
        <div class="card-footer">
          <button type="button" class="btn-primary btn-cancel-modal" @click="hideModal">
            {{ modalButton ? modalButton : 'ตกลง' }}
          </button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
// Define emit function to emit events on modal
const emit = defineEmits(['onCloseModal'])

// Define props for the component
const props = defineProps({
  isShowModal: Boolean,
  modalType: String,
  modalTitle: String,
  modalText: String,
  modalButton: String,
})

// Computed property to determine the class based on modalType
const modalTypeClass = computed(() => {
  switch (props.modalType) {
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

// Mapping icons class based on modalType 
const iconClasses = {
  info: 'info',
  warning: 'exclamation',
  success: 'check',
  danger: 'cross',
}

// Function to emit the 'onCloseModal' event
const hideModal = () => emit('onCloseModal')

// on Mounted
onMounted(() => {
  // Selecting the close and cancel buttons
  const closeDialogModal = document.querySelector('.btn-close-modal')
  const cancelDialogModal = document.querySelector('.btn-cancel-modal')

  // Adding click event listeners to the close and cancel buttons
  closeDialogModal.addEventListener('click', hiddenDialogModal)
  cancelDialogModal.addEventListener('click', hiddenDialogModal)

  // Showing the dialog modal if isShowModal prop is true
  if (props.isShowModal) showDialogModal()
})

// Function to show the dialog modal
function showDialogModal() {
  const dialogModal = document.getElementById('modal-dialog')

  // Check if the dialogModal exists and show it
  if (dialogModal) dialogModal.showModal()
}

// Function to hide the dialog modal
function hiddenDialogModal() {
  const dialogModal = document.getElementById('modal-dialog')

  // Check if the dialogModal exists and close it
  if (dialogModal) dialogModal.close()
}

// Watcher to detect changes in isShowModal prop
watch(() => props.isShowModal, () => {
  // If isShowModal changes, show or hide the modal accordingly
  if (props.isShowModal) {
    showDialogModal()
  } else {
    hiddenDialogModal()
  }
})
</script>