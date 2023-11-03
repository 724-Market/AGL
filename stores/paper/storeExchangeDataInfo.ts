import { ExchangeDataSummary, SearchMatchRes } from "~/shared/entities/paper-entity"

export const useStoreExchangeDataInfo = defineStore('useStoreExchangeDataInfo', {
    state: (): ExchangeDataSummary[] => {
        return []
    },
    getters: {
        ExchangeDataSummaryInfo: state => state,
    },
    actions: {
        async setExchangeData(request: SearchMatchRes): Promise<ExchangeDataSummary[]> {

            const item: ExchangeDataSummary = {
                Item: {
                    ProductID: request.ProductID,
                    WarehouseID: request.WarehouseID,
                    Amount: request.Amount ?? 0
                },
                MatchItem: request
            }
            if (this.$state.length == 0) {
                item.Item.Amount = parseInt(item.Item.Amount.toString())
                this.$state.push(item)
            }
            else {
                const index = this.$state.findIndex(x => x.Item.ProductID === item.Item.ProductID && x.Item.WarehouseID === item.Item.WarehouseID)
                if (index > -1) {
                    const data = this.$state[index]
                    data.Item.Amount = parseInt(data.Item.Amount.toString())
                    data.Item.Amount += parseInt(item.Item.Amount.toString())
                    this.$state[index] = data
                }
                else {
                    item.Item.Amount = parseInt(item.Item.Amount.toString())
                    this.$state.push(item)
                }
            }
            return this.$state
        },
        async changeExchangeData(request: ExchangeDataSummary): Promise<ExchangeDataSummary[]> {

            if (this.$state.length == 0) {
                request.Item.Amount = parseInt(request.Item.Amount.toString())
                this.$state.push(request)
            }
            else {
                const index = this.$state.findIndex(x => x.Item.ProductID === request.Item.ProductID && x.Item.WarehouseID === request.Item.WarehouseID)
                if (index > -1) {
                    request.Item.Amount = parseInt(request.Item.Amount.toString())
                    this.$state[index] = request

                }
                else {
                    request.Item.Amount = parseInt(request.Item.Amount.toString())
                    this.$state.push(request)
                }
            }
            return this.$state
        },
        async updateExchangeData(items: ExchangeDataSummary[]): Promise<ExchangeDataSummary[]> {
            this.$state = items
            return this.$state
        },

        async clearExchangeData() {
            this.$state = [];
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreExchangeDataInfo')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})