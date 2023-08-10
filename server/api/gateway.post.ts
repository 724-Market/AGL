
export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const config = useRuntimeConfig()
  
  
    const response = await $fetch(config.public.BasePaymentGateway + body.URL, {
      method: "POST",
      headers: {
        Authorization: config.public.GatewayToken != "" ? config.public.GatewayToken : ""
      },
      body: body
    })
  
    return response
  
  })