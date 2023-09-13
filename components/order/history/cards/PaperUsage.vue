<template>
    <div class="card-stat is-success is-small-warning">
        <div class="stat-wrapper has-info">
            <div class="stat-header">
                <h5 class="topic">มูลค่ากระดาษที่ใช้ได้<small>/ดำเนินการอยู่ (บาท)</small></h5>
                <span class="value">1,500<small>/500</small></span>
            </div>
            <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-scroll fa-swap-opacity"></i>
                </figure>
            </div>
            <div class="stat-info">
                <button type="button" class="btn-gray btn-open-papers" href="#"><i
                        class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
                <NuxtLink class="btn-secondary" to="/order/papers/exchange"><i
                        class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                </NuxtLink>
            </div>
        </div>
    </div>
</template>