<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitRegister" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">ลงทะเบียนสมาชิกใหม่</h1>
              <h2 class="subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <ElementsFormFirstnameWithLastname :formFirstName="formFirstName" :formLastName="formLastName" :isReadOnly="true" />

                <ElementsFormPhoneNumber label="หมายเลขโทรศัพท์ (ที่รับ OTP ได้)" name="phonenumber" id="phonenumber" />

                <!--<ElementsFormEmail label="อีเมล" name="email" />-->

              </div>

              <FormKit type="submit" label="สมัครสมาชิก" name="register-submit" :classes="{
                input: 'btn-primary',
                outer: 'form-actions',
              }" :disabled="isLoading" :loading="isLoading" />

            </div>

            <div class="card-footer" v-if="Referral">
              <p>ผู้แนะนำของท่าน<br>
              <div class="recommender">
                <figure class="avatar"><img src="https://css.agentlove.club/uploads/team-5.jpg" alt=""></figure>
                <div class="info">
                  <h5 class="name">{{ agentReferralDetails.FirstName }} {{ agentReferralDetails.LastName }}</h5>
                  <span class="code">AM{{ agentReferralDetails.AgentID }}</span>
                </div>
              </div>
              <FormKit type="hidden" name="reference" id="reference" :value="Referral" />
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

// Define page meta
definePageMeta({
  middleware: [
    function (to, from) {

      const registerStep = useState('register-step')

      if (registerStep.value!='form') {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
      }

    }
  ]
})

// Define import
import { getNode } from '@formkit/core'

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

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal'])

/////////////////////////////////////////
// Function reset phonenumber field
const resetPhoneNumberField = async () => {
  const phoneNumberField = getNode('phonenumber')
  phoneNumberField?.reset()
}

/////////////////////////////////////////
// Submit page
const submitRegister = async (formData: any) => {

  openLoadingDialog(true)
  //console.log(formData)

  if(registerType.value === 'agent') {

    const registerAgentReq = {
      AgentCode: regAgentAgentCode,
      IDCard: regAgentIDcard,
      FirstName: formData.firstname,
      LastName: formData.lastname,
      ReferralID: regReferralID,
      TemporaryPhone: formData.phonenumber
    }

    const response = await useRepository().agent.registerAgent(registerAgentReq)
    const resultCheck = useUtility().responseCheck(response)
    //console.log(response)

    if (resultCheck.status === 'pass') {
      regAgentMobile.value = formData.phonenumber
      regCodeReference.value = response.apiResponse.Data.CodeReference
      regToken.value = response.apiResponse.Data.Token
      registerStep.value = 'otp'
      await goNext()
    }
    else if (resultCheck.status === 'error') {
      resultCheck.modalType = 'warning'
      serverModal(resultCheck)
      openLoadingDialog(false)
    }
    else if (resultCheck.status === 'server-error') {
      serverModal(resultCheck)
    }

  }
  else if(registerType.value === 'member') {

    isShowModal.value = true
    modalType.value = 'warning'
    modalTitle.value = 'ยังไม่เปิดลงทะเบียนสมาชิกทั่วไป'
    modalText.value = ''
    modalButton.value = 'ตกลง'
    
  }
 
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: 'otp' })
}

/////////////////////////////////////////
// Define for this page

let agentReferralDetails = ref()
let Referral = ref()
const formFirstName =  ref()
const formLastName =  ref()

const registerStep = useState('register-step')
const registerType = useState('register-type')
const regReferralID = useState('reg-referral-id')
const regAgentAgentCode = useState('reg-agent-agentcode')
const regAgentFirstName = useState('reg-agent-firstname')
const regAgentLastName = useState('reg-agent-lastname')
const regAgentIDcard = useState('reg-agent-idcard')
const regAgentMobile = useState('reg-agent-mobile')
const regCodeReference = useState('reg-code-reference')
const regToken = useState('reg-token')


if(regAgentFirstName) { formFirstName.value = regAgentFirstName }
if(regAgentLastName) { formLastName.value = regAgentLastName }

onMounted(async () => {
  await loadAgentReferral(regReferralID)
})

const loadAgentReferral = async (regReferralID: any) => {

  if(regReferralID) {

    const checkAgentReferralReq = {
      ReferralID: regReferralID
    }
    const response = await useRepository().agent.checkAgentReferral(checkAgentReferralReq)
    const resultCheck = useUtility().responseCheck(response)

    if (resultCheck.status === 'pass') {
      if (Array.isArray(response.apiResponse.Data)) {
        agentReferralDetails = response.apiResponse.Data[0]
        Referral.value = 'AM' + response.apiResponse.Data[0].AgentID
      }
    }
    else if (resultCheck.status === 'error') {
      //serverModal(resultCheck)
    }
    else if (resultCheck.status === 'server-error') {
      serverModal(resultCheck)
    }

  }

}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'แบบฟอร์มลงทะเบียน'
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