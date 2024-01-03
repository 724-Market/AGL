import type { 
  AgentInfo,
  AgentAddressListRes,
  AgentAddressCreateReq,
  AgentAddressCreateRes,
  AgentAddressSaveReq,
  AgentAddressSaveRes,
  AgentAddressDeleteReq,
  AgentAddressDeleteRes
 } from "../entities/agent-entity";
import type { IAPIResponse } from "../entities/useApi-response";

class AgentModule {
  private RESOURCE = '/Agent';

  async GetLicense(): Promise<IAPIResponse<AgentInfo[]>> {
    return await useCallApi().apiRepository<AgentInfo[]>(`${this.RESOURCE}/profile/license/get`, {})
  }

  async GetAddressList(): Promise<IAPIResponse<AgentAddressListRes[]>> {
    return await useCallApi().apiRepository<AgentAddressListRes[]>(`${this.RESOURCE}/address/list`, {})
  }

  async CreateAddress(req: AgentAddressCreateReq): Promise<IAPIResponse<AgentAddressCreateRes>> {
    return await useCallApi().apiRepository<AgentAddressCreateRes>(`${this.RESOURCE}/address/create`, req)
  }

  async AddressSave(req: AgentAddressSaveReq): Promise<IAPIResponse<AgentAddressSaveRes>> {
    return await useCallApi().apiRepository<AgentAddressSaveRes>(`${this.RESOURCE}/address/save`, req)
  }

  async AddressDelete(req: AgentAddressDeleteReq): Promise<IAPIResponse<AgentAddressDeleteRes>> {
    return await useCallApi().apiRepository<AgentAddressDeleteRes>(`${this.RESOURCE}/address/delete`, req)
  }
  
}

export default AgentModule;