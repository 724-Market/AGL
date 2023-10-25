import { SearchMatchReq, SearchMatchRes } from "~/shared/entities/paper-entity"
import { WrapperResponse } from "~/shared/entities/wrapper-response"

export const useStoreSearchMatchInsurance = defineStore('useStoreSearchMatchInsurance', {
    state: (): WrapperResponse<SearchMatchRes[]> => {
        return {
            Status: ""
        }
    },
    getters: {
        MatchInsuranceInfo: state => state,
    },
    actions: {
        async getSearchMatch(request: SearchMatchReq): Promise<WrapperResponse<SearchMatchRes[]>> {
            if (!this.$state.Data) {
                var response = await useRepository().paper.getProductSearchMatchReq(request);
                this.$state = response.apiResponse
            }
            return this.$state
        },

        clearPackage() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreSearchMatchInsurance')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})