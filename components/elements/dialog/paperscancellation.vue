<template>
    <dialog id="papers-cancellation-dialog">
        <FormKit type="form" @submit="submitForm" :actions="false" id="form-papers" form-class="form-papers form-theme"
			:incomplete-message="false">
            <div class="dialog-card">
                <div class="card-header">
                    <button class="btn btn-close btn-close-papers-cancellation">ปิด</button>
                </div>

                <div class="card-body">
                    <figure class="dialog-icon">
                        <i class="fa-kit fa-regular-scroll-slash"></i>
                    </figure>
                    <h5>เหตุผลในการยกเลิกรายการ</h5>
                    
                    <div class="form-hide-label">
                        <ElementsFormPapersCancellation />
                    </div>

                    <FormKit type="textarea" label="หมายเหตุ" rows="3" />
                </div>

                <div class="card-footer">
                    <FormKit type="submit" label="ยืนยันการยกเลิกรายการ" name="papers-cancellation-submit" :classes="{
                        input: 'btn-danger',
                    }" :disabled="isLoading" :loading="isLoading" />
                    <button class="btn-white btn-cancel-papers-cancellation">ปิดหน้าต่างนี้</button>
                </div>
            </div>
        </FormKit>
    </dialog>
</template>

<script setup>

// Define Variables
// Loading state after form submiting
const isLoading = ref(true)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Submit form event
const submitForm = async (formData) => {

	// Add waiting time for debug
	await new Promise((r) => setTimeout(r, 1000))

}

// Initial modal
onMounted(() => {
    const dialogPapersCancellation = document.getElementById('papers-cancellation-dialog')
    const openDialogPapersCancellation = document.querySelector('.btn-open-papers-cancellation')
    const closeDialogPapersCancellation = document.querySelector('.btn-close-papers-cancellation')
    const cancelDialogPapersCancellation = document.querySelector('.btn-cancel-papers-cancellation')

    openDialogPapersCancellation.addEventListener('click', function() {
        dialogPapersCancellation.showModal()
    })

    closeDialogPapersCancellation.addEventListener('click', function() {
        dialogPapersCancellation.close()
    })

    cancelDialogPapersCancellation.addEventListener('click', function() {
        dialogPapersCancellation.close()
    })
})
</script>