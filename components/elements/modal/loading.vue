<template>
  <dialog id="loading-dialog">
    <div class="dialog-card loading-card no-icon no-text">
      <div class="loading-icon">
        <div class="logo"></div>
      </div>
      <div class="loading-loader">
        <span class="loading-bar">
          <span class="loading-progress"></span>
        </span>
      </div>
      <div class="loading-text">กรุณารอสักครู่</div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: Boolean,
});

const _loading = ref(false);

watch(
  () => props.loading,
  () => {
    //  console.log('prop value changed', props.loading)
    if (props.loading) {
      openModal();
    } else {
      closeModal();
    }
  }
);
const onLoad = onMounted(() => {
  const dialogLoading = document.getElementById("loading-dialog");
  const openDialogLoading = document.querySelector(".btn-open-loading");
  if (openDialogLoading) openDialogLoading.addEventListener("click", showDialogLoading);
  if (dialogLoading) dialogLoading.addEventListener("keydown", handleKeyDown);

  function showDialogLoading() {
    if (dialogLoading) dialogLoading.showModal();
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
    }
    if (event.key === "Alt") {
      if (dialogLoading) dialogLoading.close();
    }
  }
  // const myModal = document.getElementById("modal_demo") as Element
  // modal = new $bootstrap.Modal(myModal);
  if (props.loading) {
    openModal();
  }
});
function openModal() {
  //modal.show()
  _loading.value = props.loading;
  const dialogLoading = document.getElementById("loading-dialog");
  if (dialogLoading) dialogLoading.showModal();
}

function closeModal() {
  //modal.hide()
  _loading.value = false;
  const dialogLoading = document.getElementById("loading-dialog");
  if (dialogLoading) dialogLoading.close();
}
</script>
