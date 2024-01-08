<template>
  <Teleport to="body">
    <dialog id="loading-dialog">
      <div :class="['dialog-card', 'loading-card', { 'no-icon': !loadingLogo, 'no-text': !loadingText }]">
        <div class="loading-icon" v-if="loadingLogo">
          <div class="logo"></div>
        </div>
        <div class="loading-loader">
          <span class="loading-bar">
            <span class="loading-progress"></span>
          </span>
        </div>
        <div class="loading-text" v-if="loadingText">กรุณารอสักครู่</div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  isShowLoading: Boolean,
  loadingLogo: Boolean,
  loadingText: Boolean,
})

// on Mounted
onMounted(() => {
  const dialogLoading = document.getElementById('loading-dialog')

  // Adding keydown listeners for handling keys
  dialogLoading.addEventListener('keydown', handleKeyDown)

  // Showing the dialog loading if isShowLoading prop is true
  if (props.isShowLoading) showDialogLoading()
})

// Function to show the dialog loading
function showDialogLoading() {
  const dialogLoading = document.getElementById('loading-dialog')

  // Check if the dialogModal exists and show it
  if (dialogLoading) dialogLoading.showModal()
}

// Function to hide the dialog loading
function hiddenDialogLoading() {
  const dialogLoading = document.getElementById('loading-dialog')

  // Check if the dialogModal exists and close it
  if (dialogLoading) dialogLoading.close()
}

// Function to handle keydown events
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
  }
  if (event.key === 'Alt') {
    hiddenDialogLoading()
  }
}

// Watcher to detect changes in isShowLoading prop
watch(() => props.isShowLoading, () => {
  // If isShowLoading changes, show or hide the loading accordingly
  if (props.isShowLoading) {
    showDialogLoading()
  } else {
    hiddenDialogLoading()
  }
})
</script>