<template>
    
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitSetPassword" :actions="false" id="form-register"
      form-class="form-register form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">กำหนดรหัสผ่านใหม่</h1>
              <h2 class="subtitle">ควรสร้างรหัสผ่านที่ปลอดภัย</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                <ElementsFormPassword label="รหัสผ่านเดิม" id="userpassword" name="userpassword" />
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
  console.log(formData)
  
  const changePasswordAgentReq = {
    OldPassword: formData.userpassword,
    NewPassword: formData.password
  }

  const response = await useRepository().agent.changePasswordAgent(changePasswordAgentReq)
  const resultCheck = useUtility().responseCheck(response)
  //console.log(response)

  if (resultCheck.status === 'pass') {

    modalRedirectPath.value = '/main'
    resultCheck.modalType = 'success'
    resultCheck.modalTitle = 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'
    resultCheck.modalText = 'เราจะพาท่านไปหน้าหลัก'
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

/////////////////////////////////////////
// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false


// Define page meta
const pageTitle = 'กำหนดรหัสผ่าน'
const pageCategory = 'เปลี่ยนรหัสผ่านใหม่'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-main single-main'
  }
})

</script>