import { useStoreInformation } from "~/stores/order/storeInformation";
import { storeToRefs } from "pinia";
export default defineNuxtRouteMiddleware(async (to) => {
    const step = useStateMenu().getStepMenuFromUriReq(to.path);
    const store = useStoreInformation();
    const { CarInfo } = storeToRefs(store);

    const publicRoutes = ['agent-order-compulsory-packages', 'agent-order-compulsory-placeorder', 'agent-order-compulsory-payment', 'agent-order-compulsory-summary'];
    if (!CarInfo.value.CarUse) {
        if(typeof to.name === 'string' && publicRoutes.includes(to.name)) {
            return navigateTo('/agent/order');
        }
    }
    
    if (step > 0) {
        const redirect = useStateMenu().checkStateMenu(step, to.path)
        if (redirect != "" && to.path != redirect) {
            abortNavigation();
            return navigateTo(redirect);
        }
    } 
})