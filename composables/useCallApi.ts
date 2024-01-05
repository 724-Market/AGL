import type { IAPIResponse, IAPIPaymentGatewayResponse, IDataTableResponse } from "~/shared/entities/useApi-response"
import type { WrapperResponse } from "~/shared/entities/wrapper-response"

export default () => {
    const getResponse = <T>(response: any, params: any): IAPIResponse<T> => {
        const wrapper: WrapperResponse<T> = {
            Status: "",
        }
        const result: IAPIResponse<T> =
        {
            apiStatus: "",
            respErrorCode: "",
            serverStatus: 0,
            statusMessage: "",
            statusMessageType: "",
            apiResponse: wrapper
        }
        if (response.status == 200) {

            const jsonData = JSON.parse(response._data)

            if (jsonData.Status == 200) {

                result.serverStatus = response.status
                result.apiStatus = jsonData.Status
                result.statusMessage = jsonData.Message
                result.statusMessageType = 'notice-success'
                result.respErrorCode = jsonData.ErrorCode
                result.respData = jsonData.Data
                result.respOptions = jsonData.Options
                result.apiResponse = jsonData

            }
            else {

                result.serverStatus = response.status
                result.apiStatus = jsonData.Status
                result.statusMessage = jsonData.ErrorMessage
                result.statusMessageType = 'notice-warning'
                result.respErrorCode = jsonData.ErrorCode
                result.respData = jsonData.Data
                result.respOptions = jsonData.Options
                result.apiResponse = jsonData

            }

        }
        else {

            result.serverStatus = response.status
            result.apiStatus = ""
            result.statusMessage = response.statusText
            result.statusMessageType = 'notice-danger'
            result.respErrorCode = ''
            result.respData = undefined
            result.respOptions = undefined

        }
        
        return result
    }
    const get = async <T>(params: any): Promise<IAPIResponse<T>> => {
        const wrapper: WrapperResponse<T> = {
            Status: "",
        }
        let result: IAPIResponse<T> =
        {
            apiStatus: "",
            respErrorCode: "",
            serverStatus: 0,
            statusMessage: "",
            statusMessageType: "",
            apiResponse: wrapper
        }

        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                result = getResponse<T>(response, params)

            }
        })

        return result

    }
    const post = async<T>(params: any): Promise<IAPIResponse<T>> => {
        const wrapper: WrapperResponse<T> = {
            Status: "",
        }
        let result: IAPIResponse<T> =
        {
            apiStatus: "",
            respErrorCode: "",
            serverStatus: 0,
            statusMessage: "",
            statusMessageType: "",
            apiResponse: wrapper
        }

        if (!params.RefreshToken) { // get token is not refresh token
        // check token expire
        params.Token = await useUtility().getToken()
        }
        
        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                result = getResponse<T>(response, params)

            }
        })
        console.log('post',result)
        return result

    }

    const postGateway = async<T>(url: string, params: any): Promise<IAPIPaymentGatewayResponse<T>> => {
        const result: IAPIPaymentGatewayResponse<T> =
        {
            message:'',
            status:'',
        }
        params.URL = url
        const { data, pending, error, refresh } = await useFetch('/api/gateway', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {
                
                if (response.status == 200) {
                    result.status = response._data.status
                    result.message = response._data.message
                    result.data = response._data.data
                }
            }
        })
        return result
    }

    const postDataTable = async<T>(url: string, params: any): Promise<IDataTableResponse<T>> => {
        const result: IDataTableResponse<T> =
        {
            status:'',
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0
        }
        params.URL = url
        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {
                
                if (response.status == 200) {
                    result.status = response._data.status
                    result.draw = response._data.draw
                    result.recordsTotal = response._data.recordsTotal
                    result.recordsFiltered = response._data.recordsFiltered
                    result.data = response._data.data
                }
            }
        })
        return result
    }

    const apiRepository = async<T>(url: string, params: any): Promise<IAPIResponse<T>> => {
        const wrapper: WrapperResponse<T> = {
            Status: "",
        }
        let result: IAPIResponse<T> =
        {
            apiStatus: "",
            respErrorCode: "",
            serverStatus: 0,
            statusMessage: "",
            statusMessageType: "",
            apiResponse: wrapper
        }
        if (!params.RefreshToken && !url.toLowerCase().includes('/token/get')) { // get token is not refresh token
            // check token expire
            params.Token = await useUtility().getToken()
        }

        params.URL = url
        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                result = getResponse<T>(response, params)

            }
        })
        // console.log('apiRepository',result)
        return result

    }
    return {
        get,
        post,
        postGateway,
        postDataTable,
        apiRepository
    }

}