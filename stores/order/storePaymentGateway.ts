import { PaymentGatewayResponse }  from "~/shared/entities/payment-entity";

export const useStorePaymentGateway = defineStore('useStorePaymentGateway', {
    state: (): PaymentGatewayResponse => {
        return {
            orderid: '',
            refno1: '',
            refno2: '',
            amount: '',
            payment_id: '',
            payment_type: '',
            endpoint_code: '',
            payment_channel: '',
            payment_expired: '',
            payment_status: '',
            payment_code: '',
            payment_date: '',
            pgc_url: '',
            payment_url: '',
            payment_qr: ''
        }
    },
    getters: {
        PaymenGatewaytInfo: state => state,
    },
    actions: {
        setPaymenGateway(request: PaymentGatewayResponse): PaymentGatewayResponse {
            this.$state = request
            return this.$state
        },

        clearPaymenGateway() {
            this.$state = {
                orderid: '',
                refno1: '',
                refno2: '',
                amount: '',
                payment_id: '',
                payment_type: '',
                endpoint_code: '',
                payment_channel: '',
                payment_expired: '',
                payment_status: '',
                payment_code: '',
                payment_date: '',
                pgc_url: '',
                payment_url: '',
                payment_qr: ''
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})