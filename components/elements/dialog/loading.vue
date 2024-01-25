<template>
  <Teleport to="body">
    <dialog id="loading-dialog">
      <div
        :class="['dialog-card', 'loading-card', { 'no-icon': !propsLoading.showLogo, 'no-text': !propsLoading.showText }]">
        <div class="loading-icon" v-if="propsLoading.showLogo">
          <div class="logo"></div>
        </div>
        <div class="loading-loader">
          <span class="loading-bar">
            <span class="loading-progress"></span>
          </span>
        </div>
        <div class="loading-text" v-if="propsLoading.showText">กรุณารอสักครู่</div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
// Define props for the component
const props = defineProps(['propsLoading'])

// Function to show the dialog loading
const showDialogLoading = () => {
  const dialogLoading = document.getElementById('loading-dialog')
  if (dialogLoading) dialogLoading.showModal() // Check if the dialogLoading exists and show it
}

// Function to hide the dialog loading
const hideDialogLoading = () => {
  const dialogLoading = document.getElementById('loading-dialog')

  // Check if the dialogLoading exists and close it
  if (dialogLoading) {
    dialogLoading.close()

    // Reset isShowLoading to false
    props.propsLoading.isShowLoading = false
  }
}

// Function to handle keydown events
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault()
  }
  if (event.key === 'Alt') {
    hideDialogLoading()
  }
}

// on Mounted
onMounted(() => {
  // Get the loading dialog element
  const dialogLoading = document.getElementById('loading-dialog')

  // Add a keydown event listener for handling keys
  if (dialogLoading) dialogLoading.addEventListener('keydown', handleKeyDown)

  // Watch for changes in the isShowLoading prop
  watch(() => props.propsLoading.isShowLoading, (newValue) => {
    // If isShowLoading changes, show or hide the loading dialog accordingly
    if (newValue) {
      showDialogLoading()
    } else {
      hideDialogLoading()
    }
  })
})
</script>