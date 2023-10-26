import { ExchangeDataSummary, ExchangeType } from "~/shared/entities/paper-entity"
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo"


export default () => {
    const storeExchange = useStoreExchangeDataInfo()

    const onSelectExchangePaper = async (item:ExchangeDataSummary)=>{
        console.log('onSelectExchangePaper',item)
        storeExchange.setExchangeData(item,ExchangeType.None)
    }
    const onChangeExchangePaper = async (item:ExchangeDataSummary)=>{
        console.log('onChangeExchangePaper',item)
        storeExchange.setExchangeData(item,ExchangeType.Change)
    }
    return {
        onSelectExchangePaper,
        onChangeExchangePaper
    }
}