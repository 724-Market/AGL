<template>
    <NuxtLayout :name="layout">
        <Login />
    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
    title: "Log in",
    meta: [{ name: "description", content: "Log in" }],
    bodyAttrs: {
        class: "page-login",
    },
})
</script>