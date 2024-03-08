import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {

  const query = await getQuery(event)
  const config = useRuntimeConfig()

  const cookieAccessToken = getCookie(event,'access_token');
  let access_token = query.token != "" ? `Bearer ${query.token}` :""
  if (cookieAccessToken) {
    access_token =  `Bearer ${cookieAccessToken}`
  }

  const response = await $fetch(config.public.BaseUrl + query.url, {
    method: "GET",
    headers: {
      Authorization: access_token
    }
  })

  return response

})