import type { IPackageResponse, IPackageRequest } from '~/shared/entities/packageList-entity'
import type { WrapperResponse } from '~/shared/entities/wrapper-response'

export const useStorePackageList = defineStore('useStorePackageList', {
    state: (): WrapperResponse<IPackageResponse[]> => {
        return {
            Status: "",
        }
    },
    getters: {
        PackageList: state => state,
    },
    actions: {
        async getPackageList(request: any): Promise<WrapperResponse<IPackageResponse[]>> {
            const req = request as IPackageRequest
            const response = await useCallApi().post<IPackageResponse[]>({
                URL: '/Policy/package/list',
                UseCarCode: req.UseCarCode,
                CarTypeCode: req.CarTypeCode,
                CarCategoryID: req.CarCategoryID,
                CarSalesYear: req.CarSalesYear,
                CarBrandID: req.CarBrandID,
                CarModelID: req.CarModelID,
                SubCarModelID: req.SubCarModelID,
                AgentCode: req.AgentCode,
                EffectiveType: req.EffectiveType,
                EffectiveDate: req.EffectiveDate,
                ExpireDate: req.ExpireDate,
                Paging: req.Paging
            })
            this.$state = response.apiResponse

            return this.$state
        },
        
        clearPackageList() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStorePackageList')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})