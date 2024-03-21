import type { IAPIResponse } from "../entities/useApi-response";
import type { IUserAuthRequest, IUserAuthResponse } from "../entities/userAuth-entity";

class SessionModule {
    private RESOURCE = '/Session';

    async getToken(req: IUserAuthRequest): Promise<IAPIResponse<IUserAuthResponse>> {
        return await useCallApi().apiRepository<IUserAuthResponse>(`${this.RESOURCE}/token/get`, req)
    }
    async refreshToken(refreshToken: string,oldAccessToken:string): Promise<IAPIResponse<IUserAuthResponse>> {
        const req = {
            RefreshToken: refreshToken,
            oldAccessToken:oldAccessToken
        }
        const api = await useCallApi().apiRepository<IUserAuthResponse>(`${this.RESOURCE}/refresh-token/get`, req)
        return api
    }

}

export default SessionModule;