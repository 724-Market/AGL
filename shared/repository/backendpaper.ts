import { 
    cancelOrderReq,
    cancelOrderRes,
    getStatusGroupReq,
    getStatusGroupRes,
    getStatusGroupReq,
    getSubOrderListRes,
    getRemarkListReq,
    getRemarkListRes,
    OrderNoReq,
    getOrderDetailRes,
   } from './../entities/backendpaper-entity';
  import { Filter } from "../entities/table-option";
  import { IAPIResponse } from "../entities/useApi-response";
  
  class BackendPaperModule {
      private RESOURCE = '/PaperBackEnd';
      
      async statusGroup(filter?: Filter[]): Promise<IAPIResponse<getStatusGroupRes>> {
        const req: getStatusGroupReq = {
          Filter: filter
        }
        return await useCallApi().apiRepository<getStatusGroupRes>(`${this.RESOURCE}/status/group/get`, req)
      }
    
      async getOrderDetail(req:OrderNoReq): Promise<IAPIResponse<getOrderDetailRes[]>> {
        return await useCallApi().apiRepository<getOrderDetailRes[]>(`${this.RESOURCE}/order/get`, req)
      }
      
      async getSubOrderList(req:OrderNoReq): Promise<IAPIResponse<getSubOrderListRes[]>> {
        return await useCallApi().apiRepository<getSubOrderListRes[]>(`${this.RESOURCE}/sub/order/list`, req)
      }
      
      async getRemarkList(req:getRemarkListReq): Promise<IAPIResponse<getRemarkListRes[]>> {
        return await useCallApi().apiRepository<getRemarkListRes[]>(`${this.RESOURCE}/remark/list`, req)
      }
      
      async cancelOrderByAdmin(req:cancelOrderReq): Promise<IAPIResponse<cancelOrderRes>> {
        return await useCallApi().apiRepository<cancelOrderRes>(`${this.RESOURCE}/order/by-admin/cancel`, req)
      }
  }
  
  export default BackendPaperModule;