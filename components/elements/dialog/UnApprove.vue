<template>
    <Teleport to="body">
      <dialog id="unapprove-dialog">
        <div :class="['dialog-card', 'is-' + confirmTypeClass]">
          <div class="card-header">
            <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
          </div>
          <div class="card-body">
            <figure v-if="confirmTypeClass !== ''" class="dialog-icon">
              <div :class="['icon', iconClasses[confirmTypeClass]]"></div>
            </figure>
            <figure v-else class="dialog-icon">
              <i class="fa-regular fa-circle-question"></i>
            </figure>
            <h5 v-if="confirmTitle">{{ confirmTitle }}</h5>
            <p v-if="confirmText">{{ confirmText }}</p>
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
  
  <script setup>
  // Define emit function to emit events on confirm
  const emit = defineEmits(['onCloseConfirm', 'onAcceptConfirm'])
  
  // Define props for the component
  const props = defineProps({
    isShowUnApprove: Boolean,
    confirmType: String,
    confirmTitle: String,
    confirmText: String,
    confirmButton: String,
    confirmCancelButton: String,
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
  const confirmModal = () => emit('onAcceptConfirm')
  
  // Function to emit the 'onCloseConfirm' event
  const hideModal = () => emit('onCloseConfirm')
  
  // on Mounted
  onMounted(() => {
    console.log("modal unapprove")
    // Selecting the close and cancel buttons
    const closeDialogConfirm = document.querySelector('.btn-close-modal')
    const cancelDialogConfirm = document.querySelector('.btn-cancel-modal')
  
    // Adding click event listeners to the close and cancel buttons
    closeDialogConfirm.addEventListener('click', hiddenDialogConfirm)
    cancelDialogConfirm.addEventListener('click', hiddenDialogConfirm)
  
    // Showing the dialog confirm if isShowUnApprove prop is true
    if (props.isShowUnApprove) showDialogConfirm()
  })
  
  // Function to show the dialog confirm
  function showDialogConfirm() {
    const dialogConfirm = document.getElementById('unapprove-dialog')
  
    // Check if the dialogConfirm exists and show it
    if (dialogConfirm) dialogConfirm.showModal()
  }
  
  // Function to hide the dialog confirm
  function hiddenDialogConfirm() {
    const dialogConfirm = document.getElementById('unapprove-dialog')
  
    // Check if the dialogConfirm exists and close it
    if (dialogConfirm) dialogConfirm.close()
  }
  
  // Watcher to detect changes in isShowUnApprove prop
  watch(() => props.isShowUnApprove, () => {
    // If isShowUnApprove changes, show or hide the confirm accordingly
    if (props.isShowUnApprove) {
      showDialogConfirm()
    } else {
      hiddenDialogConfirm()
    }
  })
  </script>