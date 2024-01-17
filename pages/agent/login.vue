<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitLogin" #default="{ value }" :actions="false" id="form-login"
      form-class="form-login form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col">

          <div class="card card-login">

            <div class="card-header">
              <h1 class="title">เข้าสู่ระบบ</h1>
              <h2 class="subtitle">เพื่อใช้งานระบบสมาชิก</h2>
            </div>

            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

              <div class="form-area">

                <FormKit type="togglebuttons" name="isAgentType" enforced :value="true" :options="[
                  { label: 'สำหรับนายหน้า', value: true },
                  { label: 'สำหรับผู้ช่วย', value: false },
                ]" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />

                <div class="option" v-if="value && value.isAgentType === true">

                  <ElementsFormAgentCode label="รหัสสมาชิก AM00000003" id="username" name="username" />

                  <ElementsFormPasswordWithForgot label="รหัสผ่าน Qwerty1234@" id="password" name="password" />

                </div>
                <div class="option" v-else>

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
                <NuxtLink to="/register" title="ลงทะเบียนเพื่อเปิดใช้งานที่นี่">ลงทะเบียนเพื่อเปิดใช้งานที่นี่</NuxtLink>
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
const submitLogin = async (formData: any) => {
  openLoadingDialog(true)

  console.log(formData)

  // User auth store
  const store = useStoreUserAuth()

  if (formData.isAgentType === true) {

    const formRequest = {
      username: formData.username,
      password: formData.password
    }

    const { data } = await useAsyncData('userAuth', () => store.authLogin(formRequest))

    if (data && data.value) {

      // const auth = data.value.Data;

      if (data.value.Status == '200') {

        await goNext()

      } else {

        statusMessageType.value = 'notice-warning'
        statusMessage.value = data.value.ErrorMessage

        if (data.value.ErrorCode == '90000999') {

          statusMessage.value = 'Username หรือ Password ไม่ถูกต้อง'

          return statusMessage.value

        }
      }
    }

  } else if (formData.isAgentType === false) {

    const formRequest = {
      username: formData.userid,
      password: formData.userpassword
    }

  }

  openLoadingDialog(false)
}

/////////////////////////////////////////
// Function `goNext` push route go to next step
const goNext = async () => {
  router.push({ path: '/main' })
}

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