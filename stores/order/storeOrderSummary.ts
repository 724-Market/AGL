import type { OrderResponse } from '~/shared/entities/order-entity'

export const useStoreOrderSummary = defineStore('useStoreOrderSummary', {
    state: (): OrderResponse => {
        return {
            
        }
    },
    getters: {
        OrderSummaryInfo: state => state,
    },
    actions: {
        setOrderSummary(request: OrderResponse): OrderResponse {
            this.$state = request
            return this.$state
        },
        clearOrderSummary() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreOrderSummary')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})