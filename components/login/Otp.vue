<template >
  <div class="card-login" v-if="!isOtpCompleted">

    <header class="form-header">
      <h1 class="title">ตรวจสอบรหัส OTP</h1>
      <h2 class="subtitle">ระบบได้ส่งรหัส OTP ไปยังเบอร์โทรศัพท์<br><b>{{ values.phoneNumber }}</b></h2>
      <div class="notice-info"><b>Ref.Code : {{ values.refCode }}</b></div>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitOtp" :actions="false" id="form-otp" form-class="form-login form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <ElementsFormOtp />

      <FormKit type="submit" label="ยืนยันรหัส OTP" name="otp-submit" id="otp-submit" :classes="{
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
const { completedOtp, registerData } = storeToRefs(store)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Binding default value
const values = reactive({
  phoneNumber: registerData.value.Phone,
  refCode: registerData.value.CodeReference
})

// Submit form event
const submitOtp = async (formData) => {

  const response = await useCallApi().get({
    URL: '/Agent/register/otp/verify',
    CodeVerify: formData.otp, 
    CodeReference: registerData.value.CodeReference, 
    Token: registerData.value.Token
  })

  statusMessage.value           = response.statusMessage
  statusMessageType.value       = response.statusMessageType
  completedOtp.value            = false // Form completed status
  submitted.value               = false // Form submitted status

  if (response.serverStatus === 200) {
    if (response.status === 200) {

        registerData.value.ReferenceID  = response.respData.ReferenceID
        completedOtp.value = true

    }
    submitted.value = true
  }

}

</script>-