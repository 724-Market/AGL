
import { IPackageResponse, IPackageRequest } from '~/shared/entities/packageList-entity'
import { WrapperResponse } from '~/shared/entities/wrapper-response'

export const useStorePackageList = defineStore('useStorePackageList', {
    state: (): WrapperResponse<IPackageResponse[]> => {
        return {
            Status: "",
        }
    },
    getters: {
        PackageList: state => sessionStorage.getItem("useStorePackageList") ? JSON.parse(sessionStorage.getItem("useStorePackageList") || "") as WrapperResponse<IPackageResponse[]> : "",
    },
    actions: {
        async getPackageList(request: any): Promise<WrapperResponse<IPackageResponse[]>> {
            const req = request as IPackageRequest
            const response = await useCallApi().post<IPackageResponse[]>({
                URL: '/Policy/package/list/get',
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
            this.$state = {
                Status: ""
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})