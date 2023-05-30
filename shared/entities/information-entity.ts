export interface IInformation {
    CarUse: string
    CarType: string
    CarSize: string
    CarYear: string
    CarBrand: string
    CarModel: string
    SubCarModel: string
    customSubCarModel: string
    CarCC: string
    EffectiveType: string
    EffectiveDate: string
    ExpireDate: string
    CarDetail: string
}

export interface IUseCarResponse {
    UseCarCode: string
    UseCarName: string
}

export interface ICarTypeRequest {
    UseCarCode: string
    UseCarName: string
}
export interface ICarTypeResponse {
    Code: string
    Name: string
}

export interface ICarCategoryRequest {
    UseCarCode: string
    UseCarName: string
}
export interface ICarCategoryResponse {
    ID: string
    Name: string
    CarSize: string
}

export interface ICarBrandRequest {
    CarTypeCode: string
    CarCategoryID: string
    CarSalesYear: string
}
export interface ICarBrandResponse {
    ID: string
    Name: string
}

export interface ICarModelRequest {
    CarBrandID: string
    CarCategoryID: string
    CarSalesYear: string
}
export interface ICarModelResponse {
    ID: string
    CarCategoryName: string
    Name: string
}

export interface ISubCarModelRequest {
    CarBrandID: string
    CarModelID: string
    CarSalesYear: string
}
export interface ISubCarModelResponse {
    ID: string
    Name: string
    CarCC: string
}