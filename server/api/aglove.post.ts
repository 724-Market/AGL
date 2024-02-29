
export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()

  let renewToken = "";
  if (body.refreshToken && body.Token && body.refreshToken !="") {
    console.log('test token renew', body.refreshToken)
    // const req = {
    //   RefreshToken: body.refreshToken
    // }
    // const baseurl = "/Session/refresh-token/get";
    // const response = await $fetch(config.public.BaseUrl + baseurl, {
    //   method: "POST",
    //   headers: {
    //     Authorization: body.Token != "" ? "Bearer " + body.Token : ""
    //   },
    //   body: req
    // })
    renewToken = body.refreshToken
  }


  const response = await $fetch(config.public.BaseUrl + body.URL, {
    method: "POST",
    headers: {
      Authorization: body.Token != "" ? "Bearer " + body.Token : ""
    },
    body: body
  })

  const data = {
    data: response,
    renewToken: renewToken
  }
  return data

})