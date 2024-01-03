import { isString } from "@vueuse/core";
import { storeToRefs } from "pinia";
import type { IPackageRequest, IPackageResponse, Paging } from "~/shared/entities/packageList-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import dayjs from 'dayjs';
import 'dayjs/locale/th' // import locale
import buddhistEra from 'dayjs/plugin/buddhistEra' // import locale
import type { OrderDetails, OrderResponse } from "~/shared/entities/order-entity";
import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import type { IInformation } from "~/shared/entities/information-entity";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";

export default () => {

    const config = useRuntimeConfig()

    const getClassFromStatusOrder = (statusCode: string | undefined): string => {
        // Define your classes based on the value of statusCode
        if (statusCode === 'Success') {
            return 'timeline-item is-success';
        } if (statusCode === 'CancelByUser') {
            return 'timeline-item is-cancel';
        } else {
            return 'timeline-item is-child';
        }
    };
    const getIconFromStatusOrder = (statusCode: string | undefined): string => {
        // Define your classes based on the value of statusCode
        if (statusCode === 'Success') {
            return 'icon check';
        } else if (statusCode === 'CancelByUser') {
            return 'icon cross';
        } else {
            return 'icon';
        }
    };
    const getToken = async (): Promise<string> => {
        let token = "";
        // check token expire
        const store = useStoreUserAuth();
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
    const formatDate = (dateString: string, format: string): string => {
        dayjs.extend(buddhistEra)
        dayjs.locale('th')
        const date = dayjs(dateString.replace('Z', '')).locale('th');
        // Then specify how you want your dates to be formatted
        return date.format(format);

    }
    const formatText = (text: string): string => {
        // Regular expression to find content between <strong> tags
        const strongContentRegex = /<strong>(.*?)<\/strong>/g;
    
        // Replace <strong> tags with span and apply styles conditionally
        const formattedText = text.replace(strongContentRegex, (match, p1) => {
            if (p1) {
                return `<span><strong>${p1}</strong></span>`;
            } else {
                return match; // Return unchanged if there's no content between <strong> tags
            }
        });
    
        return formattedText;
    };
    const getStepMenuFromUri = (): number => {
        let step = 0
        if (process.client) {
            const menu = window.location.pathname

            switch (menu) {
                case '/order/compulsory/information': step = 1; break
                case '/order/compulsory/packages': step = 2; break
                case '/order/compulsory/placeorder': step = 3; break
                case '/order/compulsory/payment': step = 4; break
                case '/order/compulsory/summary': step = 5; break
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
    const downloadImage = (base64Image: string,filename:string) => {
        // Convert the Base64 image to Blob
        const byteString = atob(base64Image.split(',')[1]);
        const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        // Set the filename for the downloaded image
        link.download = filename //'qr.png';

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up the temporary link object
        URL.revokeObjectURL(link.href);
    }
    const getDeviceId = async () => {
        const ua= navigator.userAgent;
        let tem; 
        let M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    }

    const setStoretoStep = async (data: OrderResponse, orderNo: string, orderDetail: OrderDetails) => {
        if (data && data.Order) {
            const paging: globalThis.Ref<Paging> = ref({
                Length: 100,
                Page: 1,
                TotalRecord: 0,
                RedirectUrl: "/order/compulsory/packages",
            });

            const d = new Date();
            const getMonth = d.getMonth() + 1;
            const EffectiveDate = `${d.getFullYear()}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
                d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
            }`;
            const ExpireDate = `${d.getFullYear() + 1}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
                d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
            }`;

            const infomation = useStoreInformation();
            const storePackage = useStorePackage();
            const placeorder = useStorePlaceorder();

            const storeAuth = useStoreUserAuth();
            const { AuthenInfo } = storeToRefs(storeAuth)

            const order = data.Order;
      
            const req: PlaceOrderRequest = {
                OrderNo: orderNo,
                Package: order.Package,
                CarDetailsExtension: order.CarDetailsExtension,
                Customer: order.Customer,
                DeliveryMethod1: order.DeliveryMethod1,
                DeliveryMethod2: order.DeliveryMethod2,
                IsTaxInvoice: order.IsTaxInvoice,
            };
            if(orderDetail) {
                if (req.Customer && req.Customer.DefaultAddress) {
                    req.Customer.DefaultAddress.ZipCode = orderDetail.AssuredDetails.ZipCode;
                }
                if (req.Customer && req.Customer.DeliveryAddress) {
                    req.Customer.DeliveryAddress.ZipCode = orderDetail.DeliveryPolicyDetails.ZipCode;
                }
                if (req.Customer && req.Customer.TaxInvoiceAddress) {
                    req.Customer.TaxInvoiceAddress.ZipCode = orderDetail.TaxInvoiceDetails.ZipCode;
                }
                if (req.Customer && req.Customer.TaxInvoiceDeliveryAddress) {
                    req.Customer.TaxInvoiceDeliveryAddress.ZipCode = orderDetail.DeliveryTaxInvoiceDetails.ZipCode;
                }
            }
            
            placeorder.setOrder(req);
      
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
            };
            infomation.setInformation(reqInfo);
      
            const store = useStorePackageList();
            const request: IPackageRequest = {
                AgentCode: AuthenInfo.value.userName,
                CarBrandID: reqInfo.CarBrand,
                CarCategoryID: reqInfo.CarSize,
                CarModelID: reqInfo.CarModel,
                CarSalesYear: reqInfo.CarYear,
                CarTypeCode: reqInfo.CarType,
                EffectiveDate: EffectiveDate,
                EffectiveType: reqInfo.EffectiveType,
                ExpireDate: ExpireDate,
                SubCarModelID: reqInfo.SubCarModel.split("|")[0],
                UseCarCode: reqInfo.CarUse,
                Paging: paging.value,
            };
            const packageList = await store.getPackageList(request);
            const packageSelect = packageList.Data?.find(
                (o) => o.CompanyCode == order.Package.CompanyCode
            ) as IPackageResponse;
            packageSelect.Price = order.InsureDetails.Total;
            packageSelect.PackageResult[0].PriceACT = order.InsureDetails.Total;
            packageSelect.PackageResult[0].AgentComDiscount = order.InsureDetails.ComValue;
            storePackage.setPackage(packageSelect);
        }
    };
    const getDayOfYear = (EffectiveDate: string, ExpireDate: string): number => {
        let days = 0;
      
        const startDate = new Date(EffectiveDate);
        const endDate = new Date(ExpireDate);
        const diff = Math.abs(startDate.getTime() - endDate.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        days = diffDays - 1;
      
        return days;
    };
    const getCarDetail = (orderDetail: OrderDetails): string => {
        let carDetail = "";
        if (orderDetail) {
          carDetail = `${orderDetail.CarDetails.CarBrand} ${orderDetail.CarDetails.CarModel} ${orderDetail.CarDetails.SubCarModel}  ${orderDetail.CarDetails.CarYear}`;
        }
        return carDetail;
    };

    return {
        getClassFromStatusOrder,
        getIconFromStatusOrder,
        getCompanyImage,
        getCurrency,
        getToken,
        getStepMenuFromUri,
        getPaging,
        formatDate,
        formatText,
        downloadImage,
        getDeviceId,
        setStoretoStep
    }
}