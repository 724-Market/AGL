<template>
  <NuxtLayout :name="layout">
    <LoginForgotPassword />
  </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
  title: "Forgot Password",
  meta: [{ name: "description", content: "Forgot Password" }],
  bodyAttrs: {
    class: "page-forgot-password",
  },
})
</script>