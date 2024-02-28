export interface CalculateRequest {
    OrderNo: string
}
export interface CalculateResponse {
    Total: number
    DebitCredit: DebitCredit
    BillPayment: BillPayment
    Pledge: Pledge
    DeliveryFee?: DeliveryFee[]
}
export interface DebitCredit {
    ZeroCommission?: CalculateData
    SomeCommission?: CalculateData
    FullCommission?: CalculateData
    Paper?: Paper
}
export interface BillPayment {
    ZeroCommission?: CalculateData
    SomeCommission?: CalculateData
    FullCommission?: CalculateData
    Paper?: Paper
}
export interface Pledge {
    ZeroCommission?: CalculateData
    SomeCommission?: CalculateData
    FullCommission?: CalculateData
    Paper?: Paper
}
export interface CalculateData {
    TotalDiscount: number
    Max: number
    Fee: Fee
    Paper?: Paper
}
export interface Fee {
    Type: string
    Price: number
    Amount: number
}
export interface Max {
    ZeroCommission?: number
    SomeCommission?: number
    FullCommission?: number
}
export interface Paper {
    Quantity: number
    ProductID: string
    Brand: string
    Category: string
    SubCategory: string
    Company: string
    Type: string
    Model: number
    Name: string
    Price: number
}
export interface DeliveryFee {
    Price: number
    Text: string
    DeliveryChannelType: string
}

export interface RadiioPaymentObject {
    FeeQr: number
    FeeCard: number
    PercenCard: number
    RemainPledge?: number
}

export interface SummaryDiscountObject {
    PackagePrice: number
    ShipopingCost: number
    FeeCost: number
    TotalPrice: number
    DisPrice: number
    SumPrice: number
    PaymentMethod: string
    DiscountMethod: string
}

export interface PaymentSaveRequest {
    OrderNo: string
    PaymentType: string
    DiscountType: string
    DiscountValue: number
    CouponCode: string
    NumCredit: number
    IsUseCredit: boolean
}
export interface PaymentSaveResponse {
    OrderNo: string
    PaymentType: string
    DiscountType: string
    DeliveryAmount: number
    FeeAmount: number
    PaperAmount: number
    CreditAmount: number
    OrderAmount: number
    GrandAmount: number
    CashBack: number
    CreateDate: string
    CreateUser: string
    UpdateDate: string
    UpdateUser: string
}

export interface PaymentConfirmRequest{
    OrderNo:string
    IsConsent:string
}

export interface PaymentConfirmResponse{
    PaymentType:string
    PaymentStatus:string
    GrandAmount:number
    PaymentNo:string
    OrderNo:string
}

export interface PaymentGetRequest{
    PaymentNo:string
}

export interface PaymentGetResponse{
    ID:string
    OwnerID:string
    UserID:string
    PaymentNo:string
    PaymentType:string
    DiscountType:string
    CouponCode:string
    NumCredit:number 
    Status:string
    LogMessage:string
    TransferFileID:string
    TransferBankCode:string
    TransferDate:string
    DeliveryAmount:number 
    FeeAmount:number 
    DiscountAmount:number 
    PaperAmount:number 
    CreditAmount:number 
    OrderAmount:number 
    GrandAmount:number 
    IsTransfer:boolean
    IsConsent:boolean
    IsCallback:boolean
    IsSuccess:boolean
    IsCancel:boolean
    IsPending:boolean
    IsDelete:boolean
    PaymentDate:string
    PaymentUser:string
    CancelDate:string
    CancelUser:string
    CreateDate:string
    CreateUser:string
    UpdateDate:string
    UpdateUser:string
}

export interface PaymentGatewayRequest{
    URL:string
    payment_type:string
    endpoint_code:string
    orderid:string
    refno:string
    expire_type?:string
    expire_value?:string
    amount:number
    response_url?:string
}

export interface PaymentGatewayResponse{
    orderid:string
    refno1:string
    refno2:string
    amount:string
    payment_id:string
    payment_type:string
    endpoint_code:string
    payment_channel:string
    payment_expired:string
    payment_status:string
    payment_code:string
    payment_date:string
    pgc_url:string
    payment_url:string
    payment_qr:string
    response_url:string
}

export interface NoticePaymentRequest{
    ClientID:string
    DeviceID:string
    ReferenceID:string
    UserID:string
    GroupType:string
    AccessToken:string
}

export interface NoticePayment{
    message:string
    data:NoticePaymentData
}

export interface NoticePaymentData {
    PaymentNo:string
    PaymentType:string
    Status:string
    Message:string
    PaymentDate:string
    CancelDate:string
}