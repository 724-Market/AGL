import { IAPIResponse } from "../entities/useApi-response";
import { Paper, PaperRequest } from "../entities/packageList-entity";

class PledgeModule {
  private RESOURCE = '/Pledge';

  async paperonhand(req:PaperRequest): Promise<IAPIResponse<Paper[]>> {
    return await useCallApi().apiRepository<Paper[]>(`${this.RESOURCE}/paperonhand/balance/get`, req)
  }
}

export default PledgeModule;