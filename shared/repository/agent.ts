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

  async checkAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/user/check`, req)
  }

  async checkAgentReferral(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/referral/check`, req)
  }

  async registerAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/register`, req)
  }

  async verifyOtpRegisterAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/register/otp/verify`, req)
  }

  async setupFirstPasswordAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/password/first/setup`, req)
  }

  async requestRecoveryPasswordAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/password/recovery/otp/request`, req)
  }

  async verifyOtpRecoveryPasswordAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/password/recovery/otp/verify`, req)
  }

  async setupRecoveryPasswordAgent(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/password/recovery/setup`, req)
  }

  async getAgentProfile() {
    return await useCallApi().apiRepository(`${this.RESOURCE}/profile/get`, {})
  }

  async getPlanProduct() {
    return await useCallApi().apiRepository(`${this.RESOURCE}/product/plan/get`, {})
  }

}

export default AgentModule;