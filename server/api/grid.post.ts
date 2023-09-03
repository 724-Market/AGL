import MapDataService from "~/shared/services/mapdata-service";
export default defineEventHandler(async (event) => {
    const mapData = new MapDataService();
    const body = await readBody(event)
    const config = useRuntimeConfig()
    console.log('event=', event)
    console.log('body=', body)
    //console.log('body=',body)

    const bodyObject = mapData.covertQueryStringToJsonHistory(body)
    
    const originalJSON = bodyObject
    const convertedJSON = mapData.getJsonTableHistory(originalJSON)
    // const mockRequest = {
    //     "draw": 1,
    //     "columns": [
    //         {
    //             "data": "Ind",
    //             "name": "",
    //             "searchable": true,
    //             "orderable": false,
    //             "search": {
    //                 "value": "",
    //                 "regex": false
    //             }
    //         },
    //         {
    //             "data": "CreateDate",
    //             "name": "",
    //             "searchable": true,
    //             "orderable": true,
    //             "search": {
    //                 "value": "",
    //                 "regex": false
    //             }
    //         }
    //     ],
    //     "order": [
    //         {
    //             "column": 1,
    //             "dir": "desc"
    //         }
    //     ],
    //     "start": 0,
    //     "length": 20,
    //     "search": {
    //         "value": "",
    //         "regex": false
    //     },
    //     "Filter": [
    //         {
    //             "field": "Status",
    //             "type": "LIKE",
    //             "value": "Process"
    //         },
    //         {
    //             "field": "CreateDate",
    //             "type": "DATE_GTE",
    //             "value": "2023-05-30"
    //         },
    //         {
    //             "field": "CreateDate",
    //             "type": "DATE_LTE",
    //             "value": "2023-08-30"
    //         }
    //     ],
    //     URL: bodyObject.URL,
    //     Token: bodyObject.Token
    // }

    
    const response = await $fetch(config.public.BaseUrl + bodyObject.URL, {
        method: "POST",
        headers: {
            Authorization: bodyObject.Token != "" ? "Bearer " + bodyObject.Token : ""
        },
        body: convertedJSON
    })

    return response

})