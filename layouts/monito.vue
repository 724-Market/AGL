<template>
  <!--  Sidenav -->
  <nav class="sidenav navbar fixed-left navbar-expand" id="sidenav-main">
    <div class="scrollbar-inner">
      <header class="sidenav-header">
        <!--  Brand -->
        <div class="navbar-brand">
          <NuxtLink to="/main" title="กลับไปหน้าหลัก">กลับไปหน้าหลัก</NuxtLink>
        </div>

        <!--  Sidenav toggler -->
        <div class="sidenav-toggler-wrapper">
          <a id="btn-sidenav-close" class="sidenav-toggler" href="#" title="เมนู">
            <div class="sidenav-toggler-inner">
              <div class="sidenav-toggler-line"></div>
            </div>
          </a>
        </div>
      </header>

      <ElementsMonitoSidenav />
    </div>
  </nav>

  <div class="sidenav-backdrop"></div>

  <!-- Main content-->
  <main class="main-content">
    <!--  Topbar -->
    <div class="navbar-top">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoTopbar />
        </div>
      </div>
    </div>

    <!--  Header -->
    <header class="site-header">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoHeader :page-title="pageTitle" :page-category="pageCategory" :show-page-steps="showPageSteps"
            :show-page-header="showPageHeader" :show-logo-header="showLogoHeader" />
        </div>
      </div>
    </header>

    <!--  Page content -->
    <article class="site-content">
      <div class="container-fluid">
        <slot />
      </div>
    </article>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoFooter />
        </div>
      </div>
    </footer>

    <!-- <ElementsDialogConfirm v-if="isConfirm" :modal-show="isConfirm" :modal-type="ModalType.Warning"
      :modal-title="'ยืนยันการต่อเวลาใช้งานระบบ'" :modal-text="textConfirm" @on-confirm-modal="onConfirm"
      @on-close-modal="onCloseConfirm" /> -->

    <ElementsDialogConfirms :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
      :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
      @on-accept-confirm="handleAcceptConfirm" @on-close-confirm="handleCloseConfirm" />

  </main>
</template>

<script setup lang="ts">
import { getActivePinia } from 'pinia'

const store = useStoreUserAuth()

/////////////////////////////////////////
// Define router
const router = useRouter()

/////////////////////////////////////////
// Confirm Dialog
const isShowConfirm = ref(false)
const confirmType = ref('')
const confirmTitle = ref('')
const confirmText = ref('')
const confirmButton = ref('')
const confirmCancelButton = ref('')

// Function to handle close confirm events
const handleCloseConfirm = async () => {
  isShowConfirm.value = false
  await clearStore()

  // Redirect to the login page after cancel event
  router.push('/agent/login')
}

// Function to handle accept confirm events
const handleAcceptConfirm = async () => {
  const { AuthenInfo } = storeToRefs(store)
  const refresToken = AuthenInfo.value ? AuthenInfo.value.refresh_token : ""
  const oldAccessToken = AuthenInfo.value ? AuthenInfo.value.oldAccessToken ?? "" : ""
  console.log('refresToken',refresToken)
  if (refresToken && refresToken != "") {
    const data = await store.refreshToken(refresToken,oldAccessToken)

    if (data) {
      // recheck renewal token success ? 
      const expireTime = useTokenManage().getExpireSecondTime(data?.accessToken)
      if(expireTime>0)
      {
        useUtility().setCookie("old_access_token", oldAccessToken ?? "", 1)
        useUtility().setCookie("access_token", data?.accessToken ?? "", 1)
        useUtility().setCookie("refresh_token", data?.refresh_token ?? "", 1)
      }
      else{
       await handleCloseConfirm()
      }
      
    }
  }

  isShowConfirm.value = false

  // Refresh all data
  await refreshNuxtData()
}

/////////////////////////////////////////
// Function get token
const getToken = async () => {
  const token = await useUtility().getToken()
  const expireTime = useTokenManage().getExpireSecondTime(token)
console.log('expireTime',expireTime)
  if (expireTime > 0) {
    const reduceTime = expireTime - (2 * 60 * 1000) // คำนวณ expire Date ของ token ก่อน 2 นาที

    if (reduceTime > 0) {
      setTimeout(showModalConfirm, reduceTime)
    } else {
      showModalConfirm()
    }
  }
  else{
    showModalConfirm()
  }
}

/////////////////////////////////////////
const showModalConfirm = () => {
  isShowConfirm.value = true
  confirmType.value = 'warning'
  confirmTitle.value = 'เหลือเวลาการใช้งานระบบอีก 2 นาที'
  confirmText.value = 'เนื่องด้วยเหตุผลด้านความปลอดภัย หากต้องการจะใช้งานระบบต่อ กรุณาคลิกที่ปุ่มใช้งานระบบต่อ'
  confirmButton.value = 'ใช้งานระบบต่อ'
  confirmCancelButton.value = 'ออกจากระบบ'
}

////////////////////////////////////////
const clearStore = async () => {
  // Reset Pinia store
  getActivePinia()._s.forEach(store => {
    store.$reset() // Reset the store's state
    store.$dispose() // Dispose of the store instance
    sessionStorage.removeItem(store.$id) // Remove sessionStorage of the store instance
  })
}

/////////////////////////////////////////
// Props from page setup
const props = defineProps({
  pageTitle: String,
  pageCategory: String,
  layoutClass: String,
  showPageSteps: Boolean,
  showPageHeader: Boolean,
  showLogoHeader: Boolean,
})

/////////////////////////////////////////
// Mounted
onMounted(async () => {

  await getToken()

  // Close sidenav by default
  document.body.classList.remove('sidenav-show')

  const sideNavOpen = document.getElementById('btn-sidenav-open')
  const sideNavClose = document.getElementById('btn-sidenav-close')

  sideNavOpen?.addEventListener('click', (e) => {
    document.body.classList.add('sidenav-show')
    e.preventDefault()
  })

  sideNavClose?.addEventListener('click', (e) => {
    document.body.classList.remove('sidenav-show')
    e.preventDefault()
  })
})

/////////////////////////////////////////
// Define head
useHead({
  bodyAttrs: {
    class: props.layoutClass,
  },
})
</script>
