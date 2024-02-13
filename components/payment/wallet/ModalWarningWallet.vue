<template>
  <dialog id="modal-dialog">
    <div class="dialog-card"><!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
      <div class="card-header">
        <button class="btn btn-close btn-close-modal">ปิด</button>
      </div>
      <div class="card-body">
        <figure class="dialog-icon">
          <div class="icon exclamation"></div>
        </figure>
        <h5>Warning</h5>
        <p>ยอดเงินใน Wallet ไม่เพียงพอกรุณาเติมเงิน</p>
      </div>
      <div class="card-footer">
        <button class="btn-primary">ตกลง</button>
      </div>

    </div>
  </dialog>
</template>

<script setup>
const emit = defineEmits(["clsoseWarning"]);

const props = defineProps({
  show: Boolean
});

const _show = ref(false);

const onLoad = onMounted(async () => {
  if (props._show) {
    _show.value = props._show
  }
})

watch(
  () => props.show,
  () => {
    console.log("prop value changed", props.show)
    if (props.show) {
      openModal();
    } else {
      closeModal(false);
    }
  }
);

function openModal() {
  _show.value = props.show
  const dialogLoading = document.getElementById("wallet-dialog")
  if (dialogLoading) dialogLoading.showModal()
}

function closeModal() {
  _show.value = false
  const dialogLoading = document.getElementById("wallet-dialog")
  if (dialogLoading) dialogLoading.close()
  emit("clsoseWarning")
}

</script>