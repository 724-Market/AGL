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

                <ElementsFormFirstnameWithLastname :formFirstName="formFirstName" :formLastName="formLastName"
                  :isReadOnly="true" />

                <ElementsFormIdCard label="เลขบัตรประชาชน" id="idCard" name="idCard" :formIdCard="formIdCard"
                  :isReadOnly="true" />

                <ElementsFormPhoneNumber label="หมายเลขโทรศัพท์ (ที่รับ OTP ได้)" name="phonenumber" id="phonenumber" />

                <ElementsFormAddressInfo :addressData="addressDataArray" />

                <FormKit type="button" label="เพิ่มที่อยู่" name="register-submit" :classes="{
                  input: 'btn-primary',
                }" @click="openDialogAddress" :disabled="isLoading" :loading="isLoading" />

              </div>

              <FormKit type="submit" label="สมัครสมาชิก" name="register-submit" :classes="{
                input: 'btn-primary',
                outer: 'form-actions',
              }" :disabled="isLoading" :loading="isLoading" />

            </div>

            <div class="card-footer" v-if="Referral">
              <p>ผู้แนะนำของท่าน<br>
              <div class="recommender">
                <figure class="avatar"><!--<img src="https://css.agentlove.club/uploads/team-5.jpg" alt="">--></figure>
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

    <ElementsDialogAddress :addressData="addressDataArray" :isOpenDialogAddress="isOpenDialogAddress" @on-close-address="closeModalAddress"
      @on-save-address="saveAddress" />

  </NuxtLayout>
</template>

<script setup lang="ts">

interface AddressData {
  No?: string
  Moo?: string
  Place?: string
  Building?: string
  Floor?: string
  Alley?: string
  Road?: string
  ProvinceID?: string
  DistrictID?: string
  SubDistrictID?: string
  postalCode?: string
  ProvinceLabel?: string
  DistrictLabel?: string
  SubDistrictLabel?: string
}

// Define page meta
definePageMeta({
  middleware: [
    function (to, from) {

      const registerStep = useState('register-step')

      if (registerStep.value != 'form') {
        //return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
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
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm', 'onCloseAddress', 'onSaveAddress'])

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

  if (registerType.value === 'agent') {

    if (addressDataArray.value.ProvinceID) {

      const registerAgentReq = {
        AgentCode: regAgentAgentCode,
        IDCard: regAgentIDcard,
        FirstName: formData.firstname,
        LastName: formData.lastname,
        ReferralID: regReferralID,
        TemporaryPhone: formData.phonenumber, 
        Address: {
          AddressID: "", 
          ReferenceID: "",
          ReferenceType: "",
          ProvinceID: addressDataArray.value.ProvinceID,
          DistrictID: addressDataArray.value.DistrictID,
          SubDistrictID: addressDataArray.value.SubDistrictID,
          ZipCode: addressDataArray.value.postalCode,
          TaxID: "",
          FirstName: formData.firstname,
          LastName: formData.lastname,
          PhoneNumber: formData.phonenumber,
          Email: "",
          Name: "",
          Type: "",
          AddressLine1: "",
          AddressLine2: "",
          AddressText: "",
          No: addressDataArray.value.No,
          Moo: addressDataArray.value.Moo,
          Place: addressDataArray.value.Place,
          Building: addressDataArray.value.Building,
          Floor: addressDataArray.value.Floor,
          Room: "",
          Branch: "",
          Alley: addressDataArray.value.Alley,
          Road: addressDataArray.value.Road,
        }, 
        CertificateLicense: {
          No: "9000000000",
          ExpireDate: "2025-12-31"
        }
      }

      const response = await useRepository().agent.registerAgent(registerAgentReq)
      const resultCheck = useUtility().responseCheck(response)

      if (resultCheck.status === 'pass') {
        regAgentMobile.value = formData.phonenumber
        regCodeReference.value = response.apiResponse.Data.CodeReference
        regOtpExpire.value = response.apiResponse.Data.ExpireInSeconds
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
        openLoadingDialog(false)
      }

    }
    else {
      isShowModal.value = true
      modalType.value = 'warning'
      modalTitle.value = 'กรุณาระบุที่อยู่'
      modalText.value = ''
      modalButton.value = 'ตกลง'
      openLoadingDialog(false)
    }

  }
  else if (registerType.value === 'member') {

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

const formFirstName = ref()
const formLastName = ref()
const formIdCard = ref()

const registerStep = useState('register-step')
const registerType = useState('register-type')
const regReferralID = useState('reg-referral-id')
const regAgentAgentCode = useState('reg-agent-agentcode')
const regAgentFirstName = useState('reg-agent-firstname')
const regAgentLastName = useState('reg-agent-lastname')
const regAgentIDcard = useState('reg-agent-idcard')
const regAgentMobile = useState('reg-agent-mobile')
const regCodeReference = useState('reg-code-reference')
const regOtpExpire = useState('reg-otp-expire')
const regToken = useState('reg-token')


if (regAgentFirstName) { formFirstName.value = regAgentFirstName }
if (regAgentLastName) { formLastName.value = regAgentLastName }
if (regAgentIDcard) { formIdCard.value = regAgentIDcard }

onMounted(async () => {
  await loadAgentReferral(regReferralID)
})

const loadAgentReferral = async (regReferralID: any) => {

  if (regReferralID) {

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
// Modal address
const isOpenDialogAddress = ref(false)

const openDialogAddress = () => {
  isOpenDialogAddress.value = true
}

const closeModalAddress = async (refresh: boolean) => {

  if (refresh) {
    isOpenDialogAddress.value = true
    isOpenDialogAddress.value = false
  }

  isOpenDialogAddress.value = false
}

const addressDataArray = ref<AddressData>({})

// addressDataArray.value = {
//   No: '999xxxx99',
//   Moo: '99999',
//   Place: '99999',
//   Building: '99999',
//   Floor: '99999',
//   Alley: '99999',
//   Road: '99999',
//   Province: '9F0A074997264E44B09C91E266AE28C5',
//   district: '06007C7C0E6F4D769B110E070E4FEF9D',
//   subDistrict: '1FFDF6E38FF644D88E31F248E04BF49B'
// }

const saveAddress = async (addressData: any) => {
  addressDataArray.value = addressData
  isOpenDialogAddress.value = false
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