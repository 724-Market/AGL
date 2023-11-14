<template>
    <dialog id="emptycart-dialog">
        <div class="dialog-card is-warning">
            <div class="card-header">
                <button class="btn btn-close btn-close-emptycart">ปิด</button>
            </div>

            <div class="card-body">
                <figure class="dialog-icon">
                    <i class="icon exclamation"></i>
                </figure>
                <h5>รายการจะถูกลบ</h5>
                <p>การเปลี่ยนแปลงในครั้งนี้ จะทำให้รายการกระดาษที่ท่านได้เลือกไว้ ถูกลบออก</p>
            </div>

            <div class="card-footer">
                <button class="btn-warning btn-accept-emptycart" type="button">ยืนยันการเปลี่ยนแปลง</button>
                <button class="btn-white btn-close-emptycart" type="button">ยกเลิก</button>
            </div>
        </div>
    </dialog>
</template>

<script setup>

// Initial modal
onMounted(() => {
    const dialogEmptyCart = document.getElementById('emptycart-dialog')
    const openDialogEmptyCart = document.querySelectorAll('.btn-open-emptycart')
    const closeDialogEmptyCart = document.querySelectorAll('.btn-close-emptycart')
    const acceptDialogEmptyCart = document.querySelector('.btn-accept-emptycart')

    openDialogEmptyCart.forEach(function (openItem) {
        openItem.addEventListener('click', function () {
            dialogEmptyCart.showModal()
        })
    })

    closeDialogEmptyCart.forEach(function (closeItem) {
        closeItem.addEventListener('click', function () {
            dialogEmptyCart.close()
        })
    })

    acceptDialogEmptyCart.addEventListener('click', function () {
        // Remove class "cart-not-empty" on body
        document.querySelector('.cart-not-empty').classList.remove('cart-not-empty')
        dialogEmptyCart.close()
    })
})
</script>