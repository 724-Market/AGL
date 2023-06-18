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

    const getCurrency = (currency: number): string => {
        const options: Intl.NumberFormatOptions = {
            style: 'decimal',
            minimumFractionDigits: 2
            //currency: 'THB'
        }
        const numberFormat = new Intl.NumberFormat('th-TH', options)
        const formattedCurrency = numberFormat.format(currency)
        return formattedCurrency
    }
    const getStepMenuFromUri = (): number => {
        let step = 0
        if (process.client) {
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
        if (route.query && route.query.currentPage) {
            if (isString(route.query.currentPage)) {
                page.Page = parseInt(route.query.currentPage ?? 0)
            }

        }
        console.log(page)
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