import { stepNumber } from '~~/plugins/stepnumber';
export interface UserResponse {
    ID: string
    Code: string
    SessionID: string
    UserName: string
    FirstName: string
    LastName: string
    FirstNameEN: string
    LastNameEN: string
    PositionID: string
    AgentID: string
    DepartmentID: string
    Status: string
    AddLevel: string
    PhoneExtension: string
    Email: string
    Pin: string
    NickName: string
    ManagerID: string
    StartWorkDate: string
    EmployeeCode: string
    Mobile: string
    Remark: string
    RemarkActive: string
    RemarkInActive: string
    PositionLevelID: string
    NonPositionID: string
    UniqueCode: string
    LineID: string
    LockLoginUntil: string
    Channel: string
    IDCard: string
    IsStatement: string
    IsNextYear: string
    IsActive: string
    Phone: string
    UserType: string
    Department: string
    IsVerifyByOTP: string
    PositionName: string
    UnitID: string
    UnitExecutiveName: string
    GroupID: string
    GroupExecutiveName: string
    BranchID: string
    BranchName: string
    LevelCo: string
    AgentStatement: string
    IsForceDelete: string
}

export interface UsersHistoryResponse {
  Ind?: number;
  UserID: string;
  ParentID: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Phone: string;
  UserGroupName: string;
  UserGroupType: string;
  CreditLimitAmount: string;
  CreditLimitPeriodDay: string;
  Commission: number;
  IsActive: boolean;
  CreateDate: string;
  UpdateDate: string;
}

export interface UserDetailRequest {
  SubUserID: string
}

export interface UserSaveReq {
  SubUserID: string;
  NewPassword: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  CreditLimit: number;
  Commission: number;
  BranchName: string;
  IsActive: boolean;
}

export interface UserProfileReq {
  Password: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Email: string;
  CreditLimit: number;
  Commission: number;
  BranchName: string;
  IsActive: boolean;
}

export interface UserDataReq {
  SubUserID: string;
}

export interface UserDataRes {
  UserID: string;
  ParentID: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  Email: string;
  Phone: string;
  UserGroupName: string;
  UserGroupType: string;
  CreditLimitAmount: string;
  CreditLimitPeriodDay: string;
  Commission: number;
  IsActive: boolean;
  CreateDate: string;
  UpdateDate: string;
}

export interface UserProfileRes {
  UserName: string
  UserID: string
}

export interface UserLimitRes {
  CurrentCount: string
  MaxCount: string
}

export interface UserCommissionListReq {
  SubUserID: string;
  Paging: Paging;
}

export interface UserCommissionListRes {
  Data?: CommissionList[];
}

export interface CommissionList {
  Commission: number;
  CreateDate: string;
}

export interface UserGroupListRes {
  ID: string;
  Name: string;
  Type: string;
}

export interface Paging {
  Page: number;
  Length: number;
  TotalRecord: number;
}

export interface delGroupReq {
  ID: string;
}

export interface delGroupRes {
  ID: string;
}

export interface delUserReq {
  SubUserID: string;
}

export interface delUserRes {
  SubUserID: string;
}
