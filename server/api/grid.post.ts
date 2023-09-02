


export default defineEventHandler(async (event) => {

    

    const body = await readBody(event)
    const config = useRuntimeConfig()
    console.log('event=', event)
    console.log('body=', body)
    //console.log('body=',body)
    const params = new URLSearchParams(body);
    const jsonData: { [key: string]: string } = {}; // Type annotation for jsonData
    for (const [key, value] of params) {
        jsonData[key] = value;
    }

    const jsonString = JSON.stringify(jsonData);
    const bodyObject = JSON.parse(jsonString)
    const originalJSON = bodyObject
    const convertedJSON: any = {
        draw: parseInt(originalJSON.draw),
        columns: [],
        order: [
          {
            column: parseInt(originalJSON["order[0][column]"]),
            dir: originalJSON["order[0][dir]"],
          },
        ],
        Filter:[],
        start: parseInt(originalJSON.start),
        length: parseInt(originalJSON.length),
        search: {
          value: originalJSON["search[value]"],
          regex: originalJSON["search[regex]"],
        },
      };
    
      for (const key in originalJSON) {
        if (key.startsWith("columns")) {
          const index = parseInt(key.match(/\[(\d+)\]/)![1]);
          const columnKey = key.replace(`[${index}]`, "");
          if (!convertedJSON.columns[index]) {
            convertedJSON.columns[index] = {
              data: originalJSON[key],
              name: "",
              searchable: originalJSON[`columns[${index}][searchable]`],
              orderable: originalJSON[`columns[${index}][orderable]`],
              search: {
                value: originalJSON[`columns[${index}][search][value]`],
                regex: originalJSON[`columns[${index}][search][regex]`],
              },
            };
          }
        }
      }
      console.log(jsonString)
      console.log(convertedJSON)
    const mockRequest = {
        "draw": 1,
        "columns": [
            {
                "data": "Ind",
                "name": "",
                "searchable": true,
                "orderable": false,
                "search": {
                    "value": "",
                    "regex": false
                }
            },
            {
                "data": "CreateDate",
                "name": "",
                "searchable": true,
                "orderable": true,
                "search": {
                    "value": "",
                    "regex": false
                }
            }
        ],
        "order": [
            {
                "column": 1,
                "dir": "desc"
            }
        ],
        "start": 0,
        "length": 20,
        "search": {
            "value": "",
            "regex": false
        },
        "Filter": [
            {
                "field": "Status",
                "type": "LIKE",
                "value": "Process"
            },
            {
                "field": "CreateDate",
                "type": "DATE_GTE",
                "value": "2023-05-30"
            },
            {
                "field": "CreateDate",
                "type": "DATE_LTE",
                "value": "2023-08-30"
            }
        ],
        URL: bodyObject.URL,
        Token: bodyObject.Token
    }

    
    const response = await $fetch(config.public.BaseUrl + bodyObject.URL, {
        method: "POST",
        headers: {
            Authorization: bodyObject.Token != "" ? "Bearer " + bodyObject.Token : ""
        },
        body: convertedJSON
    })

    return response

})