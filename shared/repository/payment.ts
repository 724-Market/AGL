import { mock } from "node:test";
import { CalculateRequest, 
  CalculateResponse, 
  PaymentConfirmRequest, 
  PaymentConfirmResponse,
  PaymentSaveRequest, 
  PaymentSaveResponse ,
  PaymentGatewayRequest,
  PaymentGatewayResponse
} from "../entities/payment-entity";
import { IAPIResponse, IAPIPaymentGatewayResponse } from "../entities/useApi-response";

class PaymentModule {
  private RESOURCE = '/Payment';

  async get(req:CalculateRequest): Promise<IAPIResponse<CalculateResponse[]>> {
    return await useCallApi().apiRepository<CalculateResponse[]>(`${this.RESOURCE}/calculate`, req)
  }
  async calculate(req:CalculateRequest): Promise<IAPIResponse<CalculateResponse[]>> {
    return await useCallApi().apiRepository<CalculateResponse[]>(`${this.RESOURCE}/calculate`, req)
  }
  async save(req:PaymentSaveRequest): Promise<IAPIResponse<PaymentSaveResponse>> {
    return await useCallApi().apiRepository<PaymentSaveResponse>(`${this.RESOURCE}/save`, req)
  }
  async confirm(req:PaymentConfirmRequest): Promise<IAPIResponse<PaymentConfirmResponse[]>> {
    return await useCallApi().apiRepository<PaymentConfirmResponse[]>(`${this.RESOURCE}/confirm`, req)
  }
  async gateway(req:PaymentGatewayRequest): Promise<IAPIPaymentGatewayResponse<PaymentGatewayResponse>> {
    return await useCallApi().postGateway<PaymentGatewayResponse>(`https://pgc.724insure.net/api/v1/payment`, req)
  }
}
  
export default PaymentModule;