import { IAPIResponse } from "../entities/useApi-response";
import { Paper, PaperRequest } from "../entities/packageList-entity";
import { CreditBalanceRequest, CreditBalanceResponse } from "../entities/pledge-entity";

class PledgeModule {
  private RESOURCE = '/Pledge';

  async paperonhand(req:PaperRequest): Promise<IAPIResponse<Paper[]>> {
    return await useCallApi().apiRepository<Paper[]>(`${this.RESOURCE}/paperonhand/balance/get`, req)
  }
  async creditBalance(): Promise<IAPIResponse<CreditBalanceResponse[]>> {
    return await useCallApi().apiRepository<CreditBalanceResponse[]>(`${this.RESOURCE}/credit/balance/get`, {})
  }
}

export default PledgeModule;