<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitForgotpassword" #default="{ value }" :actions="false" id="form-login"
      form-class="form-login form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">ลืมรหัสผ่าน</h1>
              <h2 class="subtitle">กรุณากรอกข้อมูลของท่าน</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

                <ElementsFormAgentCode label="รหัสสมาชิก" id="username" name="username" />

                <ElementsFormIdCard label="เลขบัตรประชาชน" id="idcard" name="idcard" />

              </div>

              <FormKit type="submit" label="ยืนยันข้อมูล" name="forgotpassword-submit" :classes="{
                input: 'btn-primary',
                outer: 'form-actions',
              }" :disabled="isLoading" :loading="isLoading" />
            </div>

            <div class="card-footer">
              <p>
                มีรหัสผ่านใหม่แล้ว
                <NuxtLink to="login" title="เข้าสู่ระบบได้เลย">เข้าสู่ระบบได้เลย</NuxtLink>
              </p>
            </div>

          </div>

        </div>
      </div>

    </FormKit>

    <ElementsDialogLoading :propsLoading="loadingProps" />

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
// Submit page
const submitForgotpassword = async (formData: any) => {
  openLoadingDialog(true)

  // console.log(formData)

  // User auth store
  const store = useStoreUserAuth()

  const formRequest = {
    username: formData.username,
    password: formData.password
  }

  const { data } = await useAsyncData('userAuth', () => store.authLogin(formRequest))

  if (data && data.value) {

    if (data.value.Status !== '200') {

      await goNext()

    } else {

      openLoadingDialog(false)
      statusMessageType.value = 'notice-warning'
      statusMessage.value = data.value.ErrorMessage

      if (data.value.ErrorCode == '90000999') {

        statusMessage.value = 'Username หรือ Password ไม่ถูกต้อง'

        return statusMessage.value

      }
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
const pageTitle = 'ลืมรหัสผ่าน'
const pageCategory = 'กรุณากรอกข้อมูลของท่าน'
const pageDescription = 'ลืมรหัสผ่าน กรุณากรอกข้อมูลของท่าน'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-forgot-password template-login'
  }
})
</script>