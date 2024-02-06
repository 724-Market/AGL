import type { ICarBrandResponse, ICarCategoryResponse, ICarModelResponse, ICarTypeResponse, ISubCarModelResponse, IUseCarResponse } from "../entities/information-entity";
import type { DistrictReq, ICarColorReq, ICarColorResponse, INationalityResponse, MasterResponse, PrefixReq, SubDistrictReq } from "../entities/master-entity";
import type { IAPIResponse } from "../entities/useApi-response";

class MasterModule {
  private RESOURCE = '/Master';

  async prefix(req: PrefixReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/prefix/list`, req)
  }
  async province(): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/province/list`, {})
  }
  async district(req: DistrictReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/district/list`, req)
  }
  async subDistrict(req: SubDistrictReq): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/subdistrict/list`, req)
  }
  async carColor(req: ICarColorReq): Promise<IAPIResponse<ICarColorResponse[]>> {
    return await useCallApi().apiRepository<ICarColorResponse[]>(`${this.RESOURCE}/carcolor/list`, req)
  }
  async nationality(): Promise<IAPIResponse<INationalityResponse[]>> {
    return await useCallApi().apiRepository<INationalityResponse[]>(`${this.RESOURCE}/nationality/list`, {})
  }

  async usecar(): Promise<IAPIResponse<IUseCarResponse[]>> {
    return await useCallApi().apiRepository<IUseCarResponse[]>(`${this.RESOURCE}/usecar/list`, {})
  }
  async cartype(req: unknown): Promise<IAPIResponse<ICarTypeResponse[]>> {
    return await useCallApi().apiRepository<ICarTypeResponse[]>(`${this.RESOURCE}/cartype/list`, req)
  }
  async carcategory(req: unknown): Promise<IAPIResponse<ICarCategoryResponse[]>> {
    console.log('carcategory', req)
    return await useCallApi().apiRepository<ICarCategoryResponse[]>(`${this.RESOURCE}/carcategory/list`, req)
  }
  async carbrand(req: unknown): Promise<IAPIResponse<ICarBrandResponse[]>> {
    return await useCallApi().apiRepository<ICarBrandResponse[]>(`${this.RESOURCE}/carbrand/list`, req)
  }
  async carmodel(req: unknown): Promise<IAPIResponse<ICarModelResponse[]>> {
    return await useCallApi().apiRepository<ICarModelResponse[]>(`${this.RESOURCE}/carmodel/list`, req)
  }
  async subcarmodel(req: unknown): Promise<IAPIResponse<ISubCarModelResponse[]>> {
    return await useCallApi().apiRepository<ISubCarModelResponse[]>(`${this.RESOURCE}/subcarmodel/list`, req)
  }
  async modalProvince(): Promise<IAPIResponse<MasterResponse[]>> {
    return await useCallApi().apiRepository<MasterResponse[]>(`${this.RESOURCE}/province/list`, {})
  }
}

export default MasterModule;