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
  }
  
  export default PaymentModule;