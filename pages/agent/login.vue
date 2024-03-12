<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitLogin" #default="{ value }" :actions="false" id="form-login"
      form-class="form-login form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-center">

            <div class="card-header">
              <h1 class="title">เข้าสู่ระบบ</h1>
              <h2 class="subtitle">เพื่อใช้งานระบบสมาชิก</h2>
            </div>

            <div class="card-body">

              <div class="form-area">

                <FormKit type="togglebuttons" name="isAgentType" enforced :value="true" :options="[
    { label: 'สำหรับนายหน้า', value: true },
    { label: 'สำหรับผู้ช่วย', value: false },
  ]" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />

                <div class="option" v-if="value && value.isAgentType === true">

                  <div :class="statusMessageTypeQ1" v-if="statusMessageQ1">{{ statusMessageQ1 }}</div>

                  <ElementsFormAgentCode label="รหัสสมาชิก" id="username" name="username" />

                  <ElementsFormPasswordWithForgot label="รหัสผ่าน" id="password" name="password" />

                </div>
                <div class="option" v-else>

                  <div :class="statusMessageTypeQ2" v-if="statusMessageQ2">{{ statusMessageQ2 }}</div>

                  <ElementsFormUserId label="ชื่อผู้ใช้งาน" id="userid" name="userid" />

                  <ElementsFormPassword label="รหัสผ่าน" id="userpassword" name="userpassword" />

                </div>

              </div>

              <FormKit type="submit" label="เข้าใช้งานระบบ" name="login-submit" :classes="{
    input: 'btn-primary',
    outer: 'form-actions',
  }" :disabled="isLoading" :loading="isLoading" />
            </div>

            <div class="card-footer">
              <p>
                ยังไม่เคยลงทะเบียน?
                <NuxtLink to="/register" title="ลงทะเบียนเพื่อเปิดใช้งานที่นี่">ลงทะเบียนเพื่อเปิดใช้งานที่นี่
                </NuxtLink>
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
// Mounted
// onMounted(() => {
//   clearStores()
// })

/////////////////////////////////////////
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
/////////////////////////////////////////
// Submit page
const submitLogin = async (formData: any) => {

  openLoadingDialog(true)

  // console.log(formData)

  // User auth store
  const store = useStoreUserAuth()

  if (formData.isAgentType === true) {

    const formRequest = {
      username: formData.username,
      password: formData.password
    }

    const { data } = await useAsyncData('userAuth', () => store.authLogin(formRequest))

    if (data && data.value) {

      if (data.value.Status == '200') {
        const auth = data.value.Data
        // Setting a cookie
        setCookie("access_token", auth?.access_token ?? "", 1);
        setCookie("refresh_token", auth?.refresh_token ?? "", 1);

        await goNext()

      } else {

        openLoadingDialog(false)
        statusMessageTypeQ1.value = 'notice-warning'
        statusMessageQ1.value = data.value.ErrorMessage

        if (data.value.ErrorCode == '90000999') {
          statusMessageQ1.value = 'Username หรือ Password ไม่ถูกต้อง'
          return statusMessageQ1.value
        }

      }
    }

  } else if (formData.isAgentType === false) {

    const formRequest = {
      username: formData.userid,
      password: formData.userpassword
    }

    const { data } = await useAsyncData('userAuth', () => store.authLogin(formRequest))

    if (data && data.value) {

      if (data.value.Status == '200') {
        await goNext()
      } else {

        openLoadingDialog(false)
        statusMessageTypeQ2.value = 'notice-warning'
        statusMessageQ2.value = data.value.ErrorMessage

        if (data.value.ErrorCode == '90000999') {
          statusMessageQ2.value = 'Username หรือ Password ไม่ถูกต้อง'
          return statusMessageQ2.value
        }

      }
    }

  }

}

const getAgentProfile = async () => {

  const response = await useRepository().agent.getAgentProfile()
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    const AgentInfo = useUtility().getSession('AgentInfo')
    if (Array.isArray(response.apiResponse.Data)) {
      AgentInfo.AgentProfile = response.apiResponse.Data[0]
    }
    useUtility().setSession('AgentInfo', AgentInfo)
  }

}

const getPlanProduct = async () => {

  const response = await useRepository().agent.getPlanProduct()
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    const AgentInfo = useUtility().getSession('AgentInfo')
    AgentInfo.PlanProduct = response.apiResponse.Data
    useUtility().setSession('AgentInfo', AgentInfo)
  }

}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {

  useUtility().setSession('AgentInfo', { AgentProfile: [], PlanProduct: [] })
  getAgentProfile()
  getPlanProduct()
  router.push({ path: '/main' })

}

/////////////////////////////////////////
// Function clear all stores
// import { getActivePinia } from "pinia"

// const clearStores = () => {

//   // Reset Pinia store
//   getActivePinia()._s.forEach(store => {
//     store.$reset() // Reset the store's state
//     store.$dispose() // Dispose of the store instance
//     sessionStorage.removeItem(store.$id) // Remove sessionStorage of the store instance

//     // Remove sessionStorage
//     sessionStorage.removeItem('useStoreNoticePayment')
//     sessionStorage.removeItem('useStorePayment')
//     sessionStorage.removeItem('useStorePackageList')
//     sessionStorage.removeItem('useStoreFeeLimit')
//     sessionStorage.removeItem('AgentInfo')

//     // Remove localStorage
//     localStorage.removeItem('useStoreInformation')
//   })

// }

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-minimal'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = true

// Define page meta
const pageTitle = 'เข้าสู่ระบบ'
const pageCategory = 'เพื่อใช้งานระบบสมาชิก'
const pageDescription = 'เข้าสู่ระบบ เพื่อใช้งานระบบสมาชิก'

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-login single-login template-login'
  }
})
</script>