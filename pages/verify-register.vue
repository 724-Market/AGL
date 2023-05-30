<template>
    <NuxtLayout :name="layout">
        <LoginVerifyRegister />
    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
    title: "Verify Register",
    meta: [{ name: "description", content: "Verify Register" }],
    bodyAttrs: {
        class: "page-verify-register",
    },
})
</script>