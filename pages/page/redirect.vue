<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col">
                <div class="loading-card">
                    <div class="loading-icon">
                        <div class="logo"></div>
                    </div>
                    <div class="loading-loader"><span class="loading-bar"><span class="loading-progress"></span></span>
                    </div>
                    <div class="loading-text">กรุณารอสักครู่</div>
                </div>
                <div class="text-center">
                    <button class="btn btn-open-loading d-inline-block" type="button">Open Loading</button>
                    <button class="btn btn-open-modal d-inline-block" type="button">Open Modal</button>
                    <button class="btn-secondary btn-open-wallet d-inline-block"><i
                            class="fa-solid fa-wallet"></i>เติมเงิน</button>
                </div>
            </div>
        </div>

        <ElementsDialogLoading />

        <ElementsDialogModal />

        <ElementsDialogPledge />

    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito -monito-minimal'
const showPageSteps = false
const showPageHeader = false

// Define page meta
const pageTitle = 'กรุณารอสักครู่'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'single-redirect',
    },
})
</script>