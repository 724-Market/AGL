import { storeToRefs } from "pinia"
import { CalculateGrandTotal, DeliveryAddressReq, ExchangeDataSummary, OrderExchangeCreateReq, OrderExchangeCreateRes, PaymentFeeLimitRes, SearchMatchRes } from "~/shared/entities/paper-entity"
import { PaymentGetResponse } from "~/shared/entities/payment-entity"
import { WrapperResponse } from "~/shared/entities/wrapper-response"
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo"
import { useStoreCreditBalance } from "~/stores/plege/storeCreditBalance"


export default () => {
    const storeExchange = useStoreExchangeDataInfo()

    const onSelectExchangePaper = async (item: SearchMatchRes) => {
        await storeExchange.setExchangeData(item)
    }
    const onChangeExchangePaper = async (item: ExchangeDataSummary) => {
        await storeExchange.changeExchangeData(item)
    }
    const onClearExchangePaper = async () => {
        const count = storeExchange.$state.length;
        storeExchange.$state.splice(0, count);
        //await storeExchange.clearExchangeData();
    }
    const mappingExchangeConfirmRequest = (deliveryType: string, shippingMethod: string, addr?: DeliveryAddressReq): OrderExchangeCreateReq => {
        const exchangeData = storeExchange.$state
        const req: OrderExchangeCreateReq = {
            DeliveryMethod: {
                DeliveryChannelType: shippingMethod,
                DeliveryType: deliveryType,
                MethodType: "PRODUCT_PAPER",
            },
            ExchangeData: exchangeData.map((x) => x.Item),
            IsConsent: true,
            DeliveryAddress: addr ?? null
        }

        return req
    }
    const onContinue = async (req: OrderExchangeCreateReq): Promise<WrapperResponse<OrderExchangeCreateRes[]>> => {
        let res: WrapperResponse<OrderExchangeCreateRes[]> = {
            Status: "",
        }
        const orderExchange = await useRepository().paper.confirmOrderExchange(req)
        res = orderExchange.apiResponse;
        return res
    }
    const calculateGrandTotal = (exchangeData: ExchangeDataSummary[], paymentFee: PaymentFeeLimitRes[], shippingMethod: string, shippingFee: number): CalculateGrandTotal => {
        const storeCredit = useStoreCreditBalance()
        const { AvailableBalance } = storeToRefs(storeCredit)
        const TotalQty = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount), 0)
        const OrderAmount = exchangeData.reduce((accumulator, currentValue) => accumulator + (currentValue.Item.Amount * currentValue.MatchItem.ProductPrice), 0)
        const paymentFeeDiscount = paymentFee.length > 0 ? paymentFee[0].Min : 0
        let GrandAmount = 0;
        if (OrderAmount > 0) {
            if (shippingMethod == "" || (shippingMethod != "" && OrderAmount >= paymentFeeDiscount)) {
                GrandAmount = OrderAmount
            }
            else {
                GrandAmount = shippingFee + OrderAmount
            }
        }

        const res: CalculateGrandTotal = {
            AvailableBalanceCredit: AvailableBalance.value,
            GrandAmount: GrandAmount,
            OrderAmount: OrderAmount,
            PaymentFeeLimit: paymentFeeDiscount,
            ShippingFee: shippingFee,
            ShippingMethod: shippingMethod,
            TotalQty: TotalQty,
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
    const setClassExchangeList = ():string=>{
        let className = "";
        const exhangeList = storeExchange.$state
        if(exhangeList.length>0)
        {
            className="cart-not-empty";
        }
        else{
            className="";
        }
        
        return className;
    }
    return {
        onSelectExchangePaper,
        onChangeExchangePaper,
        onClearExchangePaper,
        calculateGrandTotal,
        onDeleteConfirm,
        onContinue,
        mappingExchangeConfirmRequest,
        setClassExchangeList
    }
}