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

                <ElementsFormFirstnameWithLastname />

                <ElementsFormPhoneNumber label="หมายเลขโทรศัพท์ (ที่รับ OTP ได้)" name="phonenumber" id="phonenumber" />

                <ElementsFormEmail label="อีเมล" name="email" />

              </div>

              <FormKit type="submit" label="สมัครสมาชิก" name="register-submit" :classes="{
                input: 'btn-primary',
                outer: 'form-actions',
              }" :disabled="isLoading" :loading="isLoading" />
            </div>

            <div class="card-footer">
              <p>
                ผู้แนะนำของท่าน<br>
              <div class="recommender">
                <figure class="avatar"><img src="https://css.agentlove.club/uploads/team-5.jpg" alt=""></figure>
                <div class="info">
                  <h5 class="name">ปฐมxxx xxxจิตต์</h5>
                  <span class="code">AM00125633</span>
                </div>
              </div>
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

// Function to handle close modal events
const handleCloseModal = async () => {

  console.log('reset')

  // Reset phonenumber field
  await resetPhoneNumberField()
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

  console.log(formData)

  await new Promise((r) => setTimeout(r, 2000))

  if (formData) {

    if (formData.phonenumber === '0000000000') {

      await goNext()

    } else {

      openLoadingDialog(false)

      // Open modal dialog
      isShowModal.value = true
      modalType.value = 'danger'
      modalTitle.value = 'หมายเลขโทรศัพท์นี้มีการลงทะเบียนไปแล้ว'
      modalText.value = 'กรุณาตรวจสอบและกรอกข้อมูลอีกครั้ง'
      modalButton.value = 'รับทราบ'
    }
  }
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  // Define and check 'isOTP' status
  const isOTP = useState('otp')
  isOTP.value = true

  router.push({ path: 'otp' })
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