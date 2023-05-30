import { storeToRefs } from "pinia";
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

    return {
        getCompanyImage,
        getCurrency,
        getToken
    }
}