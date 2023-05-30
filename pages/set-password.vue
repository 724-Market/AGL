<template>
  <NuxtLayout :name="layout">
    <LoginSetPassword />
  </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
  title: "Set Password",
  meta: [{ name: "description", content: "Set Password" }],
  bodyAttrs: {
    class: "page-set-password",
  },
})
</script>