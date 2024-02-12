import type { 
    CustomerAddressSaveReq,
    CustomerAddressSaveRes,
    CustomerIDReq,
    CustomerAddressListRes,
   } from "../entities/customer-entity";
  import type { IAPIResponse } from "../entities/useApi-response";
  
  class CustomerModule {
    private RESOURCE = '/Customer';
  
    async AddressSave(req: any) {
      return await useCallApi().apiRepository(`${this.RESOURCE}/address/save`, req)
    }
  
    async AddressList(req: CustomerIDReq): Promise<IAPIResponse<CustomerAddressListRes>> {
      return await useCallApi().apiRepository<CustomerAddressListRes>(`${this.RESOURCE}/address/list`, req)
    }
    
  }
  
  export default CustomerModule;