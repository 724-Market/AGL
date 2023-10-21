export interface AgentInfo {
    ID: string
    AgentID: string
    LicenseID: string
    FileID?: string
    Type: string
    FirstName: string
    MidName: string
    LastName: string
    FirstNameEN?: string
    MidNameEN?: string
    LastNameEN?: string
    Tel2: string
    IDCard: string
    Email: string
    IsActive?: string
    IsVerify?: string
    IsDelete?: string
    StartDate?: string
    EndDate: string
    VerifyUser?: string
    VerifyDate?: string
    CreateUser?: string
    CreateDate?: string
    UpdateUser?: string
    UpdateDate?: string
  }

  export interface AgentAddressCreateReq {
    ProvinceID: string;
    DistrictID: string;
    SubDistrictID: string;
    TaxID: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    Name: string;
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
  export interface AgentAddressCreateRes {
    AddressID: string;
  }

  export interface AgentAddressListRes {
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

  export interface AgentAddressSaveReq {
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
  export interface AgentAddressSaveRes {
    Options?: string;
  }

  export interface AgentAddressDeleteRes {
    AddressID: string
  }
  export interface AgentAddressDeleteRes {
    Options?: string;
  }
  