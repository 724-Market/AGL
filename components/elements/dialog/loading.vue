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

<script setup>
const onLoad = onMounted(() => {
    const dialogLoading = document.getElementById('loading-dialog')
    const openDialogLoading = document.querySelector('.btn-open-loading')

    openDialogLoading.addEventListener('click', showDialogLoading)
    dialogLoading.addEventListener('keydown', handleKeyDown)

    function showDialogLoading() {
        dialogLoading.showModal()
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault()
        }
        if (event.key === 'Alt') {
            dialogLoading.close()
        }
    }
})
</script>