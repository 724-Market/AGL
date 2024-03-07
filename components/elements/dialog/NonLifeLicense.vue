<template>
  <Teleport to="body">
    <FormKit type="form" @submit="saveNonLifeLicense" :actions="false" id="form-nonlifelicense"
      form-class="form-nonlifelicense form-theme" :incomplete-message="false">
      <dialog id="nonlifelicense-dialog">
        <div class="dialog-card">
          <div class="card-header">
            <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
          </div>
          <div class="card-body">
            <figure class="dialog-icon">
              <i class="fa-solid fa-address-card"></i>
            </figure>
            <h5>ใบอนุญาตเป็นนายหน้าประกันวินาศภัย</h5>

            <div class="form-elements">
              <ElementsFormNonLifeLicense />
            </div>

          </div>
          <div class="card-footer">
            <FormKit type="submit" label="บันทึกข้อมูล" name="nonlifelicense-submit" :classes="{
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
  isOpenDialogNonLifeLicense: Boolean
})

/////////////////////////////////////////
// Define emit function to emit events on modal
const emit = defineEmits(['onCloseNonLifeLicense', 'onSaveNonLifeLicense'])

// Function to emit the 'onCloseNonLifeLicense' event
const hideModal = () => emit('onCloseNonLifeLicense')

// Save submit
const saveNonLifeLicense = async (formData) => {
  emit('onSaveNonLifeLicense', formData)
}

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// on Mounted
onMounted(() => {
  // Selecting the close and cancel buttons
  const closeDialogModal = document.querySelector('.btn-close-modal')

  // Adding click event listeners to the close and cancel buttons
  closeDialogModal.addEventListener('click', hiddenDialogModal)

  // Showing the dialog modal if isOpenDialogNonLifeLicense prop is true
  if (props.isOpenDialogNonLifeLicense) showDialogModal()
})

/////////////////////////////////////////
// Function to show the dialog modal
function showDialogModal() {
  const dialogModal = document.getElementById('nonlifelicense-dialog')

  // Check if the dialogModal exists and show it
  if (dialogModal) dialogModal.showModal()
}

// Function to hide the dialog modal
function hiddenDialogModal() {
  const dialogModal = document.getElementById('nonlifelicense-dialog')

  // Check if the dialogModal exists and close it
  if (dialogModal) dialogModal.close()
}

/////////////////////////////////////////
// Watcher to detect changes in isOpenDialogNonLifeLicense prop
watch(() => props.isOpenDialogNonLifeLicense, () => {
  // If isOpenDialogNonLifeLicense changes, show or hide the modal accordingly
  if (props.isOpenDialogNonLifeLicense) {
    showDialogModal()
  } else {
    hiddenDialogModal()
  }
})
</script>