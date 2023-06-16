import { IDeliveryResponse } from "../entities/delivery-entity";
import { IAPIResponse } from "../entities/useApi-response";

class DeliveryModule {
  private RESOURCE = '/Delivery';

  async channel(): Promise<IAPIResponse<IDeliveryResponse[]>> {
    return await useCallApi().apiRepository<IDeliveryResponse[]>(`${this.RESOURCE}/channel/list`, {})
  }
  
}

export default DeliveryModule;