import { ExchangeDataSummary, ExchangeType} from "~/shared/entities/paper-entity"

export const useStoreExchangeDataInfo = defineStore('useStoreExchangeDataInfo', {
    state: (): ExchangeDataSummary[] => {
        return []
    },
    getters: {
        ExchangeDataSummaryInfo: state => state,
    },
    actions: {
        async setExchangeData(request: ExchangeDataSummary,type:ExchangeType): Promise<ExchangeDataSummary[]> {
            if (this.$state.length==0) {
                request.Item.Amount = parseInt(request.Item.Amount.toString())
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
                        request.Item.Amount = parseInt(request.Item.Amount.toString())
                        this.$state[index] = request
                    }
                    
                }
                else{
                    request.Item.Amount = parseInt(request.Item.Amount.toString())
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