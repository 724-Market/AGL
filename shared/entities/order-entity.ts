import { LegalPersonProfile } from "./placeorder-entity"
import { SelectOption } from "./select-option"
import { Filter } from "./table-option"

export interface OrderDetailRequest {
  OrderNo: string
}
export interface OrderDetailResponse {
  OrderDetails?: OrderDetails
  PaymentDetails?: PaymentDetails
}

export interface OrderDetails {
  OrderNo: string
  OrderDate: string
  Paper: number
  IsTaxInvoice: boolean
  AssuredDetails: AssuredDetails
  CarDetails: CarDetails
  InsureDetails: InsureDetails
  DeliveryPolicyDetails: DeliveryPolicyDetails
  DeliveryTaxInvoiceDetails: DeliveryTaxInvoiceDetails
  TaxInvoiceDetails: TaxInvoiceDetails
  DeliveryMethod1: DeliveryMethod1
  DeliveryMethod2: DeliveryMethod2
}

export interface AssuredDetails {
  OrderNo: string
  Prefix: string
  Gender: string
  PrefixEn: string
  FirstName: string
  LastName: string
  MidName: string
  FirstNameEn: string
  LastNameEn: string
  MidNameEn: string
  IDCard: string
  Passport: string
  BirthDate: string
  Email: string
  PhoneNumber: string
  TaxID: string
  AddressFirstName: string
  AddressLastName: string
  AddressPhoneNumber: string
  AddressEmail: string
  AddressName: string
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
  ProvinceName: string
  DistrictName: string
  SubDistrictName: string
  ProvinceNameEn: string
  DistrictNameEn: string
  SubDistrictNameEn: string
  ZipCode: string
}

export interface CarDetails {
  OrderNo: string
  CarLicense: string
  CarBrand: string
  CarModel: string
  SubCarModel: string
  CarYear: number
  CarType: string
  CarSeat: number
  CarWeight: number
  CarCC: number
  NumBody: string
  NumEngine: string
  IsRedLicense: boolean
  LicenseProvince: string
  LicenseProvinceEn: string
  CarColor: string
  CarColorEn: string
}

export interface InsureDetails {
  OrderNo: string
  InsureType: string
  CompanyName: string
  CompanyCode: string
  CarCategory: string
  UseCarName: string
  UseCarCode: string
  ActiveStartDate: string
  ActiveEndDate: string
}

export interface DeliveryPolicyDetails {
  OrderNo: string
  DocumentType: string
  DeliveryName: string
  DeliveryType: string
  AddressTaxID: string
  AddressFirstName: string
  AddressLastName: string
  AddressPhoneNumber: string
  AddressEmail: string
  AddressName: string
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
  ProvinceName: string
  DistrictName: string
  SubDistrictName: string
  ProvinceNameEn: string
  DistrictNameEn: string
  SubDistrictNameEn: string
  ZipCode: string
}

export interface DeliveryTaxInvoiceDetails {
  OrderNo: string
  DocumentType: string
  DeliveryName: string
  DeliveryType: string
  AddressTaxID: string
  AddressFirstName: string
  AddressLastName: string
  AddressPhoneNumber: string
  AddressEmail: string
  AddressName: string
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
  ProvinceName: string
  DistrictName: string
  SubDistrictName: string
  ProvinceNameEn: string
  DistrictNameEn: string
  SubDistrictNameEn: string
  ZipCode: string
}

export interface TaxInvoiceDetails {
  OrderNo: string
  DocumentType: string
  DeliveryName: string
  DeliveryType: string
  AddressTaxID: string
  AddressFirstName: string
  AddressLastName: string
  AddressPhoneNumber: string
  AddressEmail: string
  AddressName: string
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
  ProvinceName: string
  DistrictName: string
  SubDistrictName: string
  ProvinceNameEn: string
  DistrictNameEn: string
  SubDistrictNameEn: string
  ZipCode: string
}

export interface DeliveryMethod1 {
  MethodType: string
  DeliveryType: string
  DeliveryChannelType: string
  DeliveryEmail: string
}

export interface DeliveryMethod2 {
  MethodType: string
  DeliveryType: string
  DeliveryChannelType: string
  DeliveryEmail: string
}

export interface PaymentDetails {
  PaymentType: string
  DiscountType: string
  DeliveryAmount: number
  FeeAmount: number
  PaperAmount: number
  CreditAmount: number
  OrderAmount: number
  GrandAmount: number
  CashBack: number
}


export interface OrderResponse {
  Order?: Order
  Payment?: Payment
}

