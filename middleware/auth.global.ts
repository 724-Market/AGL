export default defineNuxtRouteMiddleware(async (to) => {
    // Retrieve the authentication token
    const token = await useUtility().getToken()

    // Define routes that are publicly accessible
    const publicRoutes = ['index', 'login', 'register', 'register-form']

    // Check token existence and validate access to private routes
    if (!token && typeof to.name === 'string' && !publicRoutes.includes(to.name)) {
        // Prevent navigation
        abortNavigation()

        // Redirect to the login page and set a query parameter to redirect back after successful login
        return navigateTo(`/login?redirectTo=${to.path}`)
    }
})