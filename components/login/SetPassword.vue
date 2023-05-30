<template>
  <div class="card-login" v-if="!isSetPasswordCompleted">

    <header class="form-header">
      <h1 class="title">กำหนดรหัสผ่าน</h1>
      <h2 class="subtitle">ควรสร้างรหัสผ่านที่ปลอดภัย</h2>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitSetpassword" :actions="false" id="form-setpassword"
      form-class="form-login form-theme" #default="{ value }" v-model="values" :incomplete-message="false">

      <ElementsFormPasswordWithConfirm />

      <div class="form-meta">
        <ElementsFormPasswordRequirements />
      </div>

      <FormKit type="submit" label="ยืนยันใช้รหัสผ่านนี้" name="setpassword-submit" id="setpassword-submit" :classes="{
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
const { completedSetPassword, registerData } = storeToRefs(store)
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
const submitSetpassword = async (formData) => {

  const response = await useCallApi().get({
    URL: '/Agent/password/first/setup',
    Password: formData.password, 
    CodeReference: registerData.value.CodeReference, 
    Token: registerData.value.Token, 
    ReferenceID: registerData.value.ReferenceID 
  })

  statusMessage.value           = response.statusMessage
  statusMessageType.value       = response.statusMessageType
  completedSetPassword.value    = false // Form completed status
  submitted.value               = false // Form submitted status

  if (response.serverStatus === 200) {
    if (response.status === 200) {

        await new Promise((r) => setTimeout(r, 1000)) // Add delay time 
        completedSetPassword.value = true

    }
    submitted.value = true
  }

}

</script>