export interface Order {
  OrderNo: string
  Package: Package
  CarDetails: CarDetails
  CarDetailsExtension: CarDetailsExtension
  Customer: Customer
  DeliveryMethod1: DeliveryMethod1
  DeliveryMethod2: DeliveryMethod2
  ProductID: string
  IsTaxInvoice: boolean
}

export interface CarDetails {
  CarType: string
  CarBrand: string
  CarModel: string
  SubCarModel: string
  CompanyCode: string
  CarSalesYear: number
}
export interface Package {
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

export interface Customer {
  PersonProfile: PersonProfile
  LegalPersonProfile: LegalPersonProfile
  DefaultAddress: DefaultAddress
  DeliveryAddress: DeliveryAddress
  TaxInvoiceAddress: TaxInvoiceAddress
  TaxInvoiceDeliveryAddress: TaxInvoiceDeliveryAddress
  IsDeliveryAddressSameAsDefault: boolean
  IsTaxInvoiceAddressSameAsDefault: boolean
  IsTaxInvoiceDeliveryAddressSameAsDefault: boolean
  IsPerson: boolean
  IsBranch: boolean
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
  Road: string
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

export interface DeliveryMethod1 {
  MethodType: string
  DeliveryType: string
  DeliveryChannelType: string
  DeliveryEmail: string
}

export interface DeliveryMethod2 {
  MethodType: string
  DeliveryType: string
  DeliveryChannelType: string
  DeliveryEmail: string
}

export interface Payment {
  PaperOnHandID: string
  CreditID: string
  PaymentNo: string
  PaymentType: string
  DiscountType: string
  DeliveryAmount: number
  FeeAmount: number
  PaperAmount: number
  CreditAmount: number
  OrderAmount: number
  GrandAmount: number
  CashBack: number
  PaymentDate: string
  PaymentUser: string
  CreateDate: string
  CreateUser: string
  UpdateDate: string
  UpdateUser: string
}
export interface OptionsResponse {
  CreditError: CreditError
}
export interface CreditError {
  Message: string,
  Amount: number
}

export interface HistorySearch {
  SearchCategory: SelectOption|undefined
  SearchText: string
  orderType: SelectOption|undefined
}
export interface StatusGroupResponse {
  Draft: number
  Pending: number
  Process: number
  Delivery: number
  Success: number
  CancelComplete: number
  CancelPending: number
}
export interface StatusGroupRequest {
  Filter?:Filter[]
}

export interface SubHistoryRequest {
  OrderGroupNo: string
}
export interface HistoryResponse {
  Ind?: string
  ID: string
  OwnerID: string
  OrderNo: string
  OrderGroupNo: string
  OrderGroupType: string
  OrderType: string
  OrderSubType: string
  OrderClassType: string
  JobType: string
  CreateType: string
  PaymentID: string
  PaymentTransactionNo: string
  CreateDate: string
  CreateUser: string
  UpdateDate: string
  UpdateUser: string
  StaffUpdateDate: string
  StaffUpdateUser: string
  CancelStatus: string
  CancelType: string
  IsCancel: boolean
  IsCancelComplete: boolean
  IsComplete: boolean
  IsPolicyFile: boolean
  PolicyURL: string
  AgentID: string
  AgentType: string
  AgentCode: string
  Policy: string
  CompanyName: string
  CompanyCode: string
  CarCategory: string
  UseCarName: string
  UseCarCode: string
  ActiveStartDate: string
  ActiveEndDate: string
  CarLicense: string
  RedLicense: string
  CarBrand: string
  CarModel: string
  SubCarModel: string
  CarColor: string
  Total: number
  Net: number
  Vat: number
  Rate: number
  PaymentNo: string
  PaymentType: string
  PayType: string
  DiscountType: string
  CouponCode: string
  NumCredit: number
  DeliveryAmount: number
  DiscountAmount: number
  PaperAmount: number
  CreditAmount: number
  OrderAmount: number
  GrandAmount: number
  PaymentStatus: string
  Status: string
  PaymentDate: string
  AssuredFullName: string
  AssuredFullNameEn: string
  PaymentUser: string
  Prefix: string
  Gender: string
  PrefixEn: string
  FirstName: string
  LastName: string
  MidName: string
  FirstNameEn: string
  LastNameEn: string
  MidNameEn: string
  IDCard: string
  Passport: string
  Email: string
  PhoneNumber: string
  DeliveryDocument: string
  IsDelivery: number
  IsReceive: number
}