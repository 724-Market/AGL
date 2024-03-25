<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col">

        <div class="card card-center">

          <div class="card-header">
            <h1 class="title">Session Expired</h1>
            <h2 class="subtitle">เซสชั่นหมดอายุ</h2>
          </div>

          <div class="card-body">
            <div class="form-area">

              <div class="notice-warning">มีการล็อกอินทิ้งไว้นานเกินเวลาที่กำหนด หรือมีการล็อกอินซ้อนจากเครื่องอื่น
              </div>

              <NuxtLink class="btn" to="/login" title="กลับไปหน้าเข้าสู่ระบบ">เข้าสู่ระบบอีกครั้ง</NuxtLink>

            </div>
          </div>

        </div>

      </div>
    </div>

  </NuxtLayout>
</template>

<script setup lang="ts">
/////////////////////////////////////////
// Import
import { getActivePinia } from 'pinia'

/////////////////////////////////////////
// Mounted
onMounted(async () => {
  await clearStore()
})

/////////////////////////////////////////
// Function to clear store
const clearStore = () => {

  // Reset Pinia store
  getActivePinia()._s.forEach(store => {
    store.$reset() // Reset the store's state
    store.$dispose() // Dispose of the store instance
    sessionStorage.removeItem(store.$id) // Remove sessionStorage of the store instance

    sessionStorage.removeItem('agentInfo')
  })
}

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'Session Expired'
const pageCategory = 'เซสชั่นหมดอายุ'
const pageDescription = 'Session Expired เซสชั่นหมดอายุ'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-utilities single-session-expired template-login'
  }
})
</script>

<style>
.btn {
  padding: 1rem;
  width: 100%;
}
</style>