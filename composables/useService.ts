import PaymentNoticeService from "~/shared/services/payment-notice-service";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    paymentNotice:PaymentNoticeService
}

export default  () => {
  
    const services: IApiInstance = {
        paymentNotice: new PaymentNoticeService(),
    };

    return services
}