import { NoticePaymentData }  from "~/shared/entities/payment-entity";

export const useStoreNoticePayment = defineStore('useStoreNoticePayment', {
    state: (): NoticePaymentData => {
        return {
            PaymentNo: '',
            PaymentType: '',
            Status: '',
            Message: '',
            PaymentDate: '',
            CancelDate: '',
        }
    },
    getters: {
        NoticePaymentInfo: state => state,
    },
    actions: {
        setNoticePayment(request: NoticePaymentData): NoticePaymentData {
            this.$state = request
            return this.$state
        },

        clearNoticePayment() {
            this.$state = {
                PaymentNo: '',
                PaymentType: '',
                Status: '',
                Message: '',
                PaymentDate: '',
                CancelDate: '',
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})