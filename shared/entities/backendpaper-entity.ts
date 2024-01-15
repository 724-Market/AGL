import type { Filter } from "./table-option"

  export interface OrderNoReq {
    OrderNo: string
  }
  export interface getOrderDetailRes {
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
  export interface getSubOrderListRes {
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

  export interface getStatusGroupReq {
    Filter?:Filter[]
  }
  export interface getStatusGroupRes {
    Receive: number
    Prepare: number
    Delivery: number
    Success: number
    Cancel: number
  }

  export interface cancelOrderReq {
    OrderNo: string;
    RemarkSystem: string;
    Remark: string;
  }

  export interface cancelOrderRes {
    Status: string;
  }

  export interface getRemarkListReq {
    Type: string;
  }
  export interface getRemarkListRes {
    ID: string;
    Code: string;
    Type: string;
    Message: string;
    IsActive: boolean;
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

  export interface RemarkListReq {
    Type: string;
  }
  export interface getRemarkListRes {
    ID: string;
    Code: string;
    Type: string;
    Message: string;
    IsActive: boolean;
  }