<template>
    <dialog id="papers-dialog">
        <div class="dialog-card">
            <div class="card-header">
                <button class="btn btn-close btn-close-papers">ปิด</button>
            </div>
            <div class="card-body">
                <figure class="dialog-icon"><i class="fa-solid fa-layer-group"></i></figure>
                <h5>คลังกระดาษ</h5>
                <ul class="nav nav-tabs justify-content-center nav-fill" id="papers-stock-tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="compulsory-tab" data-bs-toggle="tab"
                            data-bs-target="#compulsory-tab-pane" type="button" role="tab"
                            aria-controls="compulsory-tab-pane" aria-selected="true">พ.ร.บ.</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="voluntary-tab" data-bs-toggle="tab"
                            data-bs-target="#voluntary-tab-pane" type="button" role="tab" aria-controls="voluntary-tab-pane"
                            aria-selected="false" tabindex="-1" disabled>ประเภท</button>
                    </li>
                </ul>
            </div>
            <div class="card-body card-table">
                <div class="tab-content papers-stock-tabs">
                    <div class="tab-pane fade show active" id="compulsory-tab-pane" role="tabpanel"
                        aria-labelledby="compulsory-tab" tabindex="0">
                        <div class="papers-stock-table">
                            <table class="table no-striped">
                                <thead>
                                    <tr>
                                        <th>รายการกระดาษ</th>
                                        <th class="text-end">จำนวนที่มี (แผ่น)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="product">
                                        <td>
                                            <div class="item">
                                                <figure class="brand">
                                                    <img src="https://724.co.th/image/logo_insurance_company/logo_TIP.png"
                                                        alt="">
                                                </figure>
                                                <div class="info">
                                                    <h6>ทิพยประกันภัย</h6>
                                                    <p>ราคามัดจำ<span class="big">200</span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-end quantity">5</td>
                                    </tr>
                                    <tr class="product">
                                        <td>
                                            <div class="item">
                                                <figure class="brand">
                                                    <img src="https://724.co.th/image/logo_insurance_company/logo_BKI.png"
                                                        alt="">
                                                </figure>
                                                <div class="info">
                                                    <h6>กรุงเทพประกันภัย</h6>
                                                    <p>ราคามัดจำ<span class="big">300</span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-end quantity">7</td>
                                    </tr>
                                    <tr class="product">
                                        <td>
                                            <div class="item">
                                                <figure class="brand">
                                                    <img src="https://724.co.th/image/logo_insurance_company/logo_DVS.png"
                                                        alt="">
                                                </figure>
                                                <div class="info">
                                                    <h6>เทเวศประกันภัย</h6>
                                                    <p>ราคามัดจำ<span class="big">500</span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-end quantity">12</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="voluntary-tab-pane" role="tabpanel" aria-labelledby="voluntary-tab"
                        tabindex="0">
                        <div class="papers-stock-table">
                            <table class="table no-striped">
                                <thead>
                                    <tr>
                                        <th>รายการกระดาษ</th>
                                        <th class="text-end">จำนวนที่มี (แผ่น)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <NuxtLink class="btn-secondary" to="/papers/exchange"><i
                        class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                </NuxtLink>
            </div>
        </div>
    </dialog>
</template>

<script setup>
onMounted(() => {
    const dialogPapers = document.getElementById('papers-dialog')
    const openDialogPapers = document.querySelector('.btn-open-papers')
    const closeDialogPapers = document.querySelector('.btn-close-papers')

    openDialogPapers.addEventListener('click', function () {
        dialogPapers.showModal()
    })

    closeDialogPapers.addEventListener('click', function () {
        dialogPapers.close()
    })
})
</script>