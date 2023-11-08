export interface AreaListRes {
    ID: string
    Name: string
}

export interface WarehouseAreaListReq {
    AreaID?: string
    Type?: string
}
export interface WarehouseAreaListRes {
    ID: string
    Name: string
    AreaID: string
    AreaName: string
    Type: string
}

export interface ProductsubcategoryAreaListReq {
    AreaID: string
    WarehouseID: string
}
export interface ProductsubcategoryAreaListRes {
    AreaID: string
    WarehouseID: string
    ProductCategory: string
    ProductSubCategory: string
  }

  export interface ProductcompanyAreaListReq {
      AreaID: string
      WarehouseID: string
      ProductCategory: string
      ProductSubCategory: string
  }
  export interface ProductcompanyAreaListRes {
    AreaID: string
    WarehouseID: string
    ProductCompany: string
    ProductSubCategory: string
    ProductCategory: string
    CompanyName: string
    FriendlyName: string
  }

  export interface SearchMatchReq {
    AreaID?: string
    WarehouseID?: string
    ProductCategory?: string
    ProductSubCategory?: string
    ProductCompany?: string
    ProductBrand?: string
    ProductModel?: string
    ProductName?: string
    ProductPrice?: string
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
    ProductCompanyImage: string;
    ProductImage: string | null;
    ProductBrand: string;
    ProductModel: string;
    ProductName: string;
    ProductPrice: number;
    ProductOnHandAmount: number;
    CompanyName: string;
    FriendlyName: string;
    Amount:number | undefined;
  }

  export interface PaymentFeeLimitReq {
    DeliveryType: string
  }
  export interface PaymentFeeLimitRes {
    Amount: number
    Max: number
    Min: number
  }

  export interface OrderExchangeCreateReq {
    IsConsent: boolean
    DeliveryMethod: DeliveryMethodReq
    ExchangeData: ExchangeDataReq[]
    DeliveryAddress?: DeliveryAddressReq|null
  }
  export interface OrderExchangeCreateRes {
    ID: string
    OrderNo: string
    OwnerID: string
    DeliveryFee: number
    TotalPrice: number
    GrandPrice: number
    DeliveryType: string
    Status: string
    Remark: string | null
    IsConsent: boolean
    IsPending: boolean
    IsReceive: boolean
    IsDelivery: boolean
    IsApprove: boolean
    IsCancel: boolean
    IsDelete: boolean
    ReceiveDate: string | null
    ReceiveUser: string | null
    DeliveryDate: string | null
    DeliveryUser: string | null
    UnApproveDate: string | null
    UnApproveUser: string | null
    ApproveDate: string | null
    ApproveUser: string | null
    CancelDate: string | null
    CancelUser: string | null
    RequestDate: string
    RequestUser: string
    CreateDate: string
    CreateUser: string
    UpdateDate: string | null
    UpdateUser: string | null
  }

  export interface DeliveryMethodReq {
    MethodType: string
    DeliveryType: string
    DeliveryChannelType: string
  }
  export interface ExchangeDataReq {
    ProductID: string
    WarehouseID: string
    Amount: number
  }
  export interface DeliveryAddressReq {
    AddressID: string
    ReferenceID: string
    ReferenceType: string
    ProvinceID: string
    DistrictID: string
    SubDistrictID: string
    TaxID: string
    PrefixID?: string
    PrefixName?: string
    FirstName: string
    LastName: string
    PhoneNumber: string
    Email: string
    Name: string
    Type: string
    AddressLine1: string
    AddressLine2: string
    AddressText: string
    No: string
    Moo: string
    Place: string
    Building: string
    Floor: string
    Room: string
    Branch: string
    Alley: string
    Road: string,
    ZipCode?: string
  }
  export interface ExchangeDataSummary {
    MatchItem:SearchMatchRes
    Item:ExchangeDataReq
  }
  export interface CalculateGrandTotal{
    ShippingMethod:string
    ShippingFee:number
    OrderAmount:number
    PaymentFeeLimit:number
    Discount:number
    GrandAmount:number
    TotalQty:number
    AvailableBalanceCredit:number
  }