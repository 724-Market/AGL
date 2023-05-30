<template>
    <NuxtLayout :name="layout">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="available">Dashboard area</div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "monito"

// Define meta seo
useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "Dashboard" }],
    bodyAttrs: {
        class: "page-dashboard",
    },
})
</script>