<template>
    <dialog id="staff-dialog" v-show="_show">
        <div class="dialog-card">
            <div class="card-header">
                <button class="btn btn-close btn-close-modal" @click="closeModal(false)">ปิด</button>
            </div>
            <div class="card-body">
                <OrderCompulsoryThanksContact></OrderCompulsoryThanksContact>
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

const onLoad = onMounted(async () => {
  if (props.show) {
    openModal();
  }
});

function openModal() {
  _show.value = props.show;
  const dialogLoading = document.getElementById("staff-dialog");
  if (dialogLoading) dialogLoading.showModal();
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