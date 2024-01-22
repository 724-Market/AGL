<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitOTP" :actions="false" id="form-register" form-class="form-register form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">ยืนยันด้วย OTP</h1>
              <h2 class="subtitle">ระบบได้ส่งรหัส OTP ไปที่หมายเลข<span class="badge-info ref-phone-otp"><b>{{
                getRefOTP.phoneNumber
              }}</b></span></h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                <ElementsFormOtp label="OTP" name="otp" id="otp" :propsOTP="getRefOTP" @on-resend-OTP="handleResendOTP" />

              </div>

              <FormKit type="submit" label="ยืนยันรหัส OTP" name="otp-submit" :classes="{
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
// Define import
import { getNode } from '@formkit/core'

/////////////////////////////////////////
// Define page meta
definePageMeta({
  middleware: [
    function (to, from) {
      // Define and check 'isOTP' status
      const isOTP = useState('otp')

      // Abort navigation if 'isOTP' is false
      if (!isOTP.value) {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
      }

      // Set 'isOTP' to false after check
      isOTP.value = false
    }
  ]
})

/////////////////////////////////////////
// Define variables
const getRefOTP = ref({
  phoneNumber: '',
  refCode: '',
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
  await requestOTP()
}

/////////////////////////////////////////
// Define emit function to emit events on all dialog and components
const emit = defineEmits(['onCloseModal', 'onResendOTP'])

/////////////////////////////////////////
// Function to handle close modal events
const handleResendOTP = async () => {
  isShowModal.value = false

  await requestOTP()
}

/////////////////////////////////////////
// Function request OTP
const requestOTP = async () => {
  console.log('request OTP')

  // Reset OTP field
  await resetOTPField()

  getRefOTP.value.phoneNumber = '089-XXX-X999'
  getRefOTP.value.refCode = 'ABCD'
}

/////////////////////////////////////////
// Function reset OTP field
const resetOTPField = async () => {
  const otpField = getNode('otp')
  otpField?.reset()
}

/////////////////////////////////////////
// on Mounted
onMounted(async () => {

  // Get reference value from OTP
  getRefOTP.value.phoneNumber = '089-XXX-X778'
  getRefOTP.value.refCode = 'ED2J'

})

/////////////////////////////////////////
// Submit page
const submitOTP = async (formData: any) => {
  openLoadingDialog(true)

  const formRequest = {
    otp: formData.otp,
    refcode: getRefOTP.value.refCode
  }

  await new Promise((r) => setTimeout(r, 2000))

  console.log(formRequest)

  // Reset OTP field
  await resetOTPField()

  openLoadingDialog(false)

  if (formData) {

    if (formRequest.otp === '555555') {

      await goNext()

    } else {

      isShowModal.value = true
      modalType.value = 'danger'
      modalTitle.value = 'รหัส OTP ไม่ถูกต้อง'
      modalText.value = 'กรุณาทำการยืนยัน OTP ใหม่อีกครั้ง'
      modalButton.value = 'รับทราบ'
    }
  }
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  // Define and check 'isSetPassword' status
  const isSetPassword = useState('set-password')
  isSetPassword.value = true

  router.push({ path: 'set-password' })
}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

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