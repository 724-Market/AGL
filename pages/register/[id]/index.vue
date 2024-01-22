<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitSurvey" #default="{ value }" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <div class="card">
            <div class="card-body">

              <section class="surveys">

                <div class="survey-item">
                  <header class="question">
                    <h3 class="topic">ท่านเป็นสมาชิกของ บริษัท ศรีกรุงโบรคเกอร์ จำกัด หรือไม่?</h3>
                    <p class="hint">รหัสสมาชิกขึ้นต้นด้วย AM</p>
                  </header>

                  <div class="answer">
                    <div class="choice">
                      <FormKit type="togglebuttons" name="isSKMember" enforced :options="{
                        'notMember': 'ไม่ได้เป็นสมาชิก',
                        'isMember': 'เป็นสมาชิก',
                      }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        @click="clearStatusMessage" />
                    </div>

                    <div class="option" v-if="value && value.isSKMember === 'isMember'">

                      <FormKit name="checkSKMember" type="group" #default="{ state: { valid } }">
                        <div :class="'notice-' + statusMessageTypeQ1" v-if="statusMessageQ1">{{ statusMessageQ1 }}</div>

                        <ElementsFormAgentCode label="รหัสสมาชิก" id="agentCode" name="agentCode" />

                        <ElementsFormIdCard label="เลขบัตรประชาชน" id="idCard" name="idCard" />

                        <FormKit type="button" class="btn-primary" label="ตรวจสอบสถานะสมาชิก" name="agent-check-submit"
                          @click="submitCheckSKMember" :disabled="!valid" />

                      </FormKit>

                    </div>

                    <div class="option" v-if="value && value.isSKMember === 'notMember'">

                      <FormKit name="checkIdCard" type="group" #default="{ state: { valid } }">
                        <div :class="'notice-' + statusMessageTypeQ2" v-if="statusMessageQ2">{{ statusMessageQ2 }}</div>

                        <ElementsFormIdCard label="เลขบัตรประชาชน" id="idCard" name="idCard" />

                        <FormKit type="button" class="btn-primary" label="ตรวจสอบสถานะสมาชิก" name="idcard-check-submit"
                          @click="submitCheckIdCard" :disabled="!valid" />

                      </FormKit>

                    </div>

                  </div>

                </div>

              </section>

            </div>
          </div>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <aside class="card">
              <div class="card-header">
                <h3 class="card-title">ผู้แนะนำ</h3>
              </div>
              <div class="card-body" v-if="Referral">

                <p>
                  AgentID : {{ agentReferralDetails.AgentID }}<br>
                  FirstName : {{ agentReferralDetails.FirstName }}<br>
                  LastName : {{ agentReferralDetails.LastName }}<br>
                  ModelAgent : {{ agentReferralDetails.ModelAgent }}
                </p>

                <FormKit type="hidden" name="reference" :value="Referral" />

              </div>
              <div class="card-body" v-else>
                <p>724 Market</p>
              </div>
            </aside>

            <FormKit type="submit" label="เข้าสู่การสมัครสมาชิก" name="survey-submit" :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }" :disabled="false" :loading="isLoading" />

          </section>
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
// Status for notice user
const statusMessageQ1 = ref()
const statusMessageTypeQ1 = ref()
const statusMessageQ2 = ref()
const statusMessageTypeQ2 = ref()

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

  isShowConfirm.value = false

  await new Promise((r) => setTimeout(r, 1000))

  await goNext()
}

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm'])

/////////////////////////////////////////
// Clear status message after change toggle
const clearStatusMessage = () => {
  statusMessageQ1.value = ''
  statusMessageQ2.value = ''
}

/////////////////////////////////////////
// Submit checkSKMember group
const submitCheckSKMember = async () => {

  openLoadingDialog(true)

  await new Promise((r) => setTimeout(r, 1000))

  const agentCode = getNode('agentCode')
  const idCard = getNode('idCard')

  if (agentCode && idCard) {
    statusMessageTypeQ1.value = 'success'
    statusMessageQ1.value = 'ยืนยันการเป็นสมาชิกศรีกรุง'

    // console.log('agenCode is: ' + agentCode.value)
    // console.log('idCard is: ' + idCard.value)

  } else {
    statusMessageTypeQ1.value = 'warning'
    statusMessageQ1.value = 'ไม่สามารถยืนยันการเป็นสมาชิกศรีกรุงได้'

    agentCode?.reset()
    idCard?.reset()
  }

  openLoadingDialog(false)
}

/////////////////////////////////////////
// Submit checkIdCard group
const submitCheckIdCard = async () => {

  openLoadingDialog(true)

  await new Promise((r) => setTimeout(r, 1000))

  const idCard = getNode('idCard')

  if (idCard) {
    statusMessageTypeQ2.value = 'success'
    statusMessageQ2.value = 'สามารถสมัครสมาชิกได้'

    // console.log('agenCode is: ' + agentCode.value)
    // console.log('idCard is: ' + idCard.value)

  } else {
    statusMessageTypeQ2.value = 'warning'
    statusMessageQ2.value = 'ไม่สามารถสมัครสมาชิกได้'

    idCard?.reset()
  }

  openLoadingDialog(false)
}

/////////////////////////////////////////
// Submit page
const submitSurvey = async (formData: any) => {

  openLoadingDialog(true)

  await new Promise((r) => setTimeout(r, 1000))

  openLoadingDialog(false)

  console.log(formData)

  // Open confirm dialog
  isShowConfirm.value = true
  confirmType.value = 'warning'
  confirmTitle.value = 'แน่ใจที่จะสมัครสมาชิก?'
  confirmText.value = 'คิดดีๆ นะ คิดให้รอบคอบก่อน'
  confirmCancelButton.value = 'อุ่ยย ขอคิดอีกที'
  confirmButton.value = 'โอเค ไปต่อโลดด' // After confirm then goto `handleAcceptConfirm` function
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: '/register/form' })
}


let agentReferralDetails = ref()
let Referral = ref()

onMounted(async () => {
    await loadAgentReferral()
})

const loadAgentReferral = async () => {

  if (typeof route.params.id === 'string') {
    if(route.params.id != '724') {

      const checkAgentReferralReq = {
        ReferralID: route.params.id
      }
      const response    = await useRepository().agent.checkAgentReferral(checkAgentReferralReq)
      const resultCheck = useUtility().responseCheck(response)

      if (resultCheck.status === 'pass') {
        if(Array.isArray(response.apiResponse.Data)) {
          agentReferralDetails = response.apiResponse.Data[0]
          Referral.value = response.apiResponse.Data[0].AgentID
        }
      }
      else if (resultCheck.status === 'error') {
        alert('error')
      }
      else if (resultCheck.status === 'server-error') {
        alert('server-error')
      }

    }
  }

}


/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = true

// Define page meta
const pageTitle = 'แบบสำรวจก่อนลงทะเบียน'
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

<style>
.topic {
  margin-bottom: 0.25em;
}

.hint {
  margin-bottom: 1em !important;
}

.answer {
  margin-bottom: 2em;
}
</style>