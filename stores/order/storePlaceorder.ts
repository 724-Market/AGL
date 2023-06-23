import { OrderRequest } from "~/shared/entities/placeorder-entity";

export const useStorePlaceorder = defineStore('useStorePlaceorder', {
    state: (): OrderRequest => {
        return {
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
            DeliveryType: "",
            DeliveryChannelType: "",
            DeliveryEmail: "",
            IsTaxInvoice: false
        }
    },
    getters: {
        OrderInfo: state => sessionStorage.getItem("useStorePlaceorder") ? JSON.parse(sessionStorage.getItem("useStorePlaceorder") || "") as OrderRequest : "",
    },
    actions: {
        setOrder(request: OrderRequest): OrderRequest {
            this.$state = request

            return this.$state
        },

        clearOrder() {
            this.$state = {
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
                DeliveryType: "",
                DeliveryChannelType: "",
                DeliveryEmail: "",
                IsTaxInvoice: false
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})