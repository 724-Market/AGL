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

      const cached = useSessionStorage('cachedAgentProfile', null, {
        serializer: StorageSerializers.object
      })

      if (!cached.value) {
      
        const res_profile = await useRepository().agent.getAgentProfile()
        const resultCheck_profile = useUtility().responseCheck(res_profile)

        if (resultCheck_profile.status === 'pass') {
          this.AMType = res_profile.apiResponse.Data[0].AgentType
          this.AMId = res_profile.apiResponse.Data[0].AgentID
          this.AMNo = res_profile.apiResponse.Data[0].AgentType + res_profile.apiResponse.Data[0].AgentID
          this.AMLevel = 'ระดับ ' + res_profile.apiResponse.Data[0].ModelAgent
          this.isAMAffiliate = res_profile.apiResponse.Data[0].IsAffiliate
        }

        const res_plan = await useRepository().agent.getPlanProduct()
        const resultCheck_plan = useUtility().responseCheck(res_plan)

        if (resultCheck_plan.status === 'pass') {
          this.AMPlanName = res_plan.apiResponse.Data.Main[0].ProductPlanName
          this.AMPlanExpire = res_plan.apiResponse.Data.Main[0].ExpireDate
        }

        cached.value = { ...this.$state }
      }

      return cached
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