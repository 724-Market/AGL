export interface CreditBalanceRequest {
    OrderNo: string
}

export interface CreditBalanceResponse {
    OwnerID: string
    UserID: string
    MaxPeriodAmount: number
    PeriodDay: number
    CreditUseCheckPoint: string
    AvailableBalance: number
    HoldAdd: number
    HoldUse: number
    TotalBalance: number
    TotalUseSummary: number
    TotalAddSummary: number
    PeriodUsed: number
    AvailablePeriodAmount: number
    AvailablePeriodBalance: number
}

export interface CreditHistoryPaymentAdd {
    Min: number,
    Max: number,
    List: number[]
}
export interface CreditOrderPaymentCreateRequest {
    PaymentType: string,
    Amount: number,
    IsConsent: boolean
}
export interface CreditOrderPaymentCreateResponse {
    CreateDate: string,
    CreditOrderNo: string,
    CreditPaymentNo: string
    FeeAmount: number
    GrandAmount: number
    OrderAmount: number
}
export interface CreditOrderPaymentGetRequest {
    PaymentNo: string
}

export interface PaymentFeeLimitResponse {
    Type: string,
    Amount: number,
    Max: number,
    Min: number
}
export interface PaymentFeeLimitRequest {
    PaymentType: string,
}

export interface PledgePaperOnhandBalanceReq {
    ProductID?: string
}
export interface PledgePaperOnhandBalanceRes {
    Quantity: number
    OwnerID: string
    ProductID: string
    Brand: string
    Category: string
    SubCategory: string
    Company: string
    Type: string
    Model: string
    Name: string
    Price: number
}