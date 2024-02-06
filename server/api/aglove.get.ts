
export default defineEventHandler(async (event) => {

  console.log('aglove.get',event)
  const query = await getQuery(event)
  const config = useRuntimeConfig()


  const response = await $fetch(config.public.BaseUrl + query.url, {
    method: "GET",
    headers: {
      Authorization: query.token != "" ? "Bearer " + query.token : ""
    }
  })

  return response

})