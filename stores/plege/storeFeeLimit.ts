import type { PaymentFeeLimitRequest, PaymentFeeLimitResponse } from "~/shared/entities/pledge-entity"
import type { WrapperResponse } from "~/shared/entities/wrapper-response"


export const useStoreFeeLimit = defineStore('useStoreFeeLimit', {
    state: (): WrapperResponse<PaymentFeeLimitResponse[]> => {
        return {
            Status: ""
        }
    },
    getters: {
        FeeLimitInfo: state => state,
    },
    actions: {
        async getFeeLimit(request: PaymentFeeLimitRequest): Promise<WrapperResponse<PaymentFeeLimitResponse[]>> {
            if (!this.$state.Data) {
                const response = await useRepository().pledge.paymentFeeLimit(request)
                this.$state = response.apiResponse
            }
            return this.$state
        },

        clearFeeLimit() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreFeeLimit')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})