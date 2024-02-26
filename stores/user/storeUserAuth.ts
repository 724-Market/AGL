import type { IUserAuthResponse, IUserAuthRequest, IUserAuth } from '~/shared/entities/userAuth-entity'
import type { WrapperResponse } from '~~/shared/entities/wrapper-response'

export const useStoreUserAuth = defineStore('useStoreUserAuth', {
    state: (): IUserAuth => {
        return {
            accessToken: "",
            expiresIn: 0,
            issuedDate: "",
            refresh_token: "",
            tokenType: "",
            userName: "",
        }
    },
    getters: {
        AuthenInfo: state => state,
    },
    actions: {
        async authLogin(req: IUserAuthRequest): Promise<WrapperResponse<IUserAuthResponse>> {
            const response = await useRepository().session.getToken(req)
            
            const result = response.apiResponse
            // set init store authen
            if (result.Data) {

                const userAuth: IUserAuth = {
                    accessToken: result.Data.access_token,
                    issuedDate: result.Data['.issued'],
                    refresh_token: result.Data.refresh_token,
                    tokenType: result.Data.token_type,
                    userName: req.username,
                    expiresIn: result.Data.expires_in
                }
                this.$state = userAuth
            }

            return result
        },
        async refreshToken(refreshTokenId: string): Promise<IUserAuth> {

            const response = await useRepository().session.refreshToken(refreshTokenId)
            
            const result = response.apiResponse

            if (result.Data) {
                this.$state.accessToken = result.Data.access_token
                this.$state.issuedDate = result.Data['.issued']
            }

            return this.$state
        },
        async updateTokenExpire(): Promise<IUserAuth> {

            const date = new Date()
            date.setSeconds(date.getSeconds()+this.$state.expiresIn)
            this.$state.issuedDate = date.toISOString()

            return this.$state
        },
        checkTokenExpire() {
            if (this.$state.accessToken && this.$state.accessToken != "") {
                const issued = new Date(this.$state.issuedDate)
                const expires_in = this.$state.expiresIn
                const expire = issued
                issued.setSeconds(issued.getSeconds() + expires_in)
                const date = new Date()

                return expire >= date
            } else {

                return false
            }

        },

        clearAuth() {
            this.$state = {
                accessToken: "",
                expiresIn: 0,
                issuedDate: "",
                refresh_token: "",
                tokenType: "",
                userName: "",
            }
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})