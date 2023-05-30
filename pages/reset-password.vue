<template>
  <NuxtLayout :name="layout">
    <LoginResetPassword />
  </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
  title: "Reset Password",
  meta: [{ name: "description", content: "Reset Password" }],
  bodyAttrs: {
    class: "page-reset-password",
  },
})
</script>