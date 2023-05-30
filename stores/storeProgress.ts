interface State {
  step: number
  completedRegister: boolean
  completedVerifyRegister: boolean
  completedOtp: boolean
  completedSetPassword: boolean
  registerData: object | null
}

export const useStoreProgress = defineStore('StoreProgress', {
  state: (): State => {
    return {
      step: 0,
      completedRegister: false,
      completedVerifyRegister: false,
      completedOtp: false,
      completedSetPassword: false,
      registerData: null
    }
  },
  actions: {
    incrementStep() {
      this.step++
    },
    resetStore() {
      this.step = 0
      this.completedRegister = false
      this.completedVerifyRegister = false
      this.completedOtp = false
      this.completedSetPassword = false
      navigateTo('/login')
    }
  },
  persist: {
    storage: persistedState.sessionStorage,
  }
})