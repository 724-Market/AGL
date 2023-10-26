import { ExchangeDataSummary, ExchangeType } from "~/shared/entities/paper-entity"
import { useStoreExchangeDataSummary } from "~/stores/paper/storeExchangeDataSummary"


export default () => {
    const storeExchange = useStoreExchangeDataSummary()
    const onSelectExchangePaper = async (item:ExchangeDataSummary)=>{
        console.log('onSelectExchangePaper',item)
        storeExchange.setExchangeData(item,ExchangeType.None)
    }

    return {
        onSelectExchangePaper
    }
}