import { WrapperResponse } from '~/shared/entities/wrapper-response'
export interface IAPIResponse<T> {
    serverStatus: number
    apiStatus: string
    statusMessage: string
    statusMessageType: string
    respErrorCode: string
    respData?: T
    respOptions?: any
    apiResponse: WrapperResponse<T>

}