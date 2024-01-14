<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

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
                      }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>

                    <div class="option" v-if="value && value.isSKMember === 'isMember'">

                      <FormKit name="checkSKMember" type="group" #default="{ state: { valid } }">
                        <div :class="'notice-' + statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                        <FormKit type="mask" label="รหัสสมาชิก" id="agentCode" name="agentCode" mask="AM########"
                          validation="required|matches:/^[aA][mM][0-9]{8}$/|length:10" :validation-messages="{
                            required: 'กรุณาใส่รหัสสมาชิก',
                            matches: 'รูปแบบของรหัสสมาชิกไม่ถูกต้อง',
                            length: 'รหัสสมาชิกควรมี 10 ตัวอักษร และขึ้นต้นด้วย AM'
                          }" autocomplete="off" />
                        <FormKit type="text" label="เลขบัตรประชาชน" id="idCard" name="idCard" placeholder="เลขบัตรประชาชน"
                          validation="required|matches:/^[0-9]{13}$/" :validation-messages="{
                            required: 'กรุณาใส่เลขบัตรประชาชน',
                            matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก'
                          }" autocomplete="off" />
                        <FormKit type="button" class="btn-primary" label="ตรวจสอบสถานะสมาชิก" name="agent-check-submit"
                          @click="submitCheckSKMember" :disabled="!valid" />

                      </FormKit>

                    </div>
                  </div>

                </div>

                <div class="survey-item" v-if="value && value.isSKMember === 'notMember'">
                  <header class="question">
                    <h3 class="topic">ท่านมีใบอนุญาตเป็น นายหน้า/ตัวแทน ประกันวินาศภัยหรือไม่?</h3>
                  </header>
                  <div class="answer">
                    <div class="choice">
                      <FormKit type="togglebuttons" name="isNonLifeLicense" enforced :options="{
                        'notHasNonLifeLicense': 'ไม่มีใบอนุญาตฯ',
                        'hasNonLifeLicense': 'มีใบอนุญาตฯ',
                      }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                    <div class="option" v-if="value && value.isNonLifeLicense === 'hasNonLifeLicense'">
                      <FormKit type="text" label="เลขที่ใบอนุญาต" name="nonLifeLicense" validation="required"
                        :validation-messages="{
                          required: 'กรุณาใส่รหัสสมาชิก'
                        }
                          " autocomplete="off" />
                      <FormKit type="button" label="ตรวจสอบสถานะ" name="agent-check-submit" :classes="{
                        input: 'btn-primary',
                        outer: 'form-actions',
                      }" :disabled="isLoading" :loading="isLoading" />
                    </div>
                  </div>
                </div>

              </section>

            </div>
          </div>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <aside class="card" v-if="recommender">
              <div class="card-header">
                <h3 class="card-title">ผู้แนะนำ</h3>
              </div>
              <div class="card-body">

                <p>{{ recommender }}</p>
                <FormKit type="hidden" name="reference" :value="recommender" />

              </div>
            </aside>

            <FormKit type="submit" label="เข้าสู่การสมัครสมาชิก" name="register-submit" :classes="{
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
import { getNode } from '@formkit/core'

/////////////////////////////////////////
// Define router and route
const router = useRouter()
const route = useRoute()

// Use ref to create a reactive property and assign route.query.ref to it
const recommender = ref(route.params.id || '')

/////////////////////////////////////////
// Status for notice user
const statusMessage = ref('')
const statusMessageType = ref('')

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const isShowLoading = ref(false)
const loadingLogo = ref(false)
const loadingText = ref(false)

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
// Submit checkSKMember group
const submitCheckSKMember = async () => {

  isShowLoading.value = true

  await new Promise((r) => setTimeout(r, 1000))

  const agentCode = getNode('agentCode')
  const idCard = getNode('idCard')

  if (agentCode && idCard) {
    statusMessageType.value = 'success'
    statusMessage.value = 'ยืนยันการเป็นสมาชิกศรีกรุง'

    // console.log('agenCode is: ' + agentCode.value)
    // console.log('idCard is: ' + idCard.value)
  } else {
    statusMessageType.value = 'warning'
    statusMessage.value = 'ไม่สามารถยืนยันการเป็นสมาชิกศรีกรุงได้'

    agentCode?.reset()
    idCard?.reset()
  }

  isShowLoading.value = false
}

/////////////////////////////////////////
// Submit page
const submitSurvey = async (formData: any) => {

  isShowLoading.value = true

  await new Promise((r) => setTimeout(r, 1000))

  isShowLoading.value = false

  console.log(formData)

  // Open confirm dialog
  isShowConfirm.value = true
  confirmType.value = 'danger'
  confirmTitle.value = 'แน่ใจ?'
  confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
  confirmCancelButton.value = 'อุ่ยยยย กดผิด'
  confirmButton.value = 'ไปต่อโลดดดด' // After confirm then goto `handleAcceptConfirm` function
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: '/register/form' })
}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'แบบสำรวจก่อนลงทะเบียน'
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

.option {
  background-color: #fcfcfc;
  padding: 1em;
}
</style>