<template>
    <div class="shortcut-dropdown">
        <a class="monito-dropdown dropdown-toggle no-caret" href="#" role="button" title="ทางลัด"
            data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <div class="shortcut">
                <span class="shortcut-text"><span>ทางลัด</span></span>
            </div>
        </a>
        <div class="shortcut-panel dropdown-menu dropdown-menu-dark dropdown-menu-end">

            <ElementsUtilitiesPledge />

            <div class="card-shortcut is-success">
                <div class="shortcut-wrapper is-stack">
                    <div class="shortcut-figure">
                        <figure class="figure">
                            <i class="fa-duotone fa-scroll fa-swap-opacity"></i>
                        </figure>
                    </div>
                    <div class="shortcut-info">
                        <h5 class="topic">มูลค่ากระดาษที่ใช้ได้ <small>(บาท)</small></h5>
                        <span class="value">0.00</span>
                    </div>
                    <div class="shortcut-action">
                        <button type="button" class="btn-white btn-open-papers"><i
                                class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
                        <NuxtLink class="btn-secondary" to="/papers/exchange"><i
                                class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <div class="card-shortcut is-warning is-mini">
                <a href="#">
                    <div class="shortcut-wrapper">
                        <div class="shortcut-figure">
                            <figure class="figure">
                                <i class="fa-duotone fa-timeline fa-rotate-90"></i>
                            </figure>
                        </div>
                        <div class="shortcut-info">
                            <h5 class="topic">ติดตามสถานะล่าสุด</h5>
                        </div>
                    </div>
                </a>
            </div>

            <div class="card-shortcut is-info is-mini">
                <a href="#">
                    <div class="shortcut-wrapper">
                        <div class="shortcut-figure">
                            <figure class="figure">
                                <i class="fa-duotone fa-heart-circle-plus fa-swap-opacity"></i>
                            </figure>
                        </div>
                        <div class="shortcut-info">
                            <h5 class="topic">ต่ออายุสมาชิก</h5>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>