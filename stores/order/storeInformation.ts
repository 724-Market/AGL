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
            CarDetail: "",
            InsuranceDay: 0
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
            this.$dispose()
            sessionStorage.removeItem('useStoreInformation')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})