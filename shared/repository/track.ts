import type { 
    TrackOrderReq, 
    TrackOrderRes 
} from "../entities/track-entity";
import type { IAPIResponse } from "../entities/useApi-response";

class TrackModule {
    private RESOURCE = '/track';
    
    async getOrderPaper(req: TrackOrderReq): Promise<IAPIResponse<TrackOrderRes[]>> {
      return await useCallApi().apiRepository<TrackOrderRes[]>(`${this.RESOURCE}/order/paper/get`, req)
    }
}

export default TrackModule;