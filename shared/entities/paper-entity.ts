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

  export interface ProductcompanyAreaListReq {
      AreaID: string;
      WarehouseID: string;
      ProductCategory: string;
      ProductSubCategory: string;
  }
  export interface ProductcompanyAreaListRes {
    AreaID: string;
    WarehouseID: string;
    ProductCompany: string;
    ProductSubCategory: string;
    ProductCategory: string;
    CompanyName: string;
    FriendlyName: string;
  }

  export interface SearchMatchReq {
      AreaID: string;
      WarehouseID: string;
      ProductCategory: string;
      ProductSubCategory: string;
      ProductCompany: string;
      ProductBrand: string;
      ProductModel: string;
      ProductName: string;
      ProductPrice: string;
  }
  export interface SearchMatchRes {
    WarehouseID: string;
    AreaID: string;
    ProductID: string;
    Name: string;
    AreaName: string;
    ProductCategory: string;
    ProductSubCategory: string;
    ProductCompany: string;
    ProductBrand: string;
    ProductModel: string;
    ProductName: string;
    ProductPrice: number;
    ProductOnHandAmount: number;
    CompanyName: string;
    FriendlyName: string;
  }