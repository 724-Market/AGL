<template>
    <dialog id="support-dialog">
        <div class="dialog-card">
            <div class="card-header">
                <button class="btn btn-close btn-close-support">ปิด</button>
            </div>

            <div class="card-body">
                <div class="support">
                    <figure class="dialog-icon">
                        <i class="fa-regular fa-messages-question"></i>
                    </figure>

                    <header>
                        <h6 class="topic">ติดต่อเจ้าหน้าที่</h6>
                        <p class="subtopic">เจ้าหน้าที่พร้อมให้บริการที่ไลน์ <a href="https://lin.ee/3sktdef" rel="noopener" target="_blank" title="@724training">@724training</a> <br>หรือ โทรศัพท์ <a href="tel:020266274" title="02-026-6274">02-026-6274</a></p>
                    </header>

                    <figure class="qr-line">
                        <p>สแกน QR เพื่อเพิ่มเพื่อนในไลน์</p>
                        <img src="https://qr-official.line.me/gs/M_sqg9780m_GW.png" alt="@724training">
                    </figure>

                    <span>หรือ</span>
                    <p>คลิกปุ่มเพิ่มเพื่อนด้านล่างได้เลย</p>
                    <a class="btn-success" href="https://lin.ee/3sktdef" rel="noopener" target="_blank" title="เพิ่มเพื่อน"><i class="fa-brands fa-line"></i>เพิ่มเพื่อน</a>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script setup>
onMounted(() => {
    const dialogSupport = document.getElementById('support-dialog')
    const openDialogSupport = document.querySelectorAll('.btn-open-support')
    const closeDialogSupport = document.querySelector('.btn-close-support')

    openDialogSupport.forEach(function(openItem) {
        openItem.addEventListener('click', function(event) {
            event.preventDefault()
            dialogSupport.showModal()
        })
    })

    closeDialogSupport.addEventListener('click', function() {
        dialogSupport.close()
    })
})
</script>