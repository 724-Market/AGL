import type { Filter } from "./table-option"
export interface AreaListRes {
  ID: string
  Name: string
}

export interface BalanceRes {
  CreditAvailable: number
  PaperOnHandAvailable: number
  PaperPending: number
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
  ProductOnHandAmountTotal: number;
  CompanyName: string;
  FriendlyName: string;
  Amount: number | undefined;

}

export interface PaymentFeeLimitReq {
  DeliveryType: string
}
export interface PaymentFeeLimitRes {
  Amount: number
  Max: number
  Min: number
}

export interface SubOrderListReq {
  OrderNo: string
}
export interface SubOrderListRes {
  ID: string;
  OwnerID: string | null;
  PaperOrderID: string;
  PaperOrderNo: string;
  CreditID: string;
  UseType: string;
  Channel: string;
  Amount: number;
  Quantity: number;
  GrandAmount: number;
  Remark: string | null;
  IsHold: boolean;
  IsCancel: boolean;
  IsReject: boolean;
  RejectUser: string | null;
  RejectDate: string | null;
  CancelUser: string | null;
  CancelDate: string | null;
  CreateUser: string;
  CreateDate: string;
  UpdateUser: string | null;
  UpdateDate: string | null;
  ProductID: string;
  Category: string;
  SubCategory: string;
  Company: string;
  Brand: string;
  Model: string;
  Name: string;
  SerialNo: string;
  ProductType: string;
  ProductPrice: number;
}

export interface OrderListReq {
  OrderNo: string
}
export interface OrderListRes {
  ID: string;
  OrderNo: string;
  OwnerID: string;
  WarehouseID: string;
  DeliveryFee: number;
  TotalPrice: number;
  GrandPrice: number;
  DeliveryType: string;
  Status: string;
  RemarkSystem: string | null;
  Remark: string | null;
  IsConsent: boolean;
  IsReceive: boolean;
  IsDelivery: boolean;
  IsApprove: boolean;
  IsCancel: boolean;
  IsUserCancel: boolean;
  IsDelete: boolean;
  ReceiveDate: string | null;
  ReceiveUser: string | null;
  DeliveryDate: string | null;
  DeliveryUser: string | null;
  UnApproveDate: string;
  UnApproveUser: string;
  ApproveDate: string;
  ApproveUser: string;
  CancelDate: string | null;
  CancelUser: string | null;
  CreateUser: string;
  CreateDate: string;
  UpdateDate: string | null;
  UpdateUser: string | null;
  OrderStatus: string;
  AgentCode: string;
  PaperQuantity: number;
  BranchName: string;
  BranchType: string;
  DeliveryChannelType: string;
}

export interface OrderExchangeCreateReq {
  IsConsent: boolean
  DeliveryMethod: DeliveryMethodReq
  ExchangeData: ExchangeDataReq[]
  DeliveryAddress?: DeliveryAddressReq | null
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
  MatchItem: SearchMatchRes
  Item: ExchangeDataReq
}
export interface CalculateGrandTotal {
  ShippingMethod: string
  ShippingFee: number
  OrderAmount: number
  PaymentFeeLimit: number
  Discount: number
  GrandAmount: number
  TotalQty: number
  AvailableBalanceCredit: number
}

export interface StatusGroupRequest {
  Filter?: Filter[]
}
export interface StatusGroupResponse {
  Prepare: number
  Delivery: number
  Success: number
  Cancel: number
}

export interface PaperHistoryResponse {
  Ind?: number;
  ID: string;
  AgentCode: string;
  ApproveDate: string;
  ApproveUser: string;
  BranchName: string;
  BranchType: string;
  CancelDate: string | null;
  CancelUser: string | null;
  CreateDate: string;
  CreateUser: string;
  DeliveryChannelType: string;
  DeliveryDate: string;
  DeliveryFee: number;
  DeliveryType: string;
  DeliveryUser: string;
  GrandPrice: number;
  IsApprove: boolean;
  IsCancel: boolean;
  IsConsent: boolean;
  IsDelete: boolean;
  IsDelivery: boolean;
  IsReceive: boolean;
  OrderNo: string;
  OrderStatus: string;
  OwnerID: string;
  PaperQuantity: number;
  ReceiveDate: string | null;
  ReceiveUser: string | null;
  Remark: string | null;
  RemarkSystem: string | null;
  Status: string;
  TotalPrice: number;
  UnApproveDate: string | null;
  UnApproveUser: string | null;
  UpdateDate: string | null;
  UpdateUser: string | null;
}

export interface OrderListReq {
  OrderNo: string
}
export interface OrderListRes {
  ID: string;
  OrderNo: string;
  OwnerID: string;
  WarehouseID: string;
  DeliveryFee: number;
  TotalPrice: number;
  GrandPrice: number;
  DeliveryType: string;
  Status: string;
  RemarkSystem: string | null;
  Remark: string | null;
  IsConsent: boolean;
  IsReceive: boolean;
  IsDelivery: boolean;
  IsApprove: boolean;
  IsCancel: boolean;
  IsUserCancel: boolean;
  IsDelete: boolean;
  ReceiveDate: string | null;
  ReceiveUser: string | null;
  DeliveryDate: string | null;
  DeliveryUser: string | null;
  UnApproveDate: string;
  UnApproveUser: string;
  ApproveDate: string;
  ApproveUser: string;
  CancelDate: string | null;
  CancelUser: string | null;
  CreateUser: string;
  CreateDate: string;
  UpdateDate: string | null;
  UpdateUser: string | null;
  OrderStatus: string;
  AgentCode: string;
  PaperQuantity: number;
  BranchName: string;
  BranchType: string;
  DeliveryChannelType: string;
}

export interface SubOrderListReq {
  OrderNo: string
}
export interface SubOrderListRes {
  ID: string;
  OwnerID: string | null;
  PaperOrderID: string;
  PaperOrderNo: string;
  CreditID: string;
  UseType: string;
  Channel: string;
  Amount: number;
  Quantity: number;
  GrandAmount: number;
  Remark: string | null;
  IsHold: boolean;
  IsCancel: boolean;
  IsReject: boolean;
  RejectUser: string | null;
  RejectDate: string | null;
  CancelUser: string | null;
  CancelDate: string | null;
  CreateUser: string;
  CreateDate: string;
  UpdateUser: string | null;
  UpdateDate: string | null;
  ProductID: string;
  Category: string;
  SubCategory: string;
  Company: string;
  Brand: string;
  Model: string;
  Name: string;
  SerialNo: string;
  ProductType: string;
  ProductPrice: number;
}

export interface RemarkListReq {
  Type: string;
}
export interface RemarkListRes {
  ID: string;
  Code: string;
  Type: string;
  Message: string;
  IsActive: boolean;
}

export interface cancelOrderReq {
  OrderNo: string;
  RemarkSystem: string;
  Remark?: string;
}

export interface cancelOrderRes {
  Status: string;
}