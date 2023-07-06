<template>
    <dialog id="modal-dialog">
        <div class="dialog-card"><!-- Add class 'is-info', 'is-success', 'is-warning', 'is-danger' for color styling -->
            <div class="card-header">
                <button class="btn btn-close btn-close-modal">ปิด</button>
            </div>
            <div class="card-body">
                <figure v-if="success" class="dialog-icon">
                    <div class="icon check"></div>
                </figure>
                <figure v-if="danger" class="dialog-icon">
                    <div class="icon cross"></div>
                </figure>
                <figure v-if="warning" class="dialog-icon">
                    <div class="icon exclamation"></div>
                </figure>
                <figure v-if="info" class="dialog-icon">
                    <div class="icon question"></div>
                </figure>
                <figure v-else="default" class="dialog-icon">
                    <i class="fa-regular fa-thumbs-up"></i>
                </figure>
                <h5>หัวข้อใน dialog</h5>
                <p>กรุณารอสักครู่ กรุณารอสักครู่ กรุณารอสักครู่ กรุณารอสักครู่ กรุณารอสักครู่</p>
            </div>
            <div class="card-footer">
                <button class="btn-primary">ตกลง</button>
                <button class="btn-gray btn-cancel-modal">ยกเลิก</button>
            </div>
            <div class="card-footer">
                <button class="btn-primary">รับทราบ</button>
            </div>
        </div>
    </dialog>
</template>

<script setup>
defineProps({
    modalType: String
})

onMounted(() => {
    const dialogModal = document.getElementById('modal-dialog')
    const openDialogModal = document.querySelector('.btn-open-modal')
    const closeDialogModal = document.querySelector('.btn-close-modal')
    const cancelDialogModal = document.querySelector('.btn-cancel-modal')

    openDialogModal.addEventListener('click', showDialogModal)
    closeDialogModal.addEventListener('click', hiddenDialogModal)
    cancelDialogModal.addEventListener('click', hiddenDialogModal)

    function showDialogModal() {
        dialogModal.showModal()
    }

    function hiddenDialogModal() {
        dialogModal.close()
    }
})
</script>