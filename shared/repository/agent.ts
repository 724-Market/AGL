import { AgentInfo } from "../entities/agent-entity";
import { IAPIResponse } from "../entities/useApi-response";

class AgentModule {
  private RESOURCE = '/Agent';

  async GetLicense(): Promise<IAPIResponse<AgentInfo[]>> {
    return await useCallApi().apiRepository<AgentInfo[]>(`${this.RESOURCE}/profile/license/get`, {})
  }
  
}

export default AgentModule;