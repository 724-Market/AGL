import type { TableRequest } from "../entities/table-option";

class MapDataService {
    covertQueryStringToJsonHistory(query:string){
        const params = new URLSearchParams(query);
        const jsonData: { [key: string]: string } = {}; // Type annotation for jsonData
        for (const [key, value] of params) {
            jsonData[key] = value;
        }
    
        const jsonString = JSON.stringify(jsonData);
        const bodyObject = JSON.parse(jsonString)

        // console.log(jsonString)
        return bodyObject
    }
    getJsonTableHistory(bodyObject:any){
        
        const originalJSON = bodyObject
        const convertedJSON: TableRequest = {
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
          for (const key in originalJSON) {
            if (key.startsWith("Filter")) {
              const index = parseInt(key.match(/\[(\d+)\]/)![1]);
              const filterKey = key.replace(`[${index}]`, "");
              if (!convertedJSON.Filter[index]) {
                convertedJSON.Filter[index] = {
                  field: originalJSON[`Filter[${index}][field]`],
                  type:  originalJSON[`Filter[${index}][type]`],
                  value: originalJSON[`Filter[${index}][value]`],
                 
                };
              }
            }
          }
          
          // console.log(convertedJSON)

          return convertedJSON
    }
}
export default MapDataService;