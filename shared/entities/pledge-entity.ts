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