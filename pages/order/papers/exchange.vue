<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
        <div class="row">
            <div class="col">
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>

// Define layout
const layout = "monito"
const layoutClass = "page-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "แลกกระดาษ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-order category-papers single-exchange",
    },
})
</script>