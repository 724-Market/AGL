export interface PrefixReq {
    IsPerson: boolean
}
export interface DistrictReq {
    ProvinceID: string
}
export interface SubDistrictReq {
    DistrictID: string
}
export interface MasterResponse {
    ID: string
    Name:string
    ZipCode?:string
}
export interface INationalityResponse {
    ID: string
    Code:string
    Name: string
    NameEn: string
}
export interface ICarColorResponse {
    CarColorID: string
    Name: string
    NameEn: string
}
export interface ICarColorReq {
    CompanyCode: string
  
}
