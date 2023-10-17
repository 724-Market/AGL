<template>
    <div class="shortcut-dropdown">
        <a class="monito-dropdown dropdown-toggle no-caret" href="#" role="button" title="ทางลัด" data-bs-toggle="dropdown"
            aria-expanded="false">
            <div class="shortcut">
                <span class="shortcut-text"><span>ทางลัด</span></span>
            </div>
        </a>
        <div class="shortcut-panel dropdown-menu dropdown-menu-dark dropdown-menu-end">
            <div class="card-shortcut is-success">
                <div class="shortcut-wrapper">
                    <div class="shortcut-figure">
                        <figure class="figure">
                            <i class="fa-duotone fa-wallet"></i>
                        </figure>
                    </div>
                    <div class="shortcut-info">
                        <h5 class="topic">เงินมัดจำที่ใช้ได้ <small>(บาท)</small></h5>
                        <span class="value">18,500</span>
                    </div>
                    <div class="shortcut-action">
                        <button type="button" class="btn-secondary btn-open-wallet"><i
                                class="fa-solid fa-wallet"></i>เติมเงิน</button>
                    </div>
                </div>
            </div>

            <div class="card-shortcut is-success">
                <div class="shortcut-wrapper is-stack">
                    <div class="shortcut-figure">
                        <figure class="figure">
                            <i class="fa-duotone fa-scroll fa-swap-opacity"></i>
                        </figure>
                    </div>
                    <div class="shortcut-info">
                        <h5 class="topic">มูลค่ากระดาษที่ใช้ได้ <small>(บาท)</small></h5>
                        <span class="value">1,500</span>
                    </div>
                    <div class="shortcut-action">
                        <button type="button" class="btn-white btn-open-papers"><i
                                class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
                        <a class="btn-secondary" href="paper-order-1.html"><i
                                class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ</a>
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