export interface CustomerAddressSaveReq {
    CustomerID: string;
    AddressID: string;
    ProvinceID: string;
    DistrictID: string;
    SubDistrictID: string;
    TaxID: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    Name: string;
    Type: string;
    AddressLine1: string;
    AddressLine2: string;
    AddressText: string;
    No: string;
    Moo: string;
    Place: string;
    Building: string;
    Floor: string;
    Room: string;
    Branch: string;
    Alley: string;
    Road: string;
}
export interface CustomerAddressSaveRes {
    Options?: string;
}

export interface CustomerIDReq {
    CustomerID: string;
}
export interface CustomerAddressListRes {
    ID: string;
    ReferenceID: string;
    ReferenceType: string;
    ProvinceID: string;
    DistrictID: string;
    SubDistrictID: string;
    ProvinceCode: string;
    DistrictCode: string;
    SubDistrictCode: string;
    PVCODE: string;
    TaxID: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    Name: string;
    Type: string;
    AddressLine1: string;
    AddressLine2: string;
    AddressText: string;
    No: string;
    Moo: string;
    Place: string;
    Building: string;
    Floor: string;
    Room: string;
    Branch: string;
    Alley: string;
    Road: string;
    IsSameAsDefault: boolean;
    IsDefault: boolean;
    IsDelete: boolean;
    CreateDate: string;
    CreateUser: string;
    UpdateDate: string;
    UpdateUser: string;
    OwnerFirstName: string;
    OwnerLastName: string;
    ProvinceName: string;
    DistrictName: string;
    SubDistrictName: string;
    ZipCode: string;
}