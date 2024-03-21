<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitOTP" :actions="false" id="form-login" form-class="form-login form-theme"
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

                <ElementsFormOtp label="OTP" name="otp" id="otp" :propsOTP="getRefOTP"
                  @on-resend-OTP="handleResendOTP" />

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

      const forgotpassStep = useState('forgotpass-step')

      if (forgotpassStep.value != 'otp') {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
      }

    }
  ]
})

const forgotpassStep = useState('forgotpass-step')
const forgotpassAgentMobile = useState('forgotpass-agent-mobile')
const forgotpassCodeReference = useState('forgotpass-code-reference')
const forgotpassOtpExpire = useState('forgotpass-otp-expire')
const forgotpassToken = useState('forgotpass-token')
const forgotpassReferenceID = useState('forgotpass-reference-id')
const forgotpassAgentCode = useState('forgotpass-agentcode')
const forgotpassIDCard = useState('forgotpass-idcard')

/////////////////////////////////////////
// Define variables
const getRefOTP = ref({
  phoneNumber: '',
  refCode: '',
  countTimer: forgotpassOtpExpire.value
})

/////////////////////////////////////////
// Define router and route
const router = useRouter()

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
const modalType = ref('danger')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')
const modalRedirectPath = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
  if (modalRedirectPath.value) {
    router.push({ path: modalRedirectPath.value })
  }
  else {
    isShowModal.value = false
  }
}

// Function show message modal events
const serverModal = async (serverCheck: any) => {
  isShowModal.value = true
  modalType.value = serverCheck.modalType
  modalTitle.value = serverCheck.modalTitle
  modalText.value = serverCheck.modalText
  modalButton.value = serverCheck.modalButton
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
  
  await resetOTPField()
  openLoadingDialog(true)

  const recoveryPasswordAgentReq = {
    IDCard: forgotpassIDCard.value,
    AgentCode: forgotpassAgentCode.value
  }

  const response = await useRepository().agent.requestRecoveryPasswordAgent(recoveryPasswordAgentReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    getRefOTP.value.refCode = response.apiResponse.Data.CodeReference
    getRefOTP.value.countTimer = response.apiResponse.Data.ExpireInSeconds
    forgotpassCodeReference.value = response.apiResponse.Data.CodeReference
    forgotpassToken.value = response.apiResponse.Data.Token
    openLoadingDialog(false)
  }
  else if (resultCheck.status === 'error') {
    serverModal(resultCheck)
    openLoadingDialog(false)
  }
  else if (resultCheck.status === 'server-error') {
    serverModal(resultCheck)
    openLoadingDialog(false)
  }

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
  getRefOTP.value.phoneNumber = useUtility().maskMobileNumber2(forgotpassAgentMobile.value)
  getRefOTP.value.refCode = forgotpassCodeReference.value

})

/////////////////////////////////////////
// Submit page
const submitOTP = async (formData: any) => {

  openLoadingDialog(true)

  const verifyOtpRecoveryPasswordAgentReq = {
    CodeVerify: formData.otp,
    CodeReference: forgotpassCodeReference.value,
    Token2: forgotpassToken.value
  }

  const response = await useRepository().agent.verifyOtpRecoveryPasswordAgent(verifyOtpRecoveryPasswordAgentReq)
  const resultCheck = useUtility().responseCheck(response)
  //console.log(response)

  if (resultCheck.status === 'pass') {
    forgotpassReferenceID.value = response.apiResponse.Data.ReferenceID
    forgotpassStep.value = 'set-password'
    await goNext()
  }
  else if (resultCheck.status === 'error') {

    if (response.apiResponse.ErrorCode === '1103807' || response.apiResponse.ErrorCode === '1107808') {
      resultCheck.modalTitle = 'รหัส OTP ไม่ถูกต้อง'
      resultCheck.modalText = 'กรุณาทำการยืนยัน OTP ใหม่อีกครั้ง'
    }
    resultCheck.modalType = 'warning'
    serverModal(resultCheck)
    openLoadingDialog(false)

  }
  else if (resultCheck.status === 'server-error') {
    serverModal(resultCheck)
    openLoadingDialog(false)
  }

}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: 'set-password' })
}

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'ยืนยันด้วย OTP'
const pageCategory = 'ลืมรหัสผ่าน'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-otp template-login'
  }
})
</script>