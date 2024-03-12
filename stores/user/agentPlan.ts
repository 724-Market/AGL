export const useAgentPlanStore = defineStore('agentPlan', {

  state: () => ({
    AMPlanName: '',
    AMPlanExpire: ''
  }),

  actions: {
    async fetch() {
      const response = await useRepository().agent.getPlanProduct()
      const resultCheck = useUtility().responseCheck(response)

      if (resultCheck.status === 'pass') {
        this.AMPlanName = response.apiResponse.Data.Main[0].ProductPlanName
        this.AMPlanExpire = response.apiResponse.Data.Main[0].ExpireDate
      }
    },

    $reset() {
      this.AMPlanName = null
      this.AMPlanExpire = null
    }
  },
  
  persist: {
    storage: persistedState.sessionStorage,
  }
})