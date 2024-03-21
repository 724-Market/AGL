<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitForgotpassword" #default="{ value }" :actions="false" id="form-login"
      form-class="form-login form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">ลืมรหัสผ่าน</h1>
              <h2 class="subtitle">กรุณากรอกข้อมูลของท่าน</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                <ElementsFormAgentCode label="รหัสสมาชิก" id="agentCode" name="agentCode" />

                <ElementsFormIdCard label="เลขบัตรประชาชน" id="agentIDCard" name="agentIDCard" />

              </div>

              <FormKit type="submit" label="ยืนยันข้อมูล" name="forgotpassword-submit" :classes="{
    input: 'btn-primary',
    outer: 'form-actions',
  }" :disabled="isLoading" :loading="isLoading" />
            </div>

            <div class="card-footer">
              <p>
                มีรหัสผ่านใหม่แล้ว
                <NuxtLink to="login" title="เข้าสู่ระบบได้เลย">เข้าสู่ระบบได้เลย</NuxtLink>
              </p>
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

const forgotpassStep = useState('forgotpass-step')
const forgotpassAgentMobile = useState('forgotpass-agent-mobile')
const forgotpassCodeReference = useState('forgotpass-code-reference')
const forgotpassOtpExpire = useState('forgotpass-otp-expire')
const forgotpassToken = useState('forgotpass-token')
const forgotpassAgentCode = useState('forgotpass-agentcode')
const forgotpassIDCard = useState('forgotpass-idcard')

/////////////////////////////////////////
// Submit page
const submitForgotpassword = async (formData: any) => {
  
  openLoadingDialog(true)
  // console.log(formData)

  const agentCodeValue = formData.agentCode ? formData.agentCode : null;
  const checkAgentReferralReq = {
    IDCard: formData.agentIDCard,
    AgentCode: (agentCodeValue as string).toUpperCase()
  }

  const response = await useRepository().agent.checkAgent(checkAgentReferralReq)
  const resultCheck = useUtility().responseCheck(response)
  // console.log(resultCheck.status)
  // console.log(response)

  if (resultCheck.status === 'pass') {
    if (response.respOptions === 'LOG-IN') {

      const recoveryPasswordAgentReq = {
        IDCard: formData.agentIDCard,
        AgentCode: (agentCodeValue as string).toUpperCase()
      }

      const response2 = await useRepository().agent.requestRecoveryPasswordAgent(recoveryPasswordAgentReq)
      const resultCheck2 = useUtility().responseCheck(response2)
      // console.log(resultCheck2.status)
      // console.log(response2)

      if (resultCheck2.status === 'pass') {
        forgotpassAgentMobile.value = response2.apiResponse.Data.SendTo
        forgotpassCodeReference.value = response2.apiResponse.Data.CodeReference
        forgotpassOtpExpire.value = response2.apiResponse.Data.ExpireInSeconds
        forgotpassToken.value = response2.apiResponse.Data.Token
        forgotpassAgentCode.value = (agentCodeValue as string).toUpperCase()
        forgotpassIDCard.value = formData.agentIDCard
        forgotpassStep.value = 'otp'
        await goNext()
      }
      else {
        resultCheck.modalType = 'warning'
        serverModal(resultCheck)
        openLoadingDialog(false)
      }

    }
    else {
      resultCheck.modalType = 'warning'
      resultCheck.modalTitle = 'ท่านยังไม่ได้เป็นสมาชิก'
      resultCheck.modalText = 'กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง'
      serverModal(resultCheck)
      openLoadingDialog(false)
    }
  }
  else if (resultCheck.status === 'error') {
    resultCheck.modalType = 'warning'
    resultCheck.modalTitle = 'ข้อมูลสมาชิกของท่านไม่ถูกต้อง'
    resultCheck.modalText = 'กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง'
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
  router.push({ path: 'otp' })
}

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'ลืมรหัสผ่าน'
const pageCategory = 'กรุณากรอกข้อมูลของท่าน'
const pageDescription = 'ลืมรหัสผ่าน กรุณากรอกข้อมูลของท่าน'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-forgot-password template-login'
  }
})
</script>