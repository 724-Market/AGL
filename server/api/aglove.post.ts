
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const config = useRuntimeConfig()


  const response = await $fetch(config.public.BaseUrl + body.URL, {
    method: "POST",
    headers: {
      Authorization: body.Token != "" ? "Bearer " + body.Token : ""
    },
    body: body
  })

  return response

})