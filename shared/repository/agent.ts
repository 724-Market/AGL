import { 
  AgentInfo,
  AgentAddressListRes,
  AgentAddressCreateReq,
  AgentAddressCreateRes
 } from "../entities/agent-entity";
import { IAPIResponse } from "../entities/useApi-response";

class AgentModule {
  private RESOURCE = '/Agent';

  async GetLicense(): Promise<IAPIResponse<AgentInfo[]>> {
    return await useCallApi().apiRepository<AgentInfo[]>(`${this.RESOURCE}/profile/license/get`, {})
  }

  async GetAddressList(): Promise<IAPIResponse<AgentAddressListRes[]>> {
    return await useCallApi().apiRepository<AgentAddressListRes[]>(`${this.RESOURCE}/address/list`, {})
  }

  async CreateAddress(req: AgentAddressCreateReq): Promise<IAPIResponse<AgentAddressCreateRes[]>> {
    return await useCallApi().apiRepository<AgentAddressCreateRes[]>(`${this.RESOURCE}/address/create`, req)
  }
  
}

export default AgentModule;