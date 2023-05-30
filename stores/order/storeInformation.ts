import { IInformation } from "~/shared/entities/information-entity"

export const useStoreInformation = defineStore('useStoreInformation', {
    state: (): IInformation => {
        return {
            CarUse: "",
            CarType: "",
            CarSize: "",
            CarYear: "",
            CarBrand: "",
            CarModel: "",
            SubCarModel: "",
            customSubCarModel: "",
            CarCC: "",
            EffectiveType: "",
            EffectiveDate: "",
            ExpireDate: "",
            CarDetail: ""
        }
    },
    getters:{
        InformationInfo:state => sessionStorage.getItem("useStoreInformation") ? JSON.parse(sessionStorage.getItem("useStoreInformation") || "") as IInformation : undefined,
    },
    actions: {
        setInformation(request: IInformation): IInformation {
            this.$state = request

            return this.$state
        },

        clearInformation() {
            this.$state = {
                CarUse: "",
                CarType: "",
                CarSize: "",
                CarYear: "",
                CarBrand: "",
                CarModel: "",
                SubCarModel: "",
                customSubCarModel: "",
                CarCC: "",
                EffectiveType: "",
                EffectiveDate: "",
                ExpireDate: "",
                CarDetail: ""
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})