<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col">

        <div class="card card-center">

          <div class="card-header">
            <h1 class="title">Logout</h1>
            <h2 class="subtitle">ออกจากระบบ</h2>
          </div>

          <div class="card-body">
            <div class="form-area">

              <div class="notice-warning">ท่านทำการออกจากระบบ Agent Love เรียบร้อยแล้ว</div>

              <NuxtLink class="btn" @click="doLogout" title="กลับไปหน้าเข้าสู่ระบบ">เข้าสู่ระบบอีกครั้ง</NuxtLink>

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
  const agentInfoStore = useAgentInfoStore()
  await useAsyncData(agentInfoStore.clearAgentInfo)
  await clearStore()
})

/////////////////////////////////////////
// Function to clear store
const clearStore = () => {

  // Reset Pinia store
  getActivePinia()._s.forEach(store => {
    sessionStorage.removeItem(store.$id) // Remove sessionStorage of the store instance
    //console.log(store.$id)
  })

}

const doLogout = async () => {
  window.location.href = '/agent/login'
}

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'Logout'
const pageCategory = 'ออกจากระบบ'
const pageDescription = 'Logout ออกจากระบบ'

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