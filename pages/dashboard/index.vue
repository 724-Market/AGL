<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

        <div class="row">
            <div class="col col-main">

                <div id="stats-overview" class="stats-group">
                    <FormKit type="group" v-model="overviewStats">

                        <div class="stats-header">
                            <FormKit type="togglebuttons" name="isPersonalView" :value="true" :options="[
        { label: 'ส่วนตัว', value: true },
        { label: 'ทีมงาน', value: false },
    ]" enforced />
                            <div class="stats-date">
                                <p>ข้อมูลเมื่อ 16/06/2024 - 31/07/2024</p>
                            </div>
                        </div>

                        <div class="option-stats-overview" v-if="overviewStats.isPersonalView === true">

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">ยอดขายส่วนตัว (บาท)</h5>
                                        <span class="value">477,546</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-sack-dollar fa-swap-opacity"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">รายได้ส่วนตัว (บาท)</h5>
                                        <span class="value">56,243</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-badge-percent"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">จำนวนผู้ช่วย</h5>
                                        <span class="value">3<small>/10</small></span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-users"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="option-stats-overview" v-else>

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">ยอดขายทีมงาน (บาท)</h5>
                                        <span class="value">1,342,378</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-sack-dollar fa-swap-opacity"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">ค่าสายงาน (บาท)</h5>
                                        <span class="value">92,231</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-hand-holding-circle-dollar"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper">
                                    <div class="stat-header">
                                        <h5 class="topic">จำนวนสมาชิก</h5>
                                        <span class="value">256</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-users-medical fa-swap-opacity"></i>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </FormKit>
                </div>

                <div id="stats-level" class="stats-group">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Card title</h3>
                            <h4 class="card-subtitle">Card subtitle</h4>
                        </div>
                        <div class="card-body">
                            <p>Some quick example text to build on the card title and make up the bulk of the card's
                                content. With supporting text below as a natural lead-in to additional content.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <ElementsDialogLoading :propsLoading="loadingProps" />

        <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
            :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    </NuxtLayout>
</template>

<script setup lang="ts">
const overviewStats = ref()

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
    loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
    isShowModal.value = false
}

/////////////////////////////////////////

/////////////////////////////////////////
// Mounted
onMounted(async () => {
    openLoadingDialog(true)
    // await loadAffiliateProductList()
    openLoadingDialog(false)
})

/////////////////////////////////////////


/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-headless'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'แดชบอร์ด'
const pageCategory = 'แดชบอร์ด'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'page-dashboard single-dashboard'
    }
})
</script>