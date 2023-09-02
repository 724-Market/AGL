<template>
    <dialog id="staff-dialog" v-show="_show">
        <div class="dialog-card"><!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
            <div class="card-header">
                <button class="btn btn-close btn-close-modal" @click="closeModal(false)">ปิด</button>
            </div>
            <div class="card-body">
                <PaymentQrMethod></PaymentQrMethod>
            </div>
            <div class="card-footer">
                <button class="btn-primary" @click="closeModal(false)">ตกลง</button>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(["closeModal"]);

const props = defineProps({
  show: Boolean,
});

const _show = ref(false);

function openModal() {
  //modal.show()
  _show.value = props.show;
}

async function closeModal(refresh: boolean) {
  _show.value = false;
  const dialogLoading = document.getElementById("staff-dialog");
  if (dialogLoading) dialogLoading.close();
  emit("closeModal", refresh);
}

watch(
  () => props.show,
  () => {
    if (props.show) {
      openModal();
    } else {
      closeModal(false);
    }
  }
);

</script>