import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";

export const useStorePlaceorder = defineStore('useStorePlaceorder', {
    state: (): PlaceOrderRequest => {
        return {
            OrderNo:"",
            Package: {
                UseCarCode: "",
                CarTypeCode: "",
                CarCategoryID: "",
                CarSalesYear: "",
                CarBrandID: "",
                CarModelID: "",
                SubCarModelID: "",
                CompanyCode: "",
                AgentCode: "",
                EffectiveType: "",
                EffectiveDate: "",
                ExpireDate: "",
            },
            CarDetailsExtension: {
                License: "",
                BodyNo: "",
                EngineNo: "",
                ColorID: "",
                LicenseProvinceID: "",
                LicenseFileID: "",
                IsRedLicense: false
            },
            Customer: {},
            DeliveryMethod1:{
                MethodType: "",
                DeliveryType: "",
                DeliveryChannelType: "",
                DeliveryEmail: "",
            },
            DeliveryMethod2:{
                MethodType: "",
                DeliveryType: "",
                DeliveryChannelType: "",
                DeliveryEmail: "",
            },
            // DeliveryType: "",
            // DeliveryChannelType: "",
            // DeliveryEmail: "",
            IsTaxInvoice: false
        }
    },
    getters: {
        OrderInfo: state => state,
    },
    actions: {
        setOrder(request: PlaceOrderRequest): PlaceOrderRequest {
            this.$state = request

            return this.$state
        },

        clearOrder() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStorePlaceorder')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})