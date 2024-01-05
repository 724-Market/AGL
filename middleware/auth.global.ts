export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('From auth middleware', to, from)
    const token = await useUtility().getToken();
    if ((!token || token == "") && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');

    }
    else {
        const path = to.path
        const step = useStateMenu().getStepMenuFromUriReq(path);
        console.log(step)
        if (step > 0) {
            const redirect = useStateMenu().checkStateMenu(step, path)
            if (redirect != "" && path!=redirect) {
                abortNavigation();
                return navigateTo(redirect);
            }
        }
    }
})