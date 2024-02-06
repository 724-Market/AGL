<template>
    <Teleport to="body">
      <FormKit type="form" @submit="saveAddress" >
      <dialog :id="[preFix+'-dialog']">
        <div :class="['dialog-card', 'is-' + modalTypeClass]">
          <div class="card-header">
            <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
          </div>
          <div class="card-body">
            
            <RegisterFormAddress />
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
            <FormKit type="submit" class="btn-primary btn-cancel-modal">
              {{ modalButton ? modalButton : 'ตกลง' }}
            </FormKit>
          </div>
        </div>
      </dialog>
    </FormKit>
    </Teleport>
  </template>
  
  <script setup>
  const preFix = ref("address") // preFix ID

  // Define emit function to emit events on modal
  const emit = defineEmits(['onCloseAddress','onSaveAddress'])
  
  // Define props for the component
  const props = defineProps({
    isOpenDialogAddress: Boolean,
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
  const hideModal = () => emit('onCloseAddress')
  
  //const saveAddress = () => emit('onSaveAddress')
  
  
  // submit
  const saveAddress = async (formData) => {
   // console.log(formData)
//// ยิง API to save
    emit('onSaveAddress',formData)


  }



  // on Mounted
  onMounted(() => {
   //loadProvince ()
    // Selecting the close and cancel buttons
    const closeDialogModal = document.querySelector('.btn-close-modal')
    const cancelDialogModal = document.querySelector('.btn-cancel-modal')
  
    // Adding click event listeners to the close and cancel buttons
    closeDialogModal.addEventListener('click', hiddenDialogModal)
    cancelDialogModal.addEventListener('click', hiddenDialogModal)
  
    // Showing the dialog modal if isOpenDialogAddress prop is true
    if (props.isOpenDialogAddress) showDialogModal()
  })
  
  // Function to show the dialog modal
  function showDialogModal() {
    const dialogModal = document.getElementById(preFix.value+'-dialog')
  
    // Check if the dialogModal exists and show it
    if (dialogModal) dialogModal.showModal()
  }
  
  // Function to hide the dialog modal
  function hiddenDialogModal() {
    const dialogModal = document.getElementById(preFix.value+'-dialog')
  
    // Check if the dialogModal exists and close it
    if (dialogModal) dialogModal.close()
  }
  
  // Watcher to detect changes in isOpenDialogAddress prop
  watch(() => props.isOpenDialogAddress, () => {
    // If isOpenDialogAddress changes, show or hide the modal accordingly
    if (props.isOpenDialogAddress) {
      showDialogModal()
    } else {
      hiddenDialogModal()
    }
  })
  </script>