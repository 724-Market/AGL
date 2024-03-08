
export default defineEventHandler(async (event) => {

  console.log('aglove.get',event)
  const query = await getQuery(event)
  const config = useRuntimeConfig()

  const cookieAccessToken = getCookie(event,'access_token');
  let access_token = query.token != "" ? "Bearer " + query.token : ""
  if (cookieAccessToken) {
    access_token = cookieAccessToken
  }

  const response = await $fetch(config.public.BaseUrl + query.url, {
    method: "GET",
    headers: {
      Authorization: access_token
    }
  })

  return response

})