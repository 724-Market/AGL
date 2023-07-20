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
    getters: {
        CarInfo: state => state,
    },
    actions: {
        setInformation(request: IInformation): IInformation {
            this.$state = request

            return this.$state
        },

        clearInformation() {
            this.$reset()
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})