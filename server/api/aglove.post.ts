import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()

  const cookieAccessToken = getCookie(event,'access_token');
  let access_token = body.Token
  if (cookieAccessToken) {
    access_token = cookieAccessToken
  }

  const response = await $fetch(config.public.BaseUrl + body.URL, {
    method: "POST",
    headers: {
      Authorization: access_token != "" ? "Bearer " + access_token : ""
    },
    body: body
  })
  
  return response

})