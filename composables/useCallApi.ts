import type { IAPIResponse, IAPIPaymentGatewayResponse, IDataTableResponse } from "~/shared/entities/useApi-response"
import type { WrapperResponse } from "~/shared/entities/wrapper-response"

export default () => {
    const getResponse = async <T> (response: any, params: any): Promise<IAPIResponse<T>> => {
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
            apiResponse: wrapper,
        }

        if (response.status == 200) {

            let jsonData = response._data
            if (typeof jsonData === "string") {
                jsonData = JSON.parse(jsonData)
            }

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

        

        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                result = getResponse<T>(response, params)

            }
        })
        return result

    }

    const postGateway = async<T>(params: any): Promise<IAPIPaymentGatewayResponse<T>> => {
        const result: IAPIPaymentGatewayResponse<T> =
        {
            message: '',
            status: '',
        }
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

    const postPaymentGateway = async(params: any) => {
        const result =
        {
            message: '',
            status: '',
            data: {
                orderid: '',
                refno1: '',
                refno2: '',
                amount: 0.00,
                payment_id: '',
                payment_type: '',
                endpoint_code: '',
                payment_channel: '',
                payment_expired: '',
                payment_status: '',
                payment_code: '',
                payment_date: '',
                pgc_url: '',
                payment_url: '',
                payment_qr: '',
            }
        }
        const { data, pending, error, refresh } = await useFetch('/api/gateway', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                if (response.status == 200) {
                    result.status = response._data.status
                    result.message = response._data.message
                    result.data = response._data
                }
            }
        })
        return result
    }

    const postDataTable = async<T>(url: string, params: any): Promise<IDataTableResponse<T>> => {
        const result: IDataTableResponse<T> =
        {
            status: '',
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0
        }
        //params.refreshToken = await useUtility().getTokenExpire()
        params.URL = url
        const { data, pending, error, refresh } = await useFetch('/api/aglove', {
            method: "POST",
            body: params,
            onResponse({ request, response }) {

                if (response.status == 200) {
                    const res = response._data
                    result.status = res.status
                    result.draw = res.draw
                    result.recordsTotal = res.recordsTotal
                    result.recordsFiltered = res.recordsFiltered
                    result.data = res.data
                }
            }
        })
        return result
    }

    const apiRepository = async<T>(url: string, params: any, method?: "POST" | "post" | "GET" | "get"): Promise<IAPIResponse<T>> => {
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

        if (params.Token2) {
            params.Token = params.Token2
        }
        params.URL = url
        if (!method || (method != "get" && method != "GET")) {

            const { data, pending, error, refresh } = await useFetch('/api/aglove', {
                method: method ?? "POST",
                body: params,
                onResponse({ request, response }) {
                    result = getResponse<T>(response, params)
                }
            })
        }
        else {
            const { data, pending, error, refresh } = await useFetch('/api/aglove?url=' + params.URL + "&token=" + params.Token, {
                method: method,
                onResponse({ request, response }) {
                    result = getResponse<T>(response, params)
                }
            })

        }
        return result

    }
    return {
        get,
        post,
        postGateway,
        postPaymentGateway, 
        postDataTable,
        apiRepository
    }

}