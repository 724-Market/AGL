<template>
  <div class="card-login">

    <header class="form-header">
      <h1 class="title">ข้อมูลสมาชิก</h1>
      <h2 class="subtitle">กรุณาตรวจสอบความถูกต้องของข้อมูล</h2>
      <div class="notice-info">หากข้อมูลไม่ถูกต้อง หรือต้องการแก้ไขข้อมูล <span>กรุณาติดต่อที่ไลน์ <a
            href="https://liff.line.me/1645278921-kWRPP32q/?accountId=724training" title="724 Line Official Account"
            target="_blank">@724training</a></span></div>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitVerifyRegister" :actions="false" id="form-login"
      form-class="form-login form-theme" #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="registered-data">

        <div class="item">
          <div class="label">รหัสสมาชิก</div>
          <div class="data">{{ registerData.AgentCode }}</div>
        </div>
        <div class="item">
          <div class="label">เลขที่บัตรประชาชน</div>
          <div class="data">{{ registerData.IDCard2 }}</div>
        </div>
        <div class="item">
          <div class="label">ชื่อ—นามสกุล</div>
          <div class="data">{{ registerData.NameTitle }} {{ registerData.FirstName }} {{ registerData.LastName }}</div>
        </div>
        <div class="item">
          <div class="label">เบอร์มือถือ</div>
          <div class="data">{{ registerData.Phone }}</div>
        </div>

      </div>

      <FormKit type="submit" label="ยืนยันข้อมูลถูกต้อง" name="verify-submit" id="verify-submit" :classes="{
        input: 'btn-primary',
        outer: 'form-actions'
      }" :disabled="isLoading" :loading="isLoading" />

    </FormKit>

  </div>
</template>

<script setup>
// Define import
// Import store
import { useStoreProgress } from '~/stores/storeProgress';

// Pinia
import { createPinia } from 'pinia'
import { storeToRefs } from 'pinia'

// Pinia persist plugin
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Define Variables
// State or Store
const store = useStoreProgress()
const { completedVerifyRegister, registerData } = storeToRefs(store)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Submit form event
const submitVerifyRegister = async (formData) => {

  const response = await useCallApi().get({
    URL: '/Agent/register',
    AgentCode: registerData.value.AgentCode,
    IDCard: registerData.value.IDCard,
    FirstName: registerData.value.FirstName,
    LastName: registerData.value.LastName,
    TemporaryPhone: '0868986464'
  })

  statusMessage.value           = response.statusMessage
  statusMessageType.value       = response.statusMessageType
  completedVerifyRegister.value = false // Form completed status
  submitted.value               = false // Form submitted status

  if (response.serverStatus === 200) {
    if (response.status === 200) {

        registerData.value.CodeReference  = response.respData.ref_code
        registerData.value.Token          = response.respData.token
        completedVerifyRegister.value     = true

    }
    submitted.value = true
  }

}

</script>

<style scoped>
@media only screen and (min-width: 640px) {
  .form-header>[class^=notice-]>span {
    display: block;
  }

}
</style>
