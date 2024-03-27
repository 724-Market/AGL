export const useAgentInfoStore = defineStore('agentInfo', {

  state: () => ({
    AMUserType: '', 
    AMType: '',
    AMId: '',
    AMNo: '',
    AMLevel: '',
    isAMAffiliate: '',
    isAMPlan: '',
    AMPlanName: '',
    AMPlanExpire: '',
    AMAvailableBalance: '',
    AMCreditAvailable: '', 
  }),

  actions: {

    async getAll() {
    
      await this.getUser()
      await this.getProfile()
      await this.getPlan()
      await this.getPledgeBalance()
      await this.getPaperCreditBalance()

    },
    
    async refreshAll() {
    
      if(!this.AMUserType) {
        await this.getUser()
      }

      if(!this.AMId) {
        await this.getProfile()
      }

      if(!this.isAMPlan) {
        await this.getPlan()
      }

      if(!this.AMAvailableBalance) {
        await this.getPledgeBalance()
      }

      if(!this.AMCreditAvailable) {
        await this.getPaperCreditBalance()
      }

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

    // Get User
    async getUser() {
      const res_user = await useRepository().user.GetUser();
      const resultCheck_user = useUtility().responseCheck(res_user)

      if (resultCheck_user.status === 'pass') {
        this.AMUserType = res_user.apiResponse.Data[0].UserType
      }
    },

    // Get Plan
    async getPlan() {
      const res_plan = await useRepository().agent.getPlanProduct()
      const resultCheck_plan = useUtility().responseCheck(res_plan)

      if(resultCheck_plan.status === 'pass') {
        if(res_plan.apiResponse.Data.Main.length > 0 && res_plan.apiResponse.Data.Main[0].ProductPlanName) {
          this.AMPlanName = res_plan.apiResponse.Data.Main[0].ProductPlanName
        }
        if(res_plan.apiResponse.Data.Main.length > 0 && res_plan.apiResponse.Data.Main[0].ExpireDate) {
          this.AMPlanExpire = res_plan.apiResponse.Data.Main[0].ExpireDate
        }
        if(res_plan.apiResponse.Data.Main.length > 0 && res_plan.apiResponse.Data.Main[0].ProductPlanName) {
          this.isAMPlan = 'Yes'
        }
        else {
          this.isAMPlan = 'No'
        }
      }
    },

    // Get Pledge balance
    async getPledgeBalance() {
      const res_pledge = await useRepository().pledge.getCreditBalance()
      const resultCheck_pledge = useUtility().responseCheck(res_pledge)

      if(resultCheck_pledge.status === 'pass') {
        if(res_pledge.apiResponse.Data.length > 0 && res_pledge.apiResponse.Data[0].AvailableBalance) {
          this.AMAvailableBalance = res_pledge.apiResponse.Data[0].AvailableBalance
        }
      }

    },

    // Get Pledge balance
    async getPaperCreditBalance() {
      const res_paper = await useRepository().paper.getPaperCreditBalance()
      const resultCheck_paper = useUtility().responseCheck(res_paper)

      if(resultCheck_paper.status === 'pass') {
        if(res_paper.apiResponse.Data.length > 0 && res_paper.apiResponse.Data[0].CreditAvailable) {
          this.AMCreditAvailable = res_paper.apiResponse.Data[0].CreditAvailable
        }
      }

    },

    async clearAgentInfo() {
        this.$reset()
        this.$dispose()
        sessionStorage.removeItem('agentInfo')
    },

    // Reset store
    $reset() {
      // this.AMUserType = ''
      // this.AMType = ''
      // this.AMId = ''
      // this.AMNo = ''
      // this.AMLevel = ''
      // this.isAMAffiliate = ''
      // this.isAMPlan = ''
      // this.AMPlanName = ''
      // this.AMPlanExpire = ''
      // this.AMAvailableBalance = ''
      // sessionStorage.removeItem('agentInfo')
    },

    // Dispose store
    $dispose() {
      // this.AMUserType = null 
      // this.AMType = null
      // this.AMId = null
      // this.AMNo = null
      // this.AMLevel = null
      // this.isAMAffiliate = null
      // this.isAMPlan = null
      // this.AMPlanName = null
      // this.AMPlanExpire = null
      // this.AMAvailableBalance = null
      // sessionStorage.removeItem('agentInfo')
    }, 

  },

  persist: {
    storage: persistedState.sessionStorage,
  }
})