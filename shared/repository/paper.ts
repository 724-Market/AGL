import { 
  AreaListRes,
  BalanceRes,
  WarehouseAreaListReq,
  WarehouseAreaListRes,
  ProductsubcategoryAreaListReq,
  ProductsubcategoryAreaListRes,
  ProductcompanyAreaListReq,
  ProductcompanyAreaListRes,
  OrderListReq,
  OrderListRes,
  SearchMatchReq,
  SearchMatchRes,
  SubOrderListReq,
  SubOrderListRes,
  StatusGroupRequest,
  StatusGroupResponse,
  PaymentFeeLimitReq,
  PaymentFeeLimitRes,
  OrderExchangeCreateReq,
  OrderExchangeCreateRes,
  OrderListReq,
  OrderListRes,
  SubOrderListReq,
  SubOrderListRes,
  RemarkListReq,
  RemarkListRes
 } from './../entities/paper-entity';
import {
  PaymentGetResponse
 } from "../entities/payment-entity";
import { Filter } from "../entities/table-option";
import { IAPIResponse } from "../entities/useApi-response";

class PaperModule {
    private RESOURCE = '/Paper';

    async getarea(): Promise<IAPIResponse<AreaListRes[]>> {
      return await useCallApi().apiRepository<AreaListRes[]>(`${this.RESOURCE}/area/list`, {})
    }

    async getWarehouseArea(req: WarehouseAreaListReq): Promise<IAPIResponse<WarehouseAreaListRes[]>> {
      return await useCallApi().apiRepository<WarehouseAreaListRes[]>(`${this.RESOURCE}/warehouse/by-area/list`, req)
    }

    async getProductsubcategoryWarehouse(req: ProductsubcategoryAreaListReq): Promise<IAPIResponse<ProductsubcategoryAreaListRes[]>> {
      return await useCallApi().apiRepository<ProductsubcategoryAreaListRes[]>(`${this.RESOURCE}/productsubcategory/by-area-warehouse/list`, req)
    }

    async getProductcompanySubcategory(req: ProductcompanyAreaListReq): Promise<IAPIResponse<ProductcompanyAreaListRes[]>> {
      return await useCallApi().apiRepository<ProductcompanyAreaListRes[]>(`${this.RESOURCE}/productcompany/by-area-warehouse-subcategory/list`, req)
    }

    async getProductSearchMatchReq(req: SearchMatchReq): Promise<IAPIResponse<SearchMatchRes[]>> {
      return await useCallApi().apiRepository<SearchMatchRes[]>(`${this.RESOURCE}/search/match-and/list`, req)
    }

    async getPaymentDeliveryFeeLimitReq(req: PaymentFeeLimitReq): Promise<IAPIResponse<PaymentFeeLimitRes[]>> {
      return await useCallApi().apiRepository<PaymentFeeLimitRes[]>(`${this.RESOURCE}/payment/deliveryfee/limit/get`, req)
    }
    async confirmOrderExchange(req:OrderExchangeCreateReq): Promise<IAPIResponse<OrderExchangeCreateRes[]>> {
      return await useCallApi().apiRepository<OrderExchangeCreateRes[]>(`${this.RESOURCE}/order/exchange/create`, req)
    }
    
    async getOrder(req:OrderListReq): Promise<IAPIResponse<OrderListRes[]>> {
      return await useCallApi().apiRepository<OrderListRes[]>(`${this.RESOURCE}/order/get`, req)
    }
    
    async getSubOrderList(req:SubOrderListReq): Promise<IAPIResponse<SubOrderListRes[]>> {
      return await useCallApi().apiRepository<SubOrderListRes[]>(`${this.RESOURCE}/sub/order/list`, req)
    }
    
    async statusGroup(filter?: Filter[]): Promise<IAPIResponse<StatusGroupResponse>> {
      const req: StatusGroupRequest = {
        Filter: filter
      }
      return await useCallApi().apiRepository<StatusGroupResponse>(`${this.RESOURCE}/status/group/get`, req)
    }

    async getPaperBalance(): Promise<IAPIResponse<BalanceRes[]>> {
      return await useCallApi().apiRepository<BalanceRes[]>(`${this.RESOURCE}/overall/balance/get`, {})
    }
    
    async getOrder(req:OrderListReq): Promise<IAPIResponse<OrderListRes[]>> {
      return await useCallApi().apiRepository<OrderListRes[]>(`${this.RESOURCE}/order/get`, req)
    }
    
    async getSubOrderList(req:SubOrderListReq): Promise<IAPIResponse<SubOrderListRes[]>> {
      return await useCallApi().apiRepository<SubOrderListRes[]>(`${this.RESOURCE}/sub/order/list`, req)
    }
    async remark(req: RemarkListReq): Promise<IAPIResponse<RemarkListRes[]>> {
      return await useCallApi().apiRepository<RemarkListRes[]>(`${this.RESOURCE}/remark/list`, req)
    }
}

export default PaperModule;