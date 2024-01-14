<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

  </NuxtLayout>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  middleware: [
    function () {
      const router = useRouter()

      // Redirect to `724` if no reference id
      router.push({ path: '/register/724' })
    }
  ]
})

// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'ลงทะเบียน'
const pageCategory = 'ลงทะเบียนสมาชิกใหม่'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-register single-register template-login'
  }
})
</script>