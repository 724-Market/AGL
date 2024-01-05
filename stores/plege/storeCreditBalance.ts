import type { CreditBalanceResponse } from "~/shared/entities/pledge-entity"

export const useStoreCreditBalance = defineStore('useStoreCreditBalance', {
    state: (): CreditBalanceResponse => {
        return {
            OwnerID: "",
            UserID: "",
            MaxPeriodAmount: 0,
            PeriodDay: 0,
            CreditUseCheckPoint: "",
            AvailableBalance: 0,
            HoldAdd: 0,
            HoldUse: 0,
            TotalBalance: 0,
            TotalUseSummary: 0,
            TotalAddSummary: 0,
            PeriodUsed: 0,
            AvailablePeriodAmount: 0,
            AvailablePeriodBalance: 0,
        }
    },
    getters: {
        CreditBalanceInfo: state => state,
    },
    actions: {
        async setCreditBalance(response: CreditBalanceResponse): Promise<CreditBalanceResponse> {
            this.$state = response
            return this.$state
        },
        clearCreditBalance() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreCreditBalance')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})