import { PlaceOrderRequest, PlaceOrderResponse } from "../entities/placeorder-entity";
import { OrderDetailRequest,OrderDetailResponse, OrderResponse,Order } from "../entities/order-entity";
import { IAPIResponse } from "../entities/useApi-response";

class OrderModule {
  private RESOURCE = '/OrderCMI';

  async get(req:OrderDetailRequest): Promise<IAPIResponse<Order>> {
    return await useCallApi().apiRepository<Order>(`${this.RESOURCE}/get`, req)
  }
  async summary(req:OrderDetailRequest): Promise<IAPIResponse<OrderResponse>> {
    return await useCallApi().apiRepository<OrderResponse>(`${this.RESOURCE}/summary/get`, req)
  }
  async details(req:OrderDetailRequest): Promise<IAPIResponse<OrderDetailResponse[]>> {
    return await useCallApi().apiRepository<OrderDetailResponse[]>(`${this.RESOURCE}/details/get`, req)
  }
  async create(req:PlaceOrderRequest): Promise<IAPIResponse<PlaceOrderResponse>> {
    return await useCallApi().apiRepository<PlaceOrderResponse>(`${this.RESOURCE}/create`, req)
  }
  async save(req:PlaceOrderRequest): Promise<IAPIResponse<PlaceOrderResponse>> {
    return await useCallApi().apiRepository<PlaceOrderResponse>(`${this.RESOURCE}/save`, req)
  }
}

export default OrderModule;