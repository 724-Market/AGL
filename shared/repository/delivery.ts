import { 
  IDeliveryResponse,
  DeliveryPaperRes
 } from "../entities/delivery-entity";
import { IAPIResponse } from "../entities/useApi-response";

class DeliveryModule {
  private RESOURCE = '/Delivery';

  async channel(): Promise<IAPIResponse<IDeliveryResponse[]>> {
    return await useCallApi().apiRepository<IDeliveryResponse[]>(`${this.RESOURCE}/channel/list`, {})
  }

  async DeliveryPaperChannel(): Promise<IAPIResponse<DeliveryPaperRes[]>> {
    return await useCallApi().apiRepository<DeliveryPaperRes[]>(`${this.RESOURCE}/type/product/paper/list`, {})
  }
  
}

export default DeliveryModule;