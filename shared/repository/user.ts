import { UserResponse } from "../entities/user-entity";
import { IAPIResponse } from "../entities/useApi-response";

class UserModule {
  private RESOURCE = '/User';

  async GetUser(): Promise<IAPIResponse<UserResponse[]>> {
    return await useCallApi().apiRepository<UserResponse[]>(`${this.RESOURCE}/get`, {})
  }
  
}

export default UserModule;