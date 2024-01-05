import type { PaymentGetResponse } from '~/shared/entities/payment-entity'

export const useStorePaymentGet = defineStore('useStorePaymentGet', {
    state: (): PaymentGetResponse => {
        return {
            ID: '',
            OwnerID: '',
            UserID: '',
            PaymentNo: '',
            PaymentType: '',
            DiscountType: '',
            CouponCode: '',
            NumCredit: 0,
            Status: '',
            LogMessage: '',
            TransferFileID: '',
            TransferBankCode: '',
            TransferDate: '',
            DeliveryAmount: 0,
            FeeAmount: 0,
            DiscountAmount: 0,
            PaperAmount: 0,
            CreditAmount: 0,
            OrderAmount: 0,
            GrandAmount: 0,
            IsTransfer: false,
            IsConsent: false,
            IsCallback: false,
            IsSuccess: false,
            IsCancel: false,
            IsPending: false,
            IsDelete: false,
            PaymentDate: '',
            PaymentUser: '',
            CancelDate: '',
            CancelUser: '',
            CreateDate: '',
            CreateUser: '',
            UpdateDate: '',
            UpdateUser: '',
        }
    },
    getters: {
        PaymentGetInfo: state => state,
    },
    actions: {
        setPaymentGet(request: PaymentGetResponse): PaymentGetResponse {


            this.$state = request

            return this.$state
        },

        clearPaymentGet() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStorePaymentGet')
            
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})