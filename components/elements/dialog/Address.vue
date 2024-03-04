<template>
  <Teleport to="body">
    <FormKit type="form" @submit="saveAddress" :actions="false" id="form-address" form-class="form-address form-theme"
      :incomplete-message="false">
      <dialog id="address-dialog">
        <div class="dialog-card">
          <div class="card-header">
            <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
          </div>
          <div class="card-body">
            <figure class="dialog-icon">
              <i class="fa-regular fa-map-location-dot"></i>
            </figure>
            <h5>ที่อยู่</h5>

            <div class="address-elements">
              <ElementsFormTheAddress :addressData="props.addressData" />
            </div>

          </div>
          <div class="card-footer">
            <FormKit type="submit" label="บันทึกข้อมูล" name="address-submit" :classes="{
              input: 'btn-primary btn-save',
              outer: 'form-actions',
            }" :disabled="isLoading" :loading="isLoading" />
          </div>
        </div>
      </dialog>
    </FormKit>
  </Teleport>
</template>
  
<script setup>
/////////////////////////////////////////
// Define props for the component
const props = defineProps({
  addressData: Object,
  isOpenDialogAddress: Boolean
})

/////////////////////////////////////////
// Define emit function to emit events on modal
const emit = defineEmits(['onCloseAddress', 'onSaveAddress'])

// Function to emit the 'onCloseModal' event
const hideModal = () => emit('onCloseAddress')

// Save submit
const saveAddress = async (formData) => {
  emit('onSaveAddress', formData)
}

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// on Mounted
onMounted(() => {
  // Selecting the close and cancel buttons
  const closeDialogModal = document.querySelector('.btn-close-modal')
  // const cancelDialogModal = document.querySelector('.btn-cancel-modal')

  // Adding click event listeners to the close and cancel buttons
  closeDialogModal.addEventListener('click', hiddenDialogModal)
  // cancelDialogModal.addEventListener('click', hiddenDialogModal)

  // Showing the dialog modal if isOpenDialogAddress prop is true
  if (props.isOpenDialogAddress) showDialogModal()
})

/////////////////////////////////////////
// Function to show the dialog modal
function showDialogModal() {
  const dialogModal = document.getElementById('address-dialog')

  // Check if the dialogModal exists and show it
  if (dialogModal) dialogModal.showModal()
}

// Function to hide the dialog modal
function hiddenDialogModal() {
  const dialogModal = document.getElementById('address-dialog')

  // Check if the dialogModal exists and close it
  if (dialogModal) dialogModal.close()
}

/////////////////////////////////////////
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