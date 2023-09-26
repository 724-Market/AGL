// export default defineNuxtRouteMiddleware((to, from) => { })
// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('From auth middleware',to,from)
    const token = await useUtility().getToken();
    if ((!token || token == "") && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');

    }
})