export interface AreaListResponse {
    ID: string;
    Name: string;
}

export interface WarehouseAreaListReq {
    AreaID: string;
    Type: string;
}
export interface WarehouseAreaListRes {
    ID: string;
    Name: string;
    AreaID: string;
    AreaName: string;
    Type: string;
}

export interface ProductsubcategoryAreaListReq {
    AreaID: string;
    WarehouseID: string;
}
export interface ProductsubcategoryAreaListRes {
    AreaID: string;
    WarehouseID: string;
    ProductCategory: string;
    ProductSubCategory: string;
  }