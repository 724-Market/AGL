import type { CalculateRequest, 
  CalculateResponse, 
  PaymentConfirmRequest, 
  PaymentConfirmResponse,
  PaymentSaveRequest, 
  PaymentSaveResponse ,
  PaymentGatewayRequest,
  PaymentGatewayResponse,
  PaymentGetRequest,
  PaymentGetResponse
} from "../entities/payment-entity";
import type { IAPIResponse, IAPIPaymentGatewayResponse } from "../entities/useApi-response";

class PaymentModule {
  private RESOURCE = '/Payment';

  async calculate(req:CalculateRequest): Promise<IAPIResponse<CalculateResponse[]>> {
    return await useCallApi().apiRepository<CalculateResponse[]>(`${this.RESOURCE}/calculate`, req)
  }
  async get(req:PaymentGetRequest): Promise<IAPIResponse<PaymentGetResponse[]>> {
    return await useCallApi().apiRepository<PaymentGetResponse[]>(`${this.RESOURCE}/get`, req)
  }
  async save(req:PaymentSaveRequest): Promise<IAPIResponse<PaymentSaveResponse>> {
    return await useCallApi().apiRepository<PaymentSaveResponse>(`${this.RESOURCE}/save`, req)
  }
  async confirm(req:PaymentConfirmRequest): Promise<IAPIResponse<PaymentConfirmResponse[]>> {
    return await useCallApi().apiRepository<PaymentConfirmResponse[]>(`${this.RESOURCE}/confirm`, req)
  }
  async gateway(req:PaymentGatewayRequest): Promise<IAPIPaymentGatewayResponse<PaymentGatewayResponse>> {
    return await useCallApi().postGateway<PaymentGatewayResponse>(req)
  }
  async paymentGateway(req: any) {
    return await useCallApi().postPaymentGateway(req)
  }
}
  
export default PaymentModule;