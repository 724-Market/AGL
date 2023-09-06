import { PlaceOrderRequest, PlaceOrderResponse } from "../entities/placeorder-entity";
import {
  OrderDetailRequest,
  OrderDetailResponse,
  OrderResponse,
  Order,
  StatusGroupResponse,
  SubHistoryRequest,
  HistoryResponse,
  StatusGroupRequest
} from "../entities/order-entity";
import { Filter, TableRequest } from "../entities/table-option";
import { IAPIResponse, IDataTableResponse } from "../entities/useApi-response";

class OrderModule {
  private RESOURCE = '/OrderCMI';
  private RESOURCE_Order = '/Order';

  async get(req: OrderDetailRequest): Promise<IAPIResponse<Order>> {
    return await useCallApi().apiRepository<Order>(`${this.RESOURCE}/get`, req)
  }
  async summary(req: OrderDetailRequest): Promise<IAPIResponse<OrderResponse[]>> {
    return await useCallApi().apiRepository<OrderResponse[]>(`${this.RESOURCE}/summary/get`, req)
  }
  async details(req: OrderDetailRequest): Promise<IAPIResponse<OrderDetailResponse[]>> {
    return await useCallApi().apiRepository<OrderDetailResponse[]>(`${this.RESOURCE}/details/get`, req)
  }
  async create(req: PlaceOrderRequest): Promise<IAPIResponse<PlaceOrderResponse>> {
    return await useCallApi().apiRepository<PlaceOrderResponse>(`${this.RESOURCE}/create`, req)
  }
  async save(req: PlaceOrderRequest): Promise<IAPIResponse<PlaceOrderResponse>> {
    return await useCallApi().apiRepository<PlaceOrderResponse>(`${this.RESOURCE}/save`, req)
  }
  async delete(req: OrderDetailRequest): Promise<IAPIResponse<OrderDetailResponse[]>> {
    return await useCallApi().apiRepository<OrderDetailResponse[]>(`${this.RESOURCE}/delete`, req)
  }

  async statusGroup(filter?: Filter[]): Promise<IAPIResponse<StatusGroupResponse>> {
    const req: StatusGroupRequest = {
      filter: filter
    }
    return await useCallApi().apiRepository<StatusGroupResponse>(`${this.RESOURCE_Order}/status/group/get`, req)
  }
  async getHistoryList(req: TableRequest): Promise<IDataTableResponse<HistoryResponse>> {
    return await useCallApi().postDataTable<HistoryResponse>(`${this.RESOURCE_Order}/grid/history/list`, req)
  }
  async getSubHistoryList(req: SubHistoryRequest): Promise<IAPIResponse<HistoryResponse>> {
    return await useCallApi().apiRepository<HistoryResponse>(`${this.RESOURCE_Order}/history/sub/order/list`, req)
  }
}

export default OrderModule;