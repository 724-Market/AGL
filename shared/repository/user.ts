import type { 
  UserResponse,
  UserProfileReq,
  UserProfileRes,
  UserLimitRes,
  UserCommissionListReq,
  UserCommissionListRes,
  UserDataReq,
  UserDataRes,
  UserSaveReq,
  UserGroupListRes,
  delGroupReq,
  delGroupRes,
  delUserReq,
  delUserRes,
 } from "../entities/user-entity";
import type { IAPIResponse } from "../entities/useApi-response";

class UserModule {
  private RESOURCE = '/User';
  private RESOURCE_User = '/UserLevel';

  async GetUser(): Promise<IAPIResponse<UserResponse[]>> {
    return await useCallApi().apiRepository<UserResponse[]>(`${this.RESOURCE}/get`, {})
  }
  async create(req: UserProfileReq): Promise<IAPIResponse<UserProfileRes>> {
    return await useCallApi().apiRepository<UserProfileRes>(`${this.RESOURCE_User}/subuser/create`, req)
  }
  async saveProfile(req: UserSaveReq): Promise<IAPIResponse<UserProfileRes>> {
    return await useCallApi().apiRepository<UserProfileRes>(`${this.RESOURCE_User}/subuser/save`, req)
  }
  async getProfile(req: UserDataReq): Promise<IAPIResponse<UserDataRes>> {
    return await useCallApi().apiRepository<UserDataRes>(`${this.RESOURCE_User}/subuser/get`, req)
  }
  async createLimit(): Promise<IAPIResponse<UserLimitRes>> {
    return await useCallApi().apiRepository<UserLimitRes>(`${this.RESOURCE_User}/policy/subuser/create-limit/get`, {})
  }
  async getCommionList(req: UserCommissionListReq): Promise<IAPIResponse<UserCommissionListRes[]>> {
    return await useCallApi().apiRepository<UserCommissionListRes[]>(`${this.RESOURCE_User}/subuser/comission/history/list`, req)
  }
  async getGroupList(): Promise<IAPIResponse<UserGroupListRes>> {
    return await useCallApi().apiRepository<UserGroupListRes>(`${this.RESOURCE_User}/group/list`, {})
  }
  async deleteGroup(req: delGroupReq): Promise<IAPIResponse<delGroupRes>> {
    return await useCallApi().apiRepository<delGroupRes>(`${this.RESOURCE_User}/group/delete`, req)
  }
  async deleteUser(req: delUserReq): Promise<IAPIResponse<delUserRes>> {
    return await useCallApi().apiRepository<delUserRes>(`${this.RESOURCE_User}/subuser/delete`, req)
  }
  
}

export default UserModule;