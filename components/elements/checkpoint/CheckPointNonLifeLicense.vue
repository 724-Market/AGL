<template>

  <div class="card-checkpoint">
    <div class="checkpoint-wrapper">
      <div class="checkpoint-icon">
        <figure class="figure">
          <i class="fa-duotone fa-plug-circle-plus"></i>
        </figure>
      </div>
      <div class="checkpoint-info">
        <h5 class="topic">เพิ่มใบอนุญาตวินาศภัย</h5>
        <button class="btn-secondary" type="button" @click="openDialogNonLifeLicense">คลิกเพื่อเพิ่ม</button>
      </div>
    </div>
  </div>

  <ElementsDialogNonLifeLicense :isOpenDialogNonLifeLicense="isOpenDialogNonLifeLicense"
    @on-close-non-life-license="handleCloseNonLifeLicense" @on-save-non-life-license="handleSaveNonLifeLicense" />

</template>

<script setup lang="ts">
/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseNonLifeLicense', 'onSaveNonLifeLicense'])

/////////////////////////////////////////
// Dialog Non life license
const isOpenDialogNonLifeLicense = ref(false)

// Function to open dialog events
const openDialogNonLifeLicense = () => {
  isOpenDialogNonLifeLicense.value = true
}

// Function to handle emit close dialog events
const handleCloseNonLifeLicense = () => {
  isOpenDialogNonLifeLicense.value = false
}

// Function to handle emit save dialog events
const handleSaveNonLifeLicense = async (nonlifelicenseData: any) => {
  // addressDataArray.value = addressData
  // addressDataNotValidation.value = false
  console.log(nonlifelicenseData)
  isOpenDialogNonLifeLicense.value = false
}

</script>