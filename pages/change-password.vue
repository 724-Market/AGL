<template>
  <NuxtLayout :name="layout">
    <LoginChangePassword />
  </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "login"

// Define meta seo
useHead({
  title: "Change Password",
  meta: [{ name: "description", content: "Change Password" }],
  bodyAttrs: {
    class: "page-change-password",
  },
})
</script>