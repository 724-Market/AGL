export interface CalculateRequest {
    OrderNo: string
}

export interface CalculateResponse {
    Total: number
    DebitCredit: DebitCredit
    BillPayment: BillPayment
    Pledge: Pledge
    DeliveryFee: DeliveryFee[]
}
export interface DebitCredit {
    TotalDiscount: TotalDiscount
    Max: Max
    Fee: Fee
    Paper: Paper
}
export interface BillPayment {
    TotalDiscount: TotalDiscount
    Max: Max
    Fee: Fee
    Paper: Paper
}
export interface Pledge {
    TotalDiscount: TotalDiscount
    Max: Max
    Fee: Fee
    Paper: Paper
}
export interface TotalDiscount {
    ZeroCommission: number
    SomeCommission: number
    FullCommission: number
}
export interface Max {
    ZeroCommission: number
    SomeCommission: number
    FullCommission: number
}
export interface Fee {
    Type: string
    Price: number
    ZeroCommission: number
    SomeCommission: number
    FullCommission: number
}
export interface Paper {
    Quantity: number
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
export interface DeliveryFee {
    Price: number
    Text: string
    DeliveryChannelType: string
}

export interface PaymentSaveRequest {
    OrderNo: string,
}
export interface PaymentSaveResponse {
    OrderNo: string,
}