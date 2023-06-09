
export interface PlaceOrderRequest {
  OrderNo?:string
  Package?: PackageOrderRequest
  CarDetailsExtension?: CarDetailsExtension
  Customer?: CustomerOrderRequest
  // DeliveryType?: string
  // DeliveryChannelType?: string
  // DeliveryEmail?: string
  DeliveryMethod1?: DeliveryMethod
  DeliveryMethod2?: DeliveryMethod|null
  IsTaxInvoice?: boolean
}

export interface PackageOrderRequest {
  UseCarCode: string
  CarTypeCode: string
  CarCategoryID: string
  CarSalesYear: string
  CarBrandID: string
  CarModelID: string
  SubCarModelID: string
  CompanyCode: string
  AgentCode: string
  EffectiveType: string
  EffectiveDate: string
  ExpireDate: string
}

export interface CarDetailsExtension {
  License: string
  BodyNo: string
  EngineNo: string
  ColorID: string
  LicenseProvinceID: string
  LicenseFileID: string
  IsRedLicense: boolean
}

export interface CustomerOrderRequest {
  PersonProfile?: PersonProfile
  LegalPersonProfile?: LegalPersonProfile
  DefaultAddress?: DefaultAddress
  DeliveryAddress?: DeliveryAddress
  TaxInvoiceAddress?: TaxInvoiceAddress
  TaxInvoiceDeliveryAddress?: TaxInvoiceDeliveryAddress
  IsDeliveryAddressSameAsDefault?: boolean
  IsTaxInvoiceAddressSameAsDefault?: boolean
  IsTaxInvoiceDeliveryAddressSameAsDefault?: boolean
  IsPerson?: boolean
  IsBranch?: boolean
}

export interface PersonProfile {
  CustomerID: string
  PrefixID: string
  FirstName: string
  LastName: string
  BirthDate: string
  PersonalID: string
  NationalityID: string
  PhoneNumber: string
  Email: string
}

export interface LegalPersonProfile {
  CustomerID: string
  PrefixID: string
  Name: string
  BranchName: string
  TaxID: string
  BranchID: string
  ContactFirstName: string
  ContactLastName: string
  ContactPhoneNumber: string
  ContactEmail: string
}

export interface DefaultAddress {
  AddressID: string
  ReferenceID: string
  ReferenceType: string
  ProvinceID: string
  DistrictID: string
  SubDistrictID: string
  TaxID: string
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
  ZipCode: string
}

export interface DeliveryAddress {
  AddressID: string
  ReferenceID: string
  ReferenceType: string
  ProvinceID: string
  DistrictID: string
  SubDistrictID: string
  TaxID: string
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
  Road: string
  ZipCode: string
}

export interface TaxInvoiceAddress {
  AddressID: string
  ReferenceID: string
  ReferenceType: string
  ProvinceID: string
  DistrictID: string
  SubDistrictID: string
  TaxID: string
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
  Road: string
}

export interface TaxInvoiceDeliveryAddress {
  AddressID: string
  ReferenceID: string
  ReferenceType: string
  ProvinceID: string
  DistrictID: string
  SubDistrictID: string
  TaxID: string
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
  Road: string
}
export interface DeliveryMethod {
  MethodType: string
  DeliveryType: string
  DeliveryChannelType: string
  DeliveryEmail: string
}

export interface PlaceOrderResponse {
  OrderNo: string
}

export interface InsuranceRecieveObject {
  ShippingPolicy: string
  Email: string
  PostalDelivary?: PostalDelivary
}
export interface PostalDelivary {
  IsDeliveryAddressSameAsDefault: boolean
  ShippingMethod: string
  ShippingFee: string
  DeliveryAddress?: DeliveryAddress
}