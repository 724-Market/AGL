
import { storeToRefs } from "pinia";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";
import type { StateOrder } from "~/shared/entities/state-entity";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";

export default () => {
    const getStepMenuFromUriReq = (path: string): number => {
        let step = 0

        switch (path) {
            case '/order/compulsory/information': step = 1; break
            case '/order/compulsory/packages': step = 2; break
            case '/order/compulsory/placeorder': step = 3; break
            case '/order/compulsory/payment': step = 4; break
            case '/order/compulsory/summary': step = 5; break
        }
        return step
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
    const getStepMenuFromNumber = (step: number): string => {
        let url = ""
        switch (step) {
            case 1: url = '/order/compulsory/information'; break
            case 2: url = '/order/compulsory/packages'; break
            case 3: url = '/order/compulsory/placeorder'; break
            case 4: url = '/order/compulsory/payment'; break
            case 5: url = '/order/compulsory/summary'; break
        }
        return url
    }

    const checkStateMenu = (step: number,url:string):string => {
        let validate = "";
        const router = useRouter();
        const store = useStoreStateOrder();
        const { StateInfo } = storeToRefs(store);

        if (StateInfo && StateInfo.value) {
            if(step<StateInfo.value.state)
            {
                validate = "";
            }
            else if (step != StateInfo.value.state) {
                if (process.client) {
                    const redirect = getStepMenuFromNumber(StateInfo.value.state)
                    if (url != redirect) {
                        validate = redirect
                    }
                    else{
                        validate = ""
                    }
                }
            }
        }
        else {
            setStateMenu(1)
            validate = "";
        }

        return validate
    }
    const setStateMenu = (step: number) => {
        const store = useStoreStateOrder();
        const req: StateOrder = {
            state: step
        }
        switch (step) {
            case 1:
            case 2:
                store.setState(req)
                //const { CarInfo } = storeToRefs(store);
                break;
            case 3: {
                const order = useStorePlaceorder();
                const { OrderNo } = storeToRefs(order);
                req.orderNo = OrderNo ? OrderNo.value : undefined
                store.setState(req);
                break;
            }
            case 4:
            case 5: {
                const order = useStorePlaceorder();
                const payment = useStorePaymentGet();
                const { OrderNo } = storeToRefs(order);
                const { PaymentNo } = storeToRefs(payment);
                req.orderNo = OrderNo?.value
                req.paymentNo = PaymentNo.value
                store.setState(req);
                break;
            }

        }
    }
    return {
        checkStateMenu,
        setStateMenu,
        getStepMenuFromUri,
        getStepMenuFromUriReq
    }
}