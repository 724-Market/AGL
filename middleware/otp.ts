export default defineNuxtRouteMiddleware(() => {
    // Define and check 'isOTP' status
    const isOTP = useState('otp')

    // Abort navigation if 'isOTP' is false
    if (!isOTP.value) {
        return abortNavigation('ไม่มีสิทธิ์เข้าใช้งาน')
    }

    // Set 'isOTP' to false after check
    isOTP.value = false
})
