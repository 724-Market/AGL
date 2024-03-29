import type { IPackageResponse } from '~/shared/entities/packageList-entity'

export const useStorePackage = defineStore('useStorePackage', {
    state: (): IPackageResponse => {
        return {
            CarTypeName: '',
            CompanyCode: '',
            CompanyName: '',
            Cost: 0,
            CountOfPolicy: 0,
            DayPolicy: 0,
            DayWholeYear: 0,
            Duty: 0,
            IsOnlineActive: false,
            PackageResult: [],
            Price: 0,
            Rate: 0,
            RefCompanyID: '',
            Vat: 0,
            IsTaxInclude: false,
            PaperBalance: 0,
            AgentCode: ""
        }
    },
    getters: {
        PackageInfo: state => state,
    },
    actions: {
        setPackage(request: IPackageResponse): IPackageResponse {


            this.$state = request

            return this.$state
        },

        clearPackage() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStorePackage')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})