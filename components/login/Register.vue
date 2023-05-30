<template>
  <div class="card-login">

    <header class="form-header">
      <h1 class="title">ลงทะเบียน</h1>
      <h2 class="subtitle">เพื่อเปิดใช้งานระบบสมาชิก</h2>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitRegister" :actions="false" id="form-register" form-class="form-login form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <ElementsFormUsername />

      <ElementsFormIdCard />

      <FormKit type="submit" label="ลงทะเบียนเปิดใช้งาน" name="register-submit" id="register-submit" :classes="{
        input: 'btn-primary',
        outer: 'form-actions'
      }" :disabled="isLoading" :loading="isLoading" />

    </FormKit>

    <footer class="form-footer">
      <p>เคยลงทะเบียนแล้ว ?
        <NuxtLink to="/login" title="เข้าสู่ระบบได้เลย">เข้าสู่ระบบได้เลย</NuxtLink>
      </p>
    </footer>

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
const { completedRegister, registerData } = storeToRefs(store)
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
// case 1
// const values = reactive({
//   username: 'AM00371908',
//   idcard: '1100400284852'
// })
// case 2
// const values = reactive({
//   username: 'AM00125633',
//   idcard: '3909900809081'
// })

// Submit form event
const submitRegister = async (formData) => {

  // Add waiting time for debug
  // await new Promise((r) => setTimeout(r, 1000))

  const response = await useCallApi().get({
    URL: '/Agent/user/check',
    AgentCode: formData.username,
    IDCard: formData.idcard,
  })

  statusMessage.value = response.statusMessage
  statusMessageType.value = response.statusMessageType
  completedRegister.value = false // Form completed status
  submitted.value = false // Form submitted status

  if (response.serverStatus === 200) {
    if (response.status === 200) {

      if (response.respOptions == 'REGISTER') {

        await new Promise((r) => setTimeout(r, 1000)) // Add delay time
        registerData.value = {
          AgentCode: response.respData.AgentCode,
          IDCard: formData.idcard,
          IDCard2: response.respData.IDCard,
          NameTitle: response.respData.NameTitle,
          FirstName: response.respData.FirstName,
          LastName: response.respData.LastName,
          Phone: response.respData.Phone,
          Email: response.respData.Email
        }
        completedRegister.value = true

      }
      else {
        await new Promise((r) => setTimeout(r, 3000)) // Add delay time
        await navigateTo('/login')
      }

    }
    submitted.value = true
  }

}

</script>