import { getCookie, setCookie } from 'h3'

interface DecodedToken {
    exp: number;
    [key: string]: any;
}
export default defineEventHandler(async (event) => {
    const { res } = event;

  // Construct a cookie string
  const cookieValue = 'your_cookie_value';
  const maxAge = 60 * 60 * 24 * 1; // 1 week in seconds
  const cookieString = `testCookie=${cookieValue}; Max-Age=${maxAge}; Path=/;`;

  // Set the cookie in the response header
  res.setHeader('Set-Cookie', cookieString);
    const url = getRequestURL(event)

    console.log('middleware url: ' + url.pathname)

    if (url.pathname.includes('/api/')) {
        const req = await readBody(event)
        if (!req.URL.includes("Session/token/get")) {
            const config = useRuntimeConfig()
            // Function to decode and check token expiration
            const isTokenExpired = (token: string) => {
                const payloadBase64 = token.split('.')[1];
                const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
                const decoded: DecodedToken = JSON.parse(decodedJson);
                const expDate = new Date(decoded.exp * 1000);
                return expDate < new Date();
            };

            const accessToken = getCookie(event, 'access_token');
            const refresh_token = getCookie(event, 'refresh_token');
            console.log(accessToken, refresh_token)
            // Redirect to login if no access or refresh token
            if (!accessToken || !refresh_token) {
                //sendRedirect(event, '/login');
                return;
            }
            else {
                // If access token is expired but refresh token is not, try to get a new access token
                if (isTokenExpired(accessToken)) {
                    try {
                        const req = {
                            RefreshToken: refresh_token
                        }
                        const baseurl = "/Session/refresh-token/get";
                        const response = await fetch(config.public.BaseUrl + baseurl, {
                            method: "POST",
                            headers: {
                                Authorization: accessToken != "" ? "Bearer " + accessToken : ""
                            },
                            body: JSON.stringify(req)
                        })
                        if (response.ok) {
                            const data = await response.json();
                            console.log('data.access_token', data.access_token)
                            console.log('data.refresh_token', data.refresh_token)
                            const cookieToken = `access_token=${data.access_token}; Max-Age=${maxAge}; Path=/;`;
                            const cookieRefreshToken = `refresh_token=${data.refresh_token}; Max-Age=${maxAge}; Path=/;`;
                            // Set the cookie in the response header
                            res.setHeader('Set-Cookie', [cookieToken,cookieRefreshToken]);
                            
                        }



                    } catch (error) {
                        // Error handling, e.g., redirect to login if refresh token is invalid
                        //sendRedirect(event, '/login');
                        return
                    }
                }
            }
        }
    }

});