// Import type
import type { IPackageRequest, IPackageResponse, Paging } from "~/shared/entities/packageList-entity"
import type { OrderDetails, OrderResponse } from "~/shared/entities/order-entity"
import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity"
import type { IInformation } from "~/shared/entities/information-entity"

import { isString } from "@vueuse/core"
import { storeToRefs } from "pinia"
import { useStoreUserAuth } from "~/stores/user/storeUserAuth"
import { useStoreInformation } from "~/stores/order/storeInformation"
import { useStorePackageList } from "~/stores/order/storePackageList"
import { useStorePackage } from "~/stores/order/storePackage"
import { useStorePlaceorder } from "~/stores/order/storePlaceorder"

// Import DayJS library
import dayjs from 'dayjs'
import 'dayjs/locale/th' // import locale
import buddhistEra from 'dayjs/plugin/buddhistEra' // import locale

export default () => {

    const config = useRuntimeConfig()
    // Define the StatusInfo interface
    interface StatusInfo {
        Class: string;
        Type: string;
    }
    const getStatusOrder = (statusCode: string | undefined): StatusInfo => {
        switch (statusCode) {
            case 'Success':
                return { Class: "is-success", Type: "success" };
            case 'Danger':
                return { Class: "is-danger", Type: "danger" };
            case 'Cancel':
                return { Class: "is-cancel", Type: "cancel" };
            case 'Warning':
                return { Class: "is-warning", Type: "warn" };
            default:
                return { Class: "Who are you!", Type: "Who are you!" }; // Return undefined if statusCode doesn't match any case
        }
    
    };

    const getClassFromStatusOrder = (statusCode: string | undefined): string => {
        if (statusCode === 'Success') {
            return 'is-success'
        } if (statusCode === 'CancelByUser') {
            return 'is-cancel'
        } else {
            return 'is-child'
        }
    }

    const getIconFromStatusOrder = (statusCode: string | undefined): string => {
        if (statusCode === 'Success') {
            return 'check'
        } else if (statusCode === 'CancelByUser') {
            return 'cross'
        } else {
            return 'icon'
        }
    }
const getTokenExpire = async(): Promise<string> => {
    let refreshToken = "";
    const store = useStoreUserAuth()
    const checkToken = store.checkTokenExpire()
    const { AuthenInfo } = storeToRefs(store)
    if(checkToken==false)
    {
        if(AuthenInfo.value)
        {
            refreshToken = AuthenInfo.value.refresh_token
        }
    }

    return refreshToken
}
    const getToken = async (): Promise<string> => {
        let token = ""
        // check token expire
        const store = useStoreUserAuth()
        const { AuthenInfo } = storeToRefs(store)

        const checkToken = store.checkTokenExpire()
        if (checkToken) {
            if (AuthenInfo.value) {
                token = AuthenInfo.value.accessToken
            }
        }
        else {
            // refresh token in store
            const refresToken = AuthenInfo.value ? AuthenInfo.value.refresh_token : ""
            if (refresToken && refresToken != "") {

                const data = await store.refreshToken(refresToken)
                if (data) {
                    token = data.accessToken
                }

            }
        }
        return token
    }

    const getCompanyImage = (): string => {
        const image = config.public.CompanyImage
        return image
    }

    const getCurrency = (currency: number, digit?: number): string => {
        const options: Intl.NumberFormatOptions = {
            style: 'decimal',
            minimumFractionDigits: digit ?? 2
            //currency: 'THB'
        }
        const numberFormat = new Intl.NumberFormat('th-TH', options)
        const formattedCurrency = numberFormat.format(currency)
        return formattedCurrency
    }

    const maskMobileNumber = (mobileNumber: string): string => {

        if (typeof mobileNumber === 'string' && /^\d{10}$/.test(mobileNumber)) {
            // Extract the parts of the mobile number
            const prefix = mobileNumber.slice(0, 3);
            const middlePart = mobileNumber.slice(2, 5);
            const lastPart = mobileNumber.slice(8);

            // Format the mobile number
            const formattedNumber = `${prefix}-XXX-XX${lastPart}`;
            return formattedNumber;
        } else {
            console.error('Invalid mobile number format');
            return mobileNumber;
        }

    }

    // Format date value
    const formatDate = (dateString: string | undefined, format?: string): string => {
        if (!dateString) {
            return ''; // or handle it in a way that makes sense for your application
        }

        dayjs.extend(buddhistEra);
        dayjs.locale('th');
        const date = dayjs(dateString.replace('Z', '')).locale('th');

        switch (format) {
            case 'FullTime':
                format = 'HH:mm:ss';
                break;
            case 'ShortTime':
                format = 'HH:mm';
                break;
            case 'FullDate':
                format = 'D MMMM BBBB';
                break;
            case 'ShortDate':
                format = 'D MMM BBBB';
                break;
            case 'FullDateFullTime':
                format = 'D MMMM BBBB • HH:mm:ss';
                break;
            case 'ShortDateFullTime':
                format = 'D MMM BBBB • HH:mm:ss';
                break;
            case 'YYYY-MM-DD':
                format = 'YYYY-MM-DD';
                break;
            default:
                format = 'D MMM BBBB • HH:mm';
        }

        return date.format(format);
    };

    const formatText = (text: string): string => {
        // Regular expression to find content between <strong> tags
        const strongContentRegex = /<strong>(.*?)<\/strong>/g

        // Replace <strong> tags with span and apply styles conditionally
        const formattedText = text.replace(strongContentRegex, (match, p1) => {
            if (p1) {
                return `<span><strong>${p1}</strong></span>`
            } else {
                return match // Return unchanged if there's no content between <strong> tags
            }
        })

        return formattedText
    }

    const getStepMenuFromUri = (): number => {
        let step = 0
        if (process.client) {
            const menu = window.location.pathname

            switch (menu) {
                case '/order/compulsory/information': step = 1
                    break
                case '/order/compulsory/packages': step = 2
                    break
                case '/order/compulsory/placeorder': step = 3
                    break
                case '/order/compulsory/payment': step = 4
                    break
                case '/order/compulsory/summary': step = 5
                    break
            }

        }
        return step
    }

    const getPaging = (page: Paging): Paging => {
        const route = useRoute()
        if (route.query && route.query.currentPage) {
            if (isString(route.query.currentPage)) {
                page.Page = parseInt(route.query.currentPage ?? 0)
            }

        }
        return page
    }

    const downloadImage = (base64Image: string, filename: string) => {
        // Convert the Base64 image to Blob
        const byteString = atob(base64Image.split(',')[1])
        const mimeString = base64Image.split(',')[0].split(':')[1].split('')[0]
        const arrayBuffer = new ArrayBuffer(byteString.length)
        const uintArray = new Uint8Array(arrayBuffer)

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i)
        }

        const blob = new Blob([arrayBuffer], { type: mimeString })

        // Create a temporary link element
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)

        // Set the filename for the downloaded image
        link.download = filename //'qr.png'

        // Programmatically click the link to trigger the download
        link.click()

        // Clean up the temporary link object
        URL.revokeObjectURL(link.href)
    }

    const getDeviceId = async () => {
        const ua = navigator.userAgent
        let tem
        let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || []
            return 'IE ' + (tem[1] || '')
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
            if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
        return M.join(' ')
    }

    const setStoretoStep = async (data: OrderResponse, orderNo: string, orderDetail: OrderDetails) => {
        if (data && data.Order) {
            const paging: globalThis.Ref<Paging> = ref({
                Length: 100,
                Page: 1,
                TotalRecord: 0,
                RedirectUrl: "/order/compulsory/packages",
            })

            const d = new Date()
            const getMonth = d.getMonth() + 1
            const EffectiveDate = `${d.getFullYear()}-${getMonth > 9 ? getMonth : "0" + getMonth}-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
                }`
            const ExpireDate = `${d.getFullYear() + 1}-${getMonth > 9 ? getMonth : "0" + getMonth}-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
                }`

            const infomation = useStoreInformation()
            const storePackage = useStorePackage()
            const placeorder = useStorePlaceorder()

            const storeAuth = useStoreUserAuth()
            const { AuthenInfo } = storeToRefs(storeAuth)

            const order = data.Order
            const req: PlaceOrderRequest = {
                OrderNo: orderNo,
                Package: order.Package,
                CarDetailsExtension: order.CarDetailsExtension,
                Customer: order.Customer,
                DeliveryMethod1: order.DeliveryMethod1,
                DeliveryMethod2: order.DeliveryMethod2,
                IsTaxInvoice: order.IsTaxInvoice,
            }
            /* For fix issue API: /OrderCMI/details/get return orderDetail.TaxInvoiceDetails.ZipCode = null
            if (orderDetail) {
                if (req.Customer && req.Customer.DefaultAddress) {
                    req.Customer.DefaultAddress.ZipCode = orderDetail.AssuredDetails.ZipCode
                }
                if (req.Customer && req.Customer.DeliveryAddress) {
                    req.Customer.DeliveryAddress.ZipCode = orderDetail.DeliveryPolicyDetails.ZipCode
                }
                if (req.Customer && req.Customer.TaxInvoiceAddress) {
                    req.Customer.TaxInvoiceAddress.ZipCode = orderDetail.TaxInvoiceDetails.ZipCode
                }
                if (req.Customer && req.Customer.TaxInvoiceDeliveryAddress) {
                    req.Customer.TaxInvoiceDeliveryAddress.ZipCode = orderDetail.DeliveryTaxInvoiceDetails.ZipCode
                }
            }
            */
            if (orderDetail) {
                if (req.Customer && (req.Customer.DefaultAddress?.ZipCode === null)) {
                    req.Customer.DefaultAddress.ZipCode = orderDetail.AssuredDetails.ZipCode
                }
                if (req.Customer && (req.Customer.DeliveryAddress?.ZipCode === null)) {
                    req.Customer.DeliveryAddress.ZipCode = orderDetail.DeliveryPolicyDetails.ZipCode
                }
                if (req.Customer && (req.Customer.TaxInvoiceAddress?.ZipCode === null)) {
                    req.Customer.TaxInvoiceAddress.ZipCode = orderDetail.TaxInvoiceDetails.ZipCode
                }
                if (req.Customer && (req.Customer.TaxInvoiceDeliveryAddress?.ZipCode === null)) {
                    req.Customer.TaxInvoiceDeliveryAddress.ZipCode = orderDetail.DeliveryTaxInvoiceDetails.ZipCode
                }
            }

            placeorder.setOrder(req)

            const reqInfo: IInformation = {
                CarBrand: order.Package.CarBrandID,
                CarCC: orderDetail ? orderDetail.CarDetails.CarCC.toFixed(0) ?? "" : '',
                CarDetail: getCarDetail(orderDetail),
                CarModel: order.Package.CarModelID,
                CarSize: order.Package.CarCategoryID,
                CarType: order.Package.CarTypeCode,
                CarUse: order.Package.UseCarCode,
                CarYear: order.CarDetails.CarSalesYear.toFixed(0),
                customSubCarModel: "",
                EffectiveDate: order.Package.EffectiveDate,
                EffectiveType: order.Package.EffectiveType,
                ExpireDate: order.Package.ExpireDate,
                SubCarModel: order.Package.CarModelID,
                InsuranceDay: getDayOfYear(order.Package.EffectiveDate, order.Package.ExpireDate),
            }
            infomation.setInformation(reqInfo)

            const store = useStorePackageList()
            const request: IPackageRequest = {
                AgentCode: AuthenInfo.value.userName,
                CarBrandID: reqInfo.CarBrand,
                CarCategoryID: reqInfo.CarSize,
                CarModelID: reqInfo.CarModel,
                CarSalesYear: reqInfo.CarYear,
                CarTypeCode: reqInfo.CarType,
                EffectiveDate: EffectiveDate,
                EffectiveType: reqInfo.EffectiveType,
                ExpireDate: reqInfo.ExpireDate,
                SubCarModelID: reqInfo.SubCarModel.split("|")[0],
                UseCarCode: reqInfo.CarUse,
                Paging: paging.value,
            }
            const packageList = await store.getPackageList(request)
            const packageSelect = packageList.Data?.find(
                (o) => o.CompanyCode == order.Package.CompanyCode
            ) as IPackageResponse;
            packageSelect.Price = order.InsureDetails.Total
            packageSelect.PackageResult[0].PriceACT = order.InsureDetails.Total
            packageSelect.PackageResult[0].AgentComDiscount = order.InsureDetails.ComValue
            storePackage.setPackage(packageSelect)
        }
    }

    const getDayOfYear = (EffectiveDate: string, ExpireDate: string): number => {
        let days = 0

        const startDate = new Date(EffectiveDate)
        const endDate = new Date(ExpireDate)
        const diff = Math.abs(startDate.getTime() - endDate.getTime())
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
        days = diffDays - 1

        return days
    }

    // API Response
    const responseCheck = (res: any) => {

        const resp = ref<any>({});

        if (res.serverStatus == 200) {
            if (res.apiStatus == 200) {
                resp.value.status = 'pass';
                resp.value.isShowModal = false
            }
            else {

                if (res.apiResponse.ErrorCode === '1102813') {
                    // Please wait and try again after x Minutes y Seconds.
                    // Cannot Send OTP. Please try again.
                    resp.value.modalTitle = 'ไม่สามารถส่ง OTP ได้'
                    resp.value.modalText = 'กรุณาทำการใหม่อีกครั้ง'
                }
                else if (res.apiResponse.ErrorCode === '1103807') {
                    resp.value.modalTitle = 'รหัส OTP ไม่ถูกต้อง'
                    resp.value.modalText = 'กรุณาทำการยืนยัน OTP ใหม่อีกครั้ง'
                }
                else {
                    resp.value.modalTitle = res.apiResponse.ErrorMessage
                    resp.value.modalText = 'Error : ' + res.apiResponse.ErrorCode
                }

                resp.value.status = 'error';
                resp.value.isShowModal = true
                resp.value.modalType = 'warning'
                resp.value.modalButton = 'ตกลง'
            }
        }
        else {
            resp.value.status = 'server-error';
            resp.value.isShowModal = true
            resp.value.modalType = 'danger'
            resp.value.modalTitle = 'เกิดความผิดพลาด กรุณาลองใหม่อีกครั้ง'
            resp.value.modalText = 'Server Error : ' + res.statusMessage + ' (' + res.serverStatus + ')'
            resp.value.modalButton = 'ตกลง'
        }

        return resp.value
    }

    // Dialog loading
    const createLoadingProps = (isShowLoading: boolean, showLogo?: boolean, showText?: boolean) => {

        const loadingProps = ref({
            isShowLoading: isShowLoading,
            showLogo: showLogo,
            showText: showText,
        })

        return loadingProps.value
    }

    const getCarDetail = (orderDetail: OrderDetails): string => {
        let carDetail = ""
        if (orderDetail) {
            carDetail = `${orderDetail.CarDetails.CarBrand} ${orderDetail.CarDetails.CarModel} ${orderDetail.CarDetails.SubCarModel}  ${orderDetail.CarDetails.CarYear}`
        }
        return carDetail
    }
    
    const setSession = (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    const getSession = (key: string) => {
        const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    /////////////////////////////////////////
const setCookie = (name: string, value: string, days: number) => {
    let expires = ""
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

    return {
        getClassFromStatusOrder,
        getStatusOrder,
        getIconFromStatusOrder,
        getCompanyImage,
        getCurrency,
        getTokenExpire,
        getToken,
        getStepMenuFromUri,
        getPaging,
        formatDate,
        formatText,
        maskMobileNumber,
        downloadImage,
        getDeviceId,
        setStoretoStep,
        responseCheck,
        createLoadingProps, 
        setSession, 
        getSession,
        setCookie
    }
}