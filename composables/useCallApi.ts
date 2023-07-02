import { IAPIResponse } from "~/shared/entities/useApi-response"
import { WrapperResponse } from "~/shared/entities/wrapper-response"

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

            // console.log('%c' + params.URL + '%cresponseData.Status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', jsonData.Status)
            // console.log('%c' + params.URL + '%cresponseData.Message', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(130, 57, 53);padding:3px;border-radius:2px', jsonData.Message)
            // console.log('%c' + params.URL + '%cresponseData.ErrorCode', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px', jsonData.ErrorCode)
            // console.log('%c' + params.URL + '%cresponseData.ErrorMessage', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(39, 72, 98);padding:3px;border-radius:2px', jsonData.ErrorMessage)
            // console.log('%c' + params.URL + '%cresponseData.Options', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(237, 222, 139);padding:3px;border-radius:2px', jsonData.Options)
            // console.log('%c' + params.URL + '%cresponseData.Data', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px', jsonData.Data)

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
                // console.log('%c' + params.URL + '%crequest', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', request)
                // console.log('%c' + params.URL + '%cresponse', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(1, 77, 103);padding:3px;border-radius:2px', response)
                // console.log('%c' + params.URL + '%cresponse.status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', response.status)

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
                // console.log('%c' + params.URL + '%crequest', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', request)
                // console.log('%c' + params.URL + '%cresponse', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(1, 77, 103);padding:3px;border-radius:2px', response)
                // console.log('%c' + params.URL + '%cresponse.status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', response.status)

                result = getResponse<T>(response, params)

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
        if (!params.RefreshToken) { // get token is not refresh token
            // check token expire
            params.Token = await useUtility().getToken()
        }

        params.URL = url
        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {
                // console.log('%c' + params.URL + '%crequest', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', request)
                // console.log('%c' + params.URL + '%cresponse', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(1, 77, 103);padding:3px;border-radius:2px', response)
                // console.log('%c' + params.URL + '%cresponse.status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', response.status)

                result = getResponse<T>(response, params)

            }
        })

        return result

    }
    return {
        get,
        post,
        apiRepository
    }

}