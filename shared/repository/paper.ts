import { 
  AreaListResponse,
  WarehouseAreaListReq,
  WarehouseAreaListRes
 } from './../entities/paper-entity';
import { IAPIResponse } from "../entities/useApi-response";

class PaperModule {
    private RESOURCE = '/Paper';

    async getarea(): Promise<IAPIResponse<AreaListResponse[]>> {
      return await useCallApi().apiRepository<AreaListResponse[]>(`${this.RESOURCE}/area/list`, {})
    }

    async getWarehouseArea(req: WarehouseAreaListReq): Promise<IAPIResponse<WarehouseAreaListRes[]>> {
      return await useCallApi().apiRepository<WarehouseAreaListRes[]>(`${this.RESOURCE}/warehouse/by-area/list`, req)
    }
}

export default PaperModule;