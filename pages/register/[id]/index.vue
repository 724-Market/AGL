<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitSurvey" #default="{ value }" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">ลงทะเบียนสมาชิกใหม่</h1>
              <h2 class="subtitle">ท่านเป็นสมาชิกศรีกรุงโบรคเกอร์หรือไม่?</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <FormKit type="togglebuttons" name="isSKMember" enforced :value="true" :options="[
    { label: 'เป็นสมาชิก', value: true },
    { label: 'ไม่ได้เป็นสมาชิก', value: false },
  ]" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />

                <div class="option" v-if="value && value.isSKMember === true">

                  <ElementsFormAgentCode label="รหัสสมาชิก" id="agentCode" name="agentCode" />
                  <ElementsFormIdCard label="เลขบัตรประชาชน" id="agentIDCard" name="agentIDCard" />

                </div>
                <div class="option" v-else>

                  <ElementsFormIdCard label="เลขบัตรประชาชน" id="idCard" name="idCard" />

                </div>

              </div>

              <FormKit type="submit" label="ตรวจสอบสถานะสมาชิก" name="login-submit" :classes="{
    input: 'btn-primary',
    outer: 'form-actions',
  }" :disabled="isLoading" :loading="isLoading" />
            </div>

            <div class="card-footer">
              <p>
                เคยลงทะเบียนแล้ว?
                <NuxtLink to="/login" title="กลับไปหน้าเข้าสู่ระบบ">กลับไปหน้าเข้าสู่ระบบ</NuxtLink>
              </p>
            </div>

            <div class="card-footer" v-if="Referral">
              <p>ผู้แนะนำของท่าน<br>
              <div class="recommender">
                <figure class="avatar"><!--<img src="https://css.agentlove.club/uploads/team-5.jpg" alt="">-->
                </figure>
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

    <ElementsDialogConfirms :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
      :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton"
      @on-accept-confirm="handleAcceptConfirm" @on-close-confirm="handleCloseConfirm" />

  </NuxtLayout>
</template>

<script setup lang="ts">
// Define import
import { getNode } from '@formkit/core'

/////////////////////////////////////////
// Define router and route
const router = useRouter()
const route = useRoute()

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
  isShowConfirm.value = false
  await new Promise((r) => setTimeout(r, 1000))
  await goNext()

}

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm'])

/////////////////////////////////////////
// Submit page
const submitSurvey = async (formData: any) => {

  if (formData.isSKMember === true) {

    openLoadingDialog(true)

    const agentCodeValue = formData.agentCode ? formData.agentCode : null;
    const checkAgentReferralReq = {
      IDCard: formData.agentIDCard,
      AgentCode: (agentCodeValue as string).toUpperCase()
    }

    const response = await useRepository().agent.checkAgent(checkAgentReferralReq)
    const resultCheck = useUtility().responseCheck(response)
    //console.log(response)

    if (resultCheck.status === 'pass') {
      if (response.respOptions === 'REGISTER' || response.respOptions === 'VERIFY') {
        regAgentAgentCode.value = response.apiResponse.Data.AgentCode
        regAgentFirstName.value = response.apiResponse.Data.FirstName
        regAgentLastName.value = response.apiResponse.Data.LastName
        regAgentIDcard.value = formData.agentIDCard
        registerStep.value = 'form'
        registerType.value = 'agent'
        goNext()
      }
      else if (response.respOptions === 'LOG-IN') {
        modalRedirectPath.value = '/agent'
        resultCheck.modalType = 'warning'
        resultCheck.modalTitle = 'ท่านเป็นสมาชิกแล้ว'
        resultCheck.modalText = 'ระบบจะนำท่านไปยังหน้าล็อคอิน'
        serverModal(resultCheck)
      }
      else {
        alert(response.respOptions)
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
  else {

    isShowModal.value = true
    modalType.value = 'warning'
    modalTitle.value = 'ยังไม่เปิดลงทะเบียนสมาชิกทั่วไป'
    modalText.value = ''
    modalButton.value = 'ตกลง'

    //registerStep.value = 'form'
    //registerType.value = 'member'

  }

}

/////////////////////////////////////////
// Define for this page

let agentReferralDetails = ref()
let Referral = ref()
const registerStep = useState('register-step')
const registerType = useState('register-type')
const regReferralID = useState('reg-referral-id')
const regAgentAgentCode = useState('reg-agent-agentcode')
const regAgentFirstName = useState('reg-agent-firstname')
const regAgentLastName = useState('reg-agent-lastname')
const regAgentIDcard = useState('reg-agent-idcard')

onMounted(async () => {
  await loadAgentReferral()
})

const loadAgentReferral = async () => {

  if (typeof route.params.id === 'string') {
    if (route.params.id != '724') {

      const checkAgentReferralReq = {
        ReferralID: route.params.id
      }
      const response = await useRepository().agent.checkAgentReferral(checkAgentReferralReq)
      const resultCheck = useUtility().responseCheck(response)

      if (resultCheck.status === 'pass') {
        if (Array.isArray(response.apiResponse.Data)) {
          agentReferralDetails = response.apiResponse.Data[0]
          Referral.value = 'AM' + response.apiResponse.Data[0].AgentID
          regReferralID.value = 'AM' + response.apiResponse.Data[0].AgentID
        }
      }
      else if (resultCheck.status === 'error') {
        regReferralID.value = 'AM00000724'
        //serverModal(resultCheck)
      }
      else if (resultCheck.status === 'server-error') {
        regReferralID.value = 'AM00000724'
        serverModal(resultCheck)
      }

    }
  }

}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: 'form' })
}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'ลงทะเบียนสมาชิกใหม่'
const pageCategory = 'ลงทะเบียนสมาชิกใหม่'
const pageDescription = 'แบบสำรวจก่อนลงทะเบียนสมาชิกใหม่'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-register single-register template-login'
  }
})
</script>