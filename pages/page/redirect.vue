<template>
    <NuxtLayout :name="layout">

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
                    <button class="btn btn-open-loading d-inline-block">Open Loading</button>
                    <button class="btn btn-open-notice d-inline-block">Open Notice</button>
                </div>
            </div>
        </div>

        <ElementsDialogLoading />

    </NuxtLayout>
</template>

<script lang="ts" setup>
// Define layout
const layout = "monito"

// Define meta seo
useHead({
    title: "Redirect",
    meta: [{ name: "description", content: "Redirect" }],
    bodyAttrs: {
        class: "page-monito single-redirect",
    },
})
</script>