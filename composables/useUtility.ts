import { isString } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { Paging } from "~/shared/entities/packageList-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import dayjs from 'dayjs';
import 'dayjs/locale/th' // import locale
import buddhistEra from 'dayjs/plugin/buddhistEra' // import locale
export default () => {

    const config = useRuntimeConfig()

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
        const date = dayjs(dateString).locale('th');
        // Then specify how you want your dates to be formatted
        return date.format(format);

    }
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

    return {
        getCompanyImage,
        getCurrency,
        getToken,
        getStepMenuFromUri,
        getPaging,
        formatDate,
        downloadImage
    }
}