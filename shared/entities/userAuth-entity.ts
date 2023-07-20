export interface IUserAuthRequest {
    username: string
    password: string
}

export interface IUserAuthResponse {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
    "as:client_id": string
    userName: string
    "as:region": string
    ".issued": string
    ".expires": string
    bearer: string
}
export interface IUserAuth{
    userName:string,
    accessToken: string,
    expiresIn: number,
    tokenType: string,
    refresh_token: string,
    issuedDate:string,
}