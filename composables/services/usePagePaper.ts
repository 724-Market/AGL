import { storeToRefs } from "pinia"
import { CalculateGrandTotal, ExchangeDataSummary, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo"
import { useStoreCreditBalance } from "~/stores/plege/storeCreditBalance"


export default () => {
    const storeExchange = useStoreExchangeDataInfo()

    const onSelectExchangePaper = async (item:SearchMatchRes)=>{
        console.log('onSelectExchangePaper',item)
        await storeExchange.setExchangeData(item)
    }
    const onChangeExchangePaper = async (item:ExchangeDataSummary)=>{
        console.log('onChangeExchangePaper',item)
        await storeExchange.changeExchangeData(item)
    }
    const onClearExchangePaper = async ()=>{
       
        await storeExchange.clearExchangeData()
    }

    const calculateGrandTotal = (exchangeData:ExchangeDataSummary[],paymentFee:PaymentFeeLimitRes[],shippingMethod:string,shippingFee:number):CalculateGrandTotal=>{
        const storeCredit = useStoreCreditBalance()
        const {AvailableBalance} = storeToRefs(storeCredit)
        //const TotalAmount = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount),0)
        const OrderAmount = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount*currentValue.MatchItem.ProductPrice),0)
        const paymentFeeDiscount = paymentFee.length>0 ? paymentFee[0].Min : 0
        let GrandAmount = 0;
        if(shippingMethod=="" || (shippingMethod!="" && OrderAmount>=paymentFeeDiscount))
        {
            GrandAmount = OrderAmount
        }
        else{
            GrandAmount = shippingFee+OrderAmount
        }

        const res:CalculateGrandTotal={
            AvailableBalanceCredit:AvailableBalance.value,
            GrandAmount:GrandAmount,
            OrderAmount:OrderAmount,
            PaymentFeeLimit:paymentFeeDiscount,
            ShippingFee:shippingFee,
            ShippingMethod:shippingMethod,
            Discount:paymentFeeDiscount ? -shippingFee : 0
        }

        return res
    }
    return {
        onSelectExchangePaper,
        onChangeExchangePaper,
        onClearExchangePaper,
        calculateGrandTotal
    }
}