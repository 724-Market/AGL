export default defineNuxtRouteMiddleware(async (to) => {
  // Retrieve the authentication token
  const token = await useUtility().getToken()

  // Define routes that are publicly accessible
  const publicRoutes = [
    'index', 'login', 'forgot-password', 'otp',
    'agent', 'agent-login', 'agent-forgot-password', 'agent-otp', 'agent-set-password',
    'register', 'register-id', 'register-form', 'register-otp', 'register-set-password',
    'session-expired'
  ]

  // Check token existence and validate access to private routes
  if (!token && typeof to.name === 'string' && !publicRoutes.includes(to.name)) {
    // Prevent navigation
    abortNavigation()

    return navigateTo('/login')
    // Redirect to the login page and set a query parameter to redirect back after successful login
    // return navigateTo(`/login?redirectTo=${to.path}`)
  }
  else if(token && typeof to.name === 'string' && publicRoutes.includes(to.name)) {
    return navigateTo('/main')
  }

  if (to.path === '/login') {
    // setting the redirect
    return navigateTo('/agent')
  }

})