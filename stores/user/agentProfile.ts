export const useAgentProfileStore = defineStore('agentProfile', {

  state: () => ({
    AMType: '',
    AMId: '',
    AMNo: '',
    AMLevel: '',
    isAMAffiliate: ''
  }),

  actions: {
    async fetch() {
      const response = await useRepository().agent.getAgentProfile()
      const resultCheck = useUtility().responseCheck(response)

      if (resultCheck.status === 'pass') {
        this.AMType = response.apiResponse.Data[0].AgentType
        this.AMId = response.apiResponse.Data[0].AgentID
        this.AMNo = response.apiResponse.Data[0].AgentType + response.apiResponse.Data[0].AgentID
        this.AMLevel = 'ระดับ ' + response.apiResponse.Data[0].ModelAgent
        this.isAMAffiliate = response.apiResponse.Data[0].IsAffiliate
      }
    },

    $reset() {
      this.AMType = null
      this.AMId = null
      this.AMNo = null
      this.AMLevel = null
      this.isAMAffiliate = null
    }
  },

  persist: {
    storage: persistedState.sessionStorage,
  }
})