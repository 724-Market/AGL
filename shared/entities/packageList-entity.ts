export interface IPackageRequest {
    UseCarCode: string
    CarTypeCode: string
    CarCategoryID: string
    CarSalesYear: string
    CarBrandID: string
    CarModelID: string
    SubCarModelID: string
    AgentCode: string
    EffectiveType: string
    EffectiveDate: string
    ExpireDate: string
}

export interface IPackageResponse {
    RefCompanyID: string
    CompanyCode: string
    CompanyName: string
    CarTypeName: string
    DayPolicy: number
    DayWholeYear: number
    Rate: number
    Cost: number
    Vat: number
    Duty: number
    IsOnlineActive: boolean
    CountOfPolicy: number
    Price: number
    PackageResult: PackageResult[]
}

export interface PackageResult {
    EffectiveDate: string
    ExpireDate: string
    UseCarName: string
    CarModelID: number
    RefCarBrandID: string
    CarBrandName: string
    CarBrand: string
    CarModelName: string
    CarSalesYear: number
    SubCarModelName: string
    CarCC: string
    CarSeat: number
    CarWeigth: number
    OnlineCarTypeID: string
    OnlineCarTypeName: string
    PriceACT: number
    PriceACTDiscount: number
    NetACT: number
    CostACT: number
    VatACT: number
    DutyACT: number
    CompanyID: number
    CompanyName: string
    CompanyID_SK: string
    CompanyImage: string
    CarID: number
    CarBrandSK: string
    ComissionAgent: number
    AgentComDiscount: number
    ComOnlineDiscount: number
}
