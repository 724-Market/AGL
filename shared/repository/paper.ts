import { 
  AreaListResponse,
  WarehouseAreaListReq,
  WarehouseAreaListRes,
  ProductsubcategoryAreaListReq,
  ProductsubcategoryAreaListRes,
  ProductcompanyAreaListReq,
  ProductcompanyAreaListRes
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

    async getProductsubcategoryWarehouse(req: ProductsubcategoryAreaListReq): Promise<IAPIResponse<ProductsubcategoryAreaListRes[]>> {
      return await useCallApi().apiRepository<ProductsubcategoryAreaListRes[]>(`${this.RESOURCE}/productsubcategory/by-area-warehouse/list`, req)
    }

    async getProductcompanySubcategory(req: ProductcompanyAreaListReq): Promise<IAPIResponse<ProductcompanyAreaListRes[]>> {
      return await useCallApi().apiRepository<ProductcompanyAreaListRes[]>(`${this.RESOURCE}/productcompany/by-area-warehouse-subcategory/list`, req)
    }
}

export default PaperModule;