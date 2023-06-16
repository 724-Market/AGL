import { DistrictReq, ICarColorReq, ICarColorResponse, INationalityResponse, MasterResponse, PrefixReq, SubDistrictReq } from "../entities/master-entity";
import { IAPIResponse } from "../entities/useApi-response";

class MasterModule {
  private RESOURCE = '/Master';

  async prefix(req: PrefixReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/prefix/list`, req)
  }
  async province(): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/province/list`, {})
  }
  async district(req:DistrictReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/district/list`, req)
  }
  async subDistrict(req:SubDistrictReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/subdistrict/list`, req)
  }
  async carColor(req:ICarColorReq): Promise<IAPIResponse<ICarColorResponse[]>> {
    return await useCallApi().apiRepository<ICarColorResponse[]>(`${this.RESOURCE}/carcolor/list`, req)
  }
  async nationality(): Promise<IAPIResponse<INationalityResponse[]>> {
    return await useCallApi().apiRepository<INationalityResponse[]>(`${this.RESOURCE}/nationality/list`, {})
  }
}

export default MasterModule;