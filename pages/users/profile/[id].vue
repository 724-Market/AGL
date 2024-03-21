<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitEditUser" :actions="false" id="form-user" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col col-main">
          <div class="has-sticky">

            <UsersProfileDetail :key="renderKey" :user-details="userDetails" @on-delete-group="updateProfile"
              v-if="userDetails" :password-text="textPassword" />

          </div>
        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogCommission :user-commission-list="userCommissionList" />

            <UsersLogStatus :user-details="userDetails" v-if="userDetails" />

            <FormKit type="submit" label="บันทึก" name="user-submit" id="user-submit" :classes="{
    input: 'btn-primary',
    outer: 'form-actions',
  }" :disabled="isLoading" :loading="isLoading" />

            <NuxtLink class="btn-back btn-gray" to="/users">ย้อนกลับ</NuxtLink>

          </section>
        </div>
      </div>

    </FormKit>

    <ElementsDialogLoading :propsLoading="loadingProps" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    <ElementsDialogShowPassword v-if="isPasswordChanged" :isShowPassword="isPasswordChanged"
      :textUsername="textUsername" :textPassword="textPassword" @on-close-password="handleClosePassword" />

  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity"
import type {
  UserDataReq,
  UserDataRes,
  UserCommissionListRes,
  UserCommissionListReq,
} from "~/shared/entities/user-entity"

const router = useRouter()
const userDetails: globalThis.Ref<UserDataRes | undefined> = ref()
const userCommissionList: Ref<UserCommissionListRes[]> = ref([])

const emit = defineEmits(['checkProfileDetail', 'createUserConfirm', 'editUserConfirm', 'reProfile', 'onClosePassword'])

const isError = ref(false)
const messageError = ref('')

const route = useRoute()
const userId = ref<null | string>(null)

const renderKey = ref(0)
const getStoreUsername = useState('setUsername')
const getStorePassword = useState('setPassword')

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')
const modalRedirectPath = ref('')

/////////////////////////////////////////
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
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// Modal Password
const isPasswordChanged = ref(false)
const textUsername = ref('')
const textPassword = ref('')

/////////////////////////////////////////
// Function to handle close password events
const handleClosePassword = async () => {
  isPasswordChanged.value = false
}

/////////////////////////////////////////
// Mounted
onMounted(async () => {
  openLoadingDialog(true)

  if (typeof route.params.id === 'string') {

    userId.value = route.params.id

    await showPassword(getStoreUsername.value, getStorePassword.value)
    await loadUserDetails(userId.value)
    await loadUserCommission(userId.value)

  }

  openLoadingDialog(false)
})

/////////////////////////////////////////
// Open modal in case change password
const showPassword = async (getUsername: string, getPassword: string) => {
  if (!getPassword) {
    return false
  }
  openLoadingDialog(false)

  getStorePassword.value = ''
  isPasswordChanged.value = true // Open modal
  textUsername.value = getUsername
  textPassword.value = getPassword
}

/////////////////////////////////////////
// Update profile after save
const updateProfile = async () => {
  renderKey.value = renderKey.value + 1
}

/////////////////////////////////////////
const loadUserCommission = async (userid: string) => {
  const useCommisionReq: UserCommissionListReq = {
    SubUserID: userid,
    Paging: {
      Page: 0,
      Length: 10,
      TotalRecord: 0,
    }
  }

  const responseCom = await useRepository().user.getCommionList(useCommisionReq)

  if (
    responseCom.apiResponse.Status &&
    responseCom.apiResponse.Status == "200" &&
    responseCom.apiResponse.Data
  ) {
    userCommissionList.value = responseCom.apiResponse.Data
  } else {
    isError.value = true
    messageError.value = responseCom.apiResponse.ErrorMessage ?? ""
  }

}

/////////////////////////////////////////
const loadUserDetails = async (userid: string) => {

  const userDetailReq: UserDataReq = {
    SubUserID: userid
  }

  const response = await useRepository().user.getProfile(userDetailReq)
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data &&
    Array.isArray(response.apiResponse.Data) &&
    response.apiResponse.Data.length > 0
  ) {
    userDetails.value = response.apiResponse.Data[0]
  } else {
    router.push("/users")
  }
}

/////////////////////////////////////////
// Submit form event
const submitEditUser = async (formData: any) => {

  openLoadingDialog(true)

  const response = await useRepository().user.saveProfile(formData)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    if (userId.value !== null) {

      await loadUserDetails(userId.value)
      await updateProfile()
      await loadUserCommission(userId.value)

      if (formData.NewPassword) {
        await showPassword(formData.UserName, formData.NewPassword)
        openLoadingDialog(false)
      }
      else {
        resultCheck.modalType = 'success'
        resultCheck.modalTitle = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        serverModal(resultCheck)
        openLoadingDialog(false)
      }

    }
    else {
      resultCheck.modalType = 'warning'
      resultCheck.modalTitle = 'เกิดความผิดพลาด'
      resultCheck.modalText = 'กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง'
      serverModal(resultCheck)
      openLoadingDialog(false)
    }
  }
  else {
    resultCheck.modalType = 'warning'
    resultCheck.modalTitle = 'เกิดความผิดพลาด'
    resultCheck.modalText = 'กรุณาตรวจสอบและทำรายการใหม่อีกครั้ง'
    serverModal(resultCheck)
    openLoadingDialog(false)
  }

}

/////////////////////////////////////////
// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = "แก้ไขข้อมูลผู้ช่วย"
const pageCategory = "ผู้ช่วย"
const pageDescription = ""

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-users single-user",
  },
})
</script>