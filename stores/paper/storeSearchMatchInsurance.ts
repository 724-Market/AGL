import type { SearchMatchReq, SearchMatchRes } from "~/shared/entities/paper-entity"
import type { WrapperResponse } from "~/shared/entities/wrapper-response"

export const useStoreSearchMatchInsurance = defineStore('useStoreSearchMatchInsurance', {
    state: (): WrapperResponse<SearchMatchRes[]> => {
        return {
            Status: "",
            Data: []
        }
    },
    getters: {
        MatchInsuranceInfo: state => state,
    },
    actions: {
        async getSearchMatch(request: SearchMatchReq): Promise<WrapperResponse<SearchMatchRes[]>> {
            // if (!this.$state.Data) {
            //     const response = await useRepository().paper.getProductSearchMatchReq(request);
            //     this.$state = response.apiResponse
            // }
            const response = await useRepository().paper.getProductSearchMatchReq(request);
            this.$state = response.apiResponse
            return this.$state
        },

        clearSearchMatch() {
            // this.$reset()
            // this.$dispose()
            // sessionStorage.removeItem('useStoreSearchMatchInsurance')
            this.$state = {
                Status: "",
                Data: []
            };
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})