import { IAPIResponse } from "../entities/useApi-response";
import { Paper, PaperRequest } from "../entities/packageList-entity";
import {  CreditBalanceResponse, CreditHistoryPaymentAdd, CreditOrderPaymentCreateRequest, CreditOrderPaymentCreateResponse, CreditOrderPaymentGetRequest, PaymentFeeLimitRequest, PaymentFeeLimitResponse } from "../entities/pledge-entity";
import { PaymentGetRequest, PaymentGetResponse } from "../entities/payment-entity";

class PledgeModule {
  private RESOURCE = '/Pledge';

  async paperonhand(req:PaperRequest): Promise<IAPIResponse<Paper[]>> {
    return await useCallApi().apiRepository<Paper[]>(`${this.RESOURCE}/paperonhand/balance/get`, req)
  }
  async creditBalance(): Promise<IAPIResponse<CreditBalanceResponse[]>> {
    return await useCallApi().apiRepository<CreditBalanceResponse[]>(`${this.RESOURCE}/credit/balance/get`, {})
  }
  async creditHistoryPaymentAddList(): Promise<IAPIResponse<CreditHistoryPaymentAdd>> {
    return await useCallApi().apiRepository<CreditHistoryPaymentAdd>(`${this.RESOURCE}/credit/history/payment-add/list`, {})
  }
  async creditorderPaymentCreate(req:CreditOrderPaymentCreateRequest): Promise<IAPIResponse<CreditOrderPaymentCreateResponse[]>> {
    return await useCallApi().apiRepository<CreditOrderPaymentCreateResponse[]>(`${this.RESOURCE}/creditorder/with-payment/create`, req)
  }
  async creditorderPaymentGet(req:PaymentGetRequest): Promise<IAPIResponse<PaymentGetResponse[]>> {
    return await useCallApi().apiRepository<PaymentGetResponse[]>(`${this.RESOURCE}/creditorder/payment/get`, req)
  }
  async paymentFeeLimit(req:PaymentFeeLimitRequest): Promise<IAPIResponse<PaymentFeeLimitResponse[]>> {
    return await useCallApi().apiRepository<PaymentFeeLimitResponse[]>(`${this.RESOURCE}/payment/fee/limit/get`, req)
  }
}

export default PledgeModule;