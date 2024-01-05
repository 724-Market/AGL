<template>
  <NuxtLayout :name="layout">
    <div v-if="step === 0">
      <LoginRegister />
    </div>
    <div v-if="step === 1">
      <LoginVerifyRegister />
    </div>
    <div v-if="step === 2">
      <LoginOtp />
    </div>
    <div v-if="step === 3">
      <LoginSetPassword />
    </div>
  </NuxtLayout>
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
const store = useStoreProgress()
const { step, completedRegister, completedVerifyRegister, completedOtp, completedSetPassword, registerData } = storeToRefs(store)
const { incrementStep, resetStore } = store
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

watchEffect(async () => {
  if (completedRegister.value === true) {
    incrementStep()
    completedRegister.value = false
  }

  if (completedVerifyRegister.value === true) {
    incrementStep()
    completedVerifyRegister.value = false
  }

  if (completedOtp.value === true) {
    incrementStep()
    completedOtp.value = false
  }

  if (completedSetPassword.value === true) {
    resetStore()
    await navigateTo('/login')
  }
})

// Define layout
const layout = "login"

// Define meta seo
useHead({
  title: "Register",
  meta: [{ name: "description", content: "Register" }],
  bodyAttrs: {
    class: "page-register",
  },
})
</script>