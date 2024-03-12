<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitSetPassword" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">กำหนดรหัสผ่านใหม่</h1>
              <h2 class="subtitle">ควรสร้างรหัสผ่านที่ปลอดภัย</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                <ElementsFormPasswordWithConfirm />

              </div>

              <FormKit type="submit" label="ยืนยันใช้รหัสผ่านนี้" name="forgotpassword-submit" :classes="{
    input: 'btn-primary',
    outer: 'form-actions',
  }" :disabled="isLoading" :loading="isLoading" />
            </div>

          </div>

        </div>
      </div>

    </FormKit>

    <ElementsDialogLoading :propsLoading="loadingProps" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

  </NuxtLayout>
</template>

<script setup lang="ts">
// Define page meta
definePageMeta({
  middleware: [
    function (to, from) {
      // Define and check 'isSetPassword' status
      const isSetPassword = useState('set-password')

      // Abort navigation if 'isSetPassword' is false
      if (!isSetPassword.value) {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
      }

      // Set 'isSetPassword' to false after check
      isSetPassword.value = false
    }
  ]
})

/////////////////////////////////////////
// Define router and route
const router = useRouter()

/////////////////////////////////////////
// Status for notice user
const statusMessage = ref()
const statusMessageType = ref()

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
  await goNext()
}

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal'])

/////////////////////////////////////////
// Submit page
const submitSetPassword = async (formData: any) => {
  openLoadingDialog(true)

  // console.log(formData)

  const formRequest = {
    password: formData.password,
    passwordConfirm: formData.password_confirm
  }

  await new Promise((r) => setTimeout(r, 2000))

  openLoadingDialog(false)

  // Open modal dialog
  isShowModal.value = true
  modalType.value = 'success'
  modalTitle.value = 'กำหนดรหัสผ่านใหม่สำเร็จ'
  modalText.value = 'เราจะพาท่านไปหน้าเข้าสู่ระบบ'
  modalButton.value = 'รับทราบ'
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: '/agent' })
}

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'กำหนดรหัสผ่าน'
const pageCategory = 'ลืมรหัสผ่าน'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-set-password template-login'
  }
})
</script>