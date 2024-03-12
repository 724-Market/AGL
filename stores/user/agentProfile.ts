import { StorageSerializers } from '@vueuse/core'

export const useAgentProfileStore = defineStore('agentProfile', {

  state: () => ({
    AMType: '',
    AMId: '',
    AMNo: '',
    AMLevel: '',
    isAMAffiliate: '',
    AMPlanName: '',
    AMPlanExpire: ''
  }),

  actions: {
    async get() {

      // load_profile()
      // load_plan()
      // load_balance()

    },
    async load_profile() {

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
    async load_plan() {

        const res_plan = await useRepository().agent.getPlanProduct()
        const resultCheck_plan = useUtility().responseCheck(res_plan)

        if (resultCheck_plan.status === 'pass') {
          this.AMPlanName = res_plan.apiResponse.Data.Main[0].ProductPlanName
          this.AMPlanExpire = res_plan.apiResponse.Data.Main[0].ExpireDate
        }

    },
    async load_balance() {
    },

    $reset() {
      this.AMType = ''
      this.AMId = ''
      this.AMNo = ''
      this.AMLevel = ''
      this.isAMAffiliate = ''
      this.AMPlanName = ''
      this.AMPlanExpire = ''
    },

    $dispose() {
      this.AMType = null
      this.AMId = null
      this.AMNo = null
      this.AMLevel = null
      this.isAMAffiliate = null
      this.AMPlanName = null
      this.AMPlanExpire = null
    }
  },

  persist: {
    storage: persistedState.sessionStorage,
  }
})