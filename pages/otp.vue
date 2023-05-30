<template>
    <NuxtLayout :name="layout">
        <LoginOtp />
    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
    title: "OTP",
    meta: [{ name: "description", content: "OTP" }],
    bodyAttrs: {
        class: "page-otp",
    },
})
</script>