import type { SearchMatchReq, SearchMatchRes } from "~/shared/entities/paper-entity"
import type { WrapperResponse } from "~/shared/entities/wrapper-response"

export const useStoreSearchMatchCompulsory = defineStore('useStoreSearchMatchCompulsory', {
    state: (): WrapperResponse<SearchMatchRes[]> => {
        return {
            Status: "",
            Data: []
        }
    },
    getters: {
        MatchCompulsoryInfo: state => state,
    },
    actions: {
        async getSearchMatch(request: SearchMatchReq): Promise<WrapperResponse<SearchMatchRes[]>> {
            if (!this.$state.Data || this.$state.Data.length==0) {
                const response = await useRepository().paper.getProductSearchMatchReq(request);
                this.$state = response.apiResponse
            }
            return this.$state
        },

        clearSearchMatch() {
            // this.$reset()
            // this.$dispose()
            // sessionStorage.removeItem('useStoreSearchMatchCompulsory')
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