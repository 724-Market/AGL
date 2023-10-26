import { ExchangeDataSummary, ExchangeType} from "~/shared/entities/paper-entity"

export const useStoreExchangeDataSummary = defineStore('useStoreExchangeDataSummary', {
    state: (): ExchangeDataSummary[] => {
        return []
    },
    getters: {
        ExchangeDataSummary: state => state,
    },
    actions: {
        async setExchangeData(request: ExchangeDataSummary,type:ExchangeType): Promise<ExchangeDataSummary[]> {
            if (this.$state.length==0) {
                this.$state.push(request)
            }
            else{
                const index = this.$state.findIndex(x=>x.Item.ProductID===request.Item.ProductID && x.Item.WarehouseID===request.Item.WarehouseID)
                if(index>-1)
                {
                    if(type == ExchangeType.None)
                    {
                        const data = this.$state[index]
                        data.Item.Amount+=parseInt(request.Item.Amount.toString())
                        this.$state[index] = data
                    }
                    else if (type == ExchangeType.Change)
                    {
                        this.$state[index] = request
                    }
                    
                }
                else{
                    this.$state.push(request)
                }
            }
            return this.$state
        },

        clearExchangeData() {
            this.$reset()
            sessionStorage.removeItem('useStoreExchangeDataSummary')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})