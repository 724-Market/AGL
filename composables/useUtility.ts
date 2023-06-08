import { isString } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { Paging } from "~/shared/entities/packageList-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";

export default () => {

    const config = useRuntimeConfig()

    const getToken = async (): Promise<string> => {
        let token = "";
        // check token expire
        const store = useStoreUserAuth();
        const { AuthenInfo } = storeToRefs(store)
        const checkToken = store.checkTokenExpire()
        if (checkToken) {
            const { AuthenInfo } = storeToRefs(store)
            if (AuthenInfo.value) {
                token = AuthenInfo.value.accessToken
            }
        }
        else {
            // refresh token in store
            const refresToken = AuthenInfo.value ? AuthenInfo.value.refreshToken : ""
            if (refresToken && refresToken != "") {
                const { data } = await useAsyncData("userAuth", () => store.refreshToken(refresToken));
                if (data.value) {
                    token = data.value.accessToken
                }

            }


        }

        return token
    }
    const getCompanyImage = (): string => {
        const image = config.public.CompanyImage
        return image
    }

    const getCurrency = (currency: number): string => {
        const options: Intl.NumberFormatOptions = {
            style: 'decimal',
            minimumFractionDigits: 2
            //currency: 'THB'
        }
        const numberFormat = new Intl.NumberFormat('th-TH', options)
        const formattedCurrency = numberFormat.format(currency)
        console.log(formattedCurrency) // "$1,234.56"
        return formattedCurrency
    }
    const getStepMenuFromUri = (): number => {
        let step = 0
        if (process.client) {
            console.log(window.location.pathname)
            const menu = window.location.pathname

            switch (menu) {
                case '/order/compulsory/information': step = 1; break
                case '/order/compulsory/packages': step = 2; break
                case '/order/compulsory/placeorder': step = 3; break
            }

        }
        return step
    }

    const getPaging = (page: Paging): Paging => {
        const route = useRoute()
        if (route.params && route.params.currentPage) {
            if (isString(route.params.currentPage)) {
                page.Page = parseInt(route.params.currentPage ?? 0)
            }

        }

        return page
    }

    return {
        getCompanyImage,
        getCurrency,
        getToken,
        getStepMenuFromUri,
        getPaging
    }
}