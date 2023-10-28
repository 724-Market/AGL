import { storeToRefs } from "pinia"
import { CalculateGrandTotal, ExchangeDataSummary, OrderExchangeCreateReq, OrderExchangeCreateRes, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"
import { PaymentGetResponse } from "~/shared/entities/payment-entity"
import { WrapperResponse } from "~/shared/entities/wrapper-response"
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo"
import { useStoreCreditBalance } from "~/stores/plege/storeCreditBalance"


export default () => {
    const storeExchange = useStoreExchangeDataInfo()

    const onSelectExchangePaper = async (item: SearchMatchRes) => {
        console.log('onSelectExchangePaper', item)
        await storeExchange.setExchangeData(item)
    }
    const onChangeExchangePaper = async (item: ExchangeDataSummary) => {
        console.log('onChangeExchangePaper', item)
        await storeExchange.changeExchangeData(item)
    }
    const onClearExchangePaper = async () => {

        await storeExchange.clearExchangeData()
    }
    const mappingExchangeConfirmRequest = ():OrderExchangeCreateReq=>{
        const req:OrderExchangeCreateReq = {
            DeliveryMethod:{
              DeliveryChannelType:"",
              DeliveryType:"",
              MethodType:"",
            },
            ExchangeData:{
              Amount:0,
              ProductID:"",
              WarehouseID:""
            },
            IsConsent:true,
            DeliveryAddress:{
              AddressID:"",
              AddressLine1:"",
              AddressLine2:"",
              AddressText:"",
              Alley:"",
              Branch:"",
              Building:"",
              DistrictID:"",
              Email:"",
              FirstName:"",
              Floor:"",
              LastName:"",
              Moo:"",
              Name:"",
              No:"",
              PhoneNumber:"",
              Place:"",
              ProvinceID:"",
              ReferenceID:"",
              ReferenceType:"",
              Road:"",
              Room:"",
              SubDistrictID:"",
              TaxID:"",
              Type:"",
              PrefixID:"", // optional
              PrefixName:"",// optional
              ZipCode:"",// optional
            }
          }

          return req
    }
    const onContinue = async (req: OrderExchangeCreateReq): Promise<WrapperResponse<PaymentGetResponse[]>> => {
        let res: WrapperResponse<PaymentGetResponse[]> = {
          Status:"",
        }
        const orderExchange = await useRepository().paper.confirmOrderExchange(req)
        res = orderExchange.apiResponse;
        return res
    }
    const calculateGrandTotal = (exchangeData: ExchangeDataSummary[], paymentFee: PaymentFeeLimitRes[], shippingMethod: string, shippingFee: number): CalculateGrandTotal => {
        const storeCredit = useStoreCreditBalance()
        const { AvailableBalance } = storeToRefs(storeCredit)
        //const TotalAmount = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount),0)
        const OrderAmount = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount * currentValue.MatchItem.ProductPrice), 0)
        const paymentFeeDiscount = paymentFee.length > 0 ? paymentFee[0].Min : 0
        let GrandAmount = 0;
        if (shippingMethod == "" || (shippingMethod != "" && OrderAmount >= paymentFeeDiscount)) {
            GrandAmount = OrderAmount
        }
        else {
            GrandAmount = shippingFee + OrderAmount
        }

        const res: CalculateGrandTotal = {
            AvailableBalanceCredit: AvailableBalance.value,
            GrandAmount: GrandAmount,
            OrderAmount: OrderAmount,
            PaymentFeeLimit: paymentFeeDiscount,
            ShippingFee: shippingFee,
            ShippingMethod: shippingMethod,
            Discount: paymentFeeDiscount ? -shippingFee : 0
        }

        return res
    }
    const onDeleteConfirm = async (itemSelection: ExchangeDataSummary): Promise<ExchangeDataSummary[]> => {
        let list: ExchangeDataSummary[] = []
        const items = storeExchange.$state
        const index = items.findIndex(x => x.Item.ProductID === itemSelection.Item.ProductID && x.Item.WarehouseID === itemSelection.Item.WarehouseID)
        if (index > -1) {
            items.splice(index, 1)
            list = await storeExchange.updateExchangeData(items)
        }

        return list

    }
    return {
        onSelectExchangePaper,
        onChangeExchangePaper,
        onClearExchangePaper,
        calculateGrandTotal,
        onDeleteConfirm,
        onContinue,
        mappingExchangeConfirmRequest
    }
}