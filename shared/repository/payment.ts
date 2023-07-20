import { mock } from "node:test";
import { CalculateRequest, CalculateResponse, PaymentConfirmRequest, PaymentSaveRequest, PaymentSaveResponse } from "../entities/payment-entity";
import { IAPIResponse } from "../entities/useApi-response";

class PaymentModule {
  private RESOURCE = '/Payment';

  async calculate(req:CalculateRequest): Promise<IAPIResponse<CalculateResponse[]>> {
    return await useCallApi().apiRepository<CalculateResponse[]>(`${this.RESOURCE}/calculate`, req)
  }
  async save(req:PaymentSaveRequest): Promise<IAPIResponse<PaymentSaveResponse>> {
    return await useCallApi().apiRepository<PaymentSaveResponse>(`${this.RESOURCE}/save`, req)
  }
  async confirm(req:PaymentConfirmRequest): Promise<IAPIResponse<PaymentSaveResponse>> {
    return await useCallApi().apiRepository<PaymentSaveResponse>(`${this.RESOURCE}/confirm`, req)
  }
  // async calculateMock(req:CalculateRequest): Promise<IAPIResponse<CalculateResponse[]>> {
  //   let mock: CalculateResponse[] = [
  //     {
  //       Total: 645.21,
  //       DebitCredit: {
  //         // ZeroCommission : {
  //         //   TotalDiscount : 480.64,
  //         //   Max: 164.57,
  //         //   Fee :{
  //         //     Type: "Percent",
  //         //     Price: 2,
  //         //     Amount: 9.43,			
  //         //   }
  //         // },
  //         // SomeCommission : {
  //         //   TotalDiscount : 492.88,
  //         //   Max: 152.33,
  //         //   Fee :{
  //         //     Type: "Percent",
  //         //     Price: 2,
  //         //     Amount: 9.67,			
  //         //   }
  //         // },
  //         FullCommission : {
  //           TotalDiscount : 645.21,
  //           Max: 0,
  //           Fee :{
  //             Type: "Percent",
  //             Price: 2,
  //             Amount: 9.43,		
  //           }
  //         },
  //         // Paper: null
  //       },
  //       BillPayment: {
  //         ZeroCommission : {
  //           TotalDiscount : 474.21,
  //           Max: 171,
  //           Fee :{
  //             Type: "Actual",
  //             Price: 3,
  //             Amount: 3,			
  //           }
  //         },
  //         SomeCommission : {
  //           TotalDiscount : 486.21,
  //           Max: 159,
  //           Fee :{
  //             Type: "Actual",
  //             Price: 3,
  //             Amount: 3,			
  //           }
  //         },
  //         FullCommission : {
  //           TotalDiscount : 645.21,
  //           Max: 0,
  //           Fee :{
  //             Type: "Actual",
  //             Price: 3,
  //             Amount: 3,			
  //           }
  //         },
  //         // Paper: null
  //       },
  //       Pledge: {
  //         // ZeroCommission : {
  //         //   TotalDiscount : 474.21,
  //         //   Max: 174,
  //         //   Fee :{
  //         //     Type: "Actual",
  //         //     Price: 0,
  //         //     Amount: 0,			
  //         //   }
  //         // },
  //         SomeCommission : {
  //           TotalDiscount : 483.21,
  //           Max: 162,
  //           Fee :{
  //             Type: "Actual",
  //             Price: 0,
  //             Amount: 0,			
  //           }
  //         },
  //         FullCommission : {
  //           TotalDiscount : 645.21,
  //           Max: 0,
  //           Fee :{
  //             Type: "Actual",
  //             Price: 0,
  //             Amount: 0,			
  //           }
  //         },
  //         Paper: {
  //           Quantity: 5,
  //           ProductID: "21F847D85C354C2E9F0EB0E61CE3152B",
  //           Brand: "TMW",
  //           Category: "Insurance",
  //           SubCategory: "Compulsory",
  //           Company: "TMW",
  //           Type: "Policy Paper",
  //           Model: 500,
  //           Name: "Compulsory Policy Paper 500",
  //           Price: 500
  //         }
  //       },
  //       DeliveryFee: []
  //     }
  //   ]
  //   let res = await useCallApi().apiRepository<any[]>(`${this.RESOURCE}/calculate`, req)
  //   res.apiResponse.Data = mock
  //   return res
  // }
}
  
export default PaymentModule;