<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitRegister" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Main content</h3>
            </div>
            <div class="card-body">

              {{ addressDataArray }}

          

              <div class="col-md-6">
                  <FormKit type="text" name="fname"  label="ชื่อ" placeholder="ชื่อ" validation="required" :validation-messages="{
                    required: 'กรุณาใส่ชื่อ'
                }" autocomplete="off" />
                </div>
                <div class="col-md-6">
                <FormKit type="text" label="นามสกุล" name="LastName" 
                placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                    required: 'กรุณาใส่นามสกุล'
                }" autocomplete="off" />
                </div>
                
             
              <FormKit type="button" label="เพิ่มที่อยู่" name="register-submit" 
              :classes="{
                input: 'btn-primary',
              }" 
              @click="openDialogAddress"
              :disabled="isLoading" 
              :loading="isLoading" />

            </div>
          </div>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <aside class="card">
              <div class="card-body">
                <div class="status-list">
                  <figure class="status-icon">
                    <div class="icon user"></div>
                  </figure>
                  <h4 class="title">ผู้แนะนำ</h4>

                  <div class="status-item" v-if="isAgent">
                    <h5 class="topic">ชื่อผู้แนะนำ</h5>
                    <p>{{ route.params.id }}</p>
                  </div>

                  <div class="status-item" v-else>
                    <h5 class="topic">ระบุผู้แนะนำ</h5>
                    <p>
                      <FormKit type="text" name="AgentCode" placeholder="ระบุรหัสผู้แนะนำ" autocomplete="off" />
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <FormKit type="submit" label="บันทึก" name="register-submit" :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }" :disabled="isLoading" :loading="isLoading" />

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

     <ElementsDialogAddress :isOpenDialogAddress="isOpenDialogAddress" @on-close-address="closeModalAddress" @on-save-address="saveAddress" />

  </NuxtLayout>
</template>

<script setup lang="ts">

const isOpenDialogAddress = ref(false)

const openDialogAddress = () => {
  isOpenDialogAddress.value = true;
  
}

const closeModalAddress = async (refresh: boolean) => {
  if (refresh) {
    isOpenDialogAddress.value = true;
    isOpenDialogAddress.value = false;
  }
  isOpenDialogAddress.value = false;
}

const addressDataArray = ref([])
const saveAddress = async (addressData: any) => {

  addressDataArray.value = addressData
  isOpenDialogAddress.value = false;

};




  

// Define router
const router = useRouter()
const route = useRoute()

// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const isShowLoading = ref(false)

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
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm','onCloseAddress','onSaveAddress'])

/////////////////////////////////////////

// Submit form event
const submitRegister = async (formData: any) => {

  if(addressDataArray.value.Province){

 ///  call api 

    const registerAgentReq = {
      Province: addressDataArray.value.Province,
      TemporaryPhone: formData.phonenumber
    }

    const response = await useRepository().agent.registerAgent(registerAgentReq)

    


      isShowLoading.value = true

      await new Promise((r) => setTimeout(r, 1000))

      isShowLoading.value = false

      // Open confirm dialog
      isShowConfirm.value = true
      confirmType.value = 'danger'
      confirmTitle.value = 'แน่ใจ?'
      confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
      confirmCancelButton.value = 'อุ่ยยยย กดผิด'
      confirmButton.value = 'ไปต่อโลดดดด' // After confirm then goto `handleAcceptConfirm` function


  } else {
  alert('กรุณาระบุที่อยู่');

  }
 

 
}

// Check affiliate from route param
const isAgent = ref(false)

if (route.params.id != 'new') {
  // Call Check Agent Info API
  isAgent.value = true
}
else {
  isAgent.value = false
}

//const isAgent = ref(route.params.id !== 'new')

// Function `goNext` push route go to next step
const goNext = async () => {
  // Define and check 'isOTP' status
  const isOTP = useState('otp')
  isOTP.value = true

  router.push({ path: 'otp' })
}

// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true

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