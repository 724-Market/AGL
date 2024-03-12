<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitSetPassword" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">กำหนดรหัสผ่าน</h1>
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

      const registerStep = useState('register-step')

      if (registerStep.value != 'set-password') {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
      }

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
// Submit page
const submitSetPassword = async (formData: any) => {

  openLoadingDialog(true)
  //console.log(formData)

  if (registerType.value === 'agent') {

    const setupFirstPasswordAgentReq = {
      Password: formData.password,
      CodeReference: regCodeReference.value,
      Token2: regToken.value,
      ReferenceID: regReferenceID.value
    }

    const response = await useRepository().agent.setupFirstPasswordAgent(setupFirstPasswordAgentReq)
    const resultCheck = useUtility().responseCheck(response)
    //console.log(response)

    if (resultCheck.status === 'pass') {

      registerStep.value = ''
      registerType.value = ''
      regAgentAgentCode.value = ''
      regAgentIDcard.value = ''
      regAgentMobile.value = ''
      regCodeReference.value = ''
      regToken.value = ''
      regReferenceID.value = ''

      modalRedirectPath.value = '/agent'
      resultCheck.modalType = 'success'
      resultCheck.modalTitle = 'ยินดีต้อนรับสมาชิกใหม่'
      resultCheck.modalText = 'การลงทะเบียนสำเร็จ เราจะพาท่านไปหน้าเข้าสู่ระบบ'
      serverModal(resultCheck)
      openLoadingDialog(false)

    }
    else if (resultCheck.status === 'error') {

      resultCheck.modalType = 'warning'
      serverModal(resultCheck)
      openLoadingDialog(false)

    }
    else if (resultCheck.status === 'server-error') {
      serverModal(resultCheck)
      openLoadingDialog(false)
    }

  }
  else if (registerType.value === 'member') {

    openLoadingDialog(false)
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
  router.push({ path: '/agent' })
}

/////////////////////////////////////////
// Define for this page

const registerStep = useState('register-step')
const registerType = useState('register-type')
const regAgentAgentCode = useState('reg-agent-agentcode')
const regAgentIDcard = useState('reg-agent-idcard')
const regAgentMobile = useState('reg-agent-mobile')
const regCodeReference = useState('reg-code-reference')
const regToken = useState('reg-token')
const regReferenceID = useState('reg-reference-id')

/////////////////////////////////////////
// Define layout
const layout = 'minimal'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'กำหนดรหัสผ่าน'
const pageCategory = 'ลงทะเบียนสมาชิกใหม่'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-register single-set-password template-login'
  }
})
</script>