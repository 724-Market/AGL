<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitOTP" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Main content</h3>
            </div>
            <div class="card-body">

              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum culpa nisi quasi necessitatibus
                doloremque expedita ex, rem fugit velit voluptas explicabo molestias deleniti placeat laborum sunt
                cupiditate officia distinctio quaerat.</p>

            </div>
          </div>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <aside class="card">
              <div class="card-header">
                <h3 class="card-title">Sidebar</h3>
              </div>
              <div class="card-body">

                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum culpa nisi quasi necessitatibus
                  doloremque expedita ex, rem fugit velit voluptas explicabo molestias deleniti placeat laborum sunt
                  cupiditate officia distinctio quaerat.</p>

              </div>
            </aside>

            <FormKit type="submit" label="บันทึก" name="register-submit" :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }" :disabled="isLoading" :loading="isLoading" />

          </section>
        </div>
      </div>

    </FormKit>

    <ElementsDialogLoading :isShowLoading="isShowLoading" :loadingLogo="loadingLogo" :loadingText="loadingText" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    <ElementsDialogConfirms :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
      :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
      @on-accept-confirm="handleAcceptConfirm" @on-close-confirm="handleCloseConfirm" />

  </NuxtLayout>
</template>

<script setup lang="ts">
// Define router
const router = useRouter()

// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const isShowLoading = ref(false)
const loadingLogo = ref(false)
const loadingText = ref(true)

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
  isShowModal.value = false
}

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
}

// Function to handle accept confirm events
const handleAcceptConfirm = async () => {
  // Close confirm dialog
  isShowConfirm.value = false

  await new Promise((r) => setTimeout(r, 1000))

  // Open modal dialog
  isShowModal.value = true
  modalType.value = 'success'
  modalTitle.value = 'ทำงานได้ตามปกติเนอะ'
  modalText.value = 'ราบรื่นนนนนนนนนน'
  modalButton.value = 'รับทราบจ้าาาา'

  await new Promise((r) => setTimeout(r, 1000))

  await goNext()
}

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm'])

/////////////////////////////////////////

// Submit form event
const submitOTP = async (formData: any) => {

  isShowLoading.value = true

  await new Promise((r) => setTimeout(r, 1000))

  isShowLoading.value = false

  // Open confirm dialog
  isShowConfirm.value = true
  confirmType.value = 'danger'
  confirmTitle.value = 'แน่ใจ?'
  confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
  confirmCancelButton.value = 'อุ่ยยยย กดผิด'
  confirmButton.value = 'ไปต่อโลดดดด' // After confirm then goto `handleAcceptConfirm` function
}

// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: 'set-password' })
}

// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'ยืนยันด้วย OTP'
const pageCategory = 'ลงทะเบียนสมาชิกใหม่'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-register single-otp template-login'
  }
})
</script>