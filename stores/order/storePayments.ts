import { PaymentSaveResponse } from '~/shared/entities/payment-entity'

export const useStorePayment = defineStore('useStorePayment', {
    state: (): PaymentSaveResponse => {
        return {
            OrderNo: '',
            PaymentType: '',
            DiscountType: '',
            DeliveryAmount: 0,
            FeeAmount: 0,
            PaperAmount: 0,
            CreditAmount: 0,
            OrderAmount: 0,
            GrandAmount: 0,
            CashBack: 0,
            CreateDate: '',
            CreateUser: '',
            UpdateDate: '',
            UpdateUser: '',
        }
    },
    getters: {
        PaymentInfo: state => state,
    },
    actions: {
        setPayment(request: PaymentSaveResponse): PaymentSaveResponse {


            this.$state = request

            return this.$state
        },

        clearPayment() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStorePayment')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})