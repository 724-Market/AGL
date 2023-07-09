import { OrderRequest, OrderResponse } from "../entities/placeorder-entity";
import { IAPIResponse } from "../entities/useApi-response";

class OrderModule {
  private RESOURCE = '/OrderCMI';

  async summary(req:OrderResponse): Promise<IAPIResponse<OrderRequest>> {
    return await useCallApi().apiRepository<OrderRequest>(`${this.RESOURCE}/summary/get`, req)
  }
  async create(req:OrderRequest): Promise<IAPIResponse<OrderResponse>> {
    return await useCallApi().apiRepository<OrderResponse>(`${this.RESOURCE}/create`, req)
  }
  
}

export default OrderModule;