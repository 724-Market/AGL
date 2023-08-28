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

export interface IAPIPaymentGatewayResponse<T> {
    status: string
    message: string
    data?: T
}

export interface IDataTableResponse<T> {
    status: string
    draw?: number
    recordsTotal?: number
    recordsFiltered?: number
    data?: T
}