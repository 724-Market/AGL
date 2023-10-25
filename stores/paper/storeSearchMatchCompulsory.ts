import { SearchMatchReq, SearchMatchRes } from "~/shared/entities/paper-entity"
import { WrapperResponse } from "~/shared/entities/wrapper-response"

export const useStoreSearchMatchCompulsory = defineStore('useStoreSearchMatchCompulsory', {
    state: (): WrapperResponse<SearchMatchRes[]> => {
        return {
            Status: ""
        }
    },
    getters: {
        MatchCompulsoryInfo: state => state,
    },
    actions: {
        async getSearchMatch(request: SearchMatchReq): Promise<WrapperResponse<SearchMatchRes[]>> {
            if (!this.$state.Data) {
                var response = await useRepository().paper.getProductSearchMatchReq(request);
                this.$state = response.apiResponse
            }
            return this.$state
        },

        clearSearchMatch() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreSearchMatchCompulsory')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})