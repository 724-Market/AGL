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
            <ElementsUtilitiesPaper />

            <div class="card-shortcut is-warning is-mini" v-if="!isHidden">
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

            <div class="card-shortcut is-info is-mini" v-if="!isHidden">
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

<script setup>
const isHidden = ref(true)
</script>