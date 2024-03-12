<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

  </NuxtLayout>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  middleware: [
    function () {
      const router = useRouter()

      // Redirect to login for agent and user
      router.push({ path: '/agent/login' })
    }
  ]
})

// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = true

// Define page meta
const pageTitle = 'เข้าสู่ระบบ'
const pageCategory = 'เพื่อใช้งานระบบสมาชิก'
const pageDescription = 'เข้าสู่ระบบ เพื่อใช้งานระบบสมาชิก'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-login template-login'
  }
})
</script>