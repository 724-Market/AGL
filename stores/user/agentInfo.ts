export const useAgentInfoStore = defineStore('agentInfo', {

  state: () => ({
    AMType: '',
    AMId: '',
    AMNo: '',
    AMLevel: '',
    isAMAffiliate: '',
    AMPlanName: '',
    AMPlanExpire: '',
    AMAvailableBalance: '',
  }),

  actions: {

    async getAll() {
      
      await getProfile()
      await getPlan()
      await getPledgeBalance()

    },
    
    // Get Profile
    async getProfile() {
      const res_profile = await useRepository().agent.getAgentProfile()
      const resultCheck_profile = useUtility().responseCheck(res_profile)

      if (resultCheck_profile.status === 'pass') {
        this.AMType = res_profile.apiResponse.Data[0].AgentType
        this.AMId = res_profile.apiResponse.Data[0].AgentID
        this.AMNo = res_profile.apiResponse.Data[0].AgentType + res_profile.apiResponse.Data[0].AgentID
        this.AMLevel = 'ระดับ ' + res_profile.apiResponse.Data[0].ModelAgent
        this.isAMAffiliate = res_profile.apiResponse.Data[0].IsAffiliate
      }
    },

    // Get Plan
    async getPlan() {
      const res_plan = await useRepository().agent.getPlanProduct()
      const resultCheck_plan = useUtility().responseCheck(res_plan)

      if (resultCheck_plan.status === 'pass') {
        this.AMPlanName = res_plan.apiResponse.Data.Main[0].ProductPlanName
        this.AMPlanExpire = res_plan.apiResponse.Data.Main[0].ExpireDate
      }
    },

    // Get Pledge balance
    async getPledgeBalance() {
      const res_pledge = await useRepository().pledge.creditBalance()
      const resultCheck_pledge = useUtility().responseCheck(res_pledge)

      if (resultCheck_pledge.status === 'pass') {
        this.AMAvailableBalance = res_pledge.apiResponse.Data[0].AvailableBalance
      }
    },

    // Reset store
    $reset() {
      this.AMType = ''
      this.AMId = ''
      this.AMNo = ''
      this.AMLevel = ''
      this.isAMAffiliate = ''
      this.AMPlanName = ''
      this.AMPlanExpire = ''
      this.AMAvailableBalance = ''
    },

    // Dispose store
    $dispose() {
      this.AMType = null
      this.AMId = null
      this.AMNo = null
      this.AMLevel = null
      this.isAMAffiliate = null
      this.AMPlanName = null
      this.AMPlanExpire = null
      this.AMAvailableBalance = null
    }
  },

  persist: {
    storage: persistedState.sessionStorage,
  }
})