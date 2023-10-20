import { AreaListResponse } from './../entities/paper-entity';
import { IAPIResponse } from "../entities/useApi-response";

class PaperModule {
    private RESOURCE = '/Paper';

    async getarea(): Promise<IAPIResponse<AreaListResponse[]>> {
    return await useCallApi().apiRepository<AreaListResponse[]>(`${this.RESOURCE}/area/list`, {})
  }
}

export default PaperModule;