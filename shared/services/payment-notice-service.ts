// import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { NoticePaymentRequest, NoticePayment, PaymentGatewayResponse, PaymentGetRequest }  from "../entities/payment-entity";
// Pinia
import { createPinia } from 'pinia'

// Pinia persist plugin
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";

class PaymentNoticeService {
    private hubConnection!: signalR.HubConnection;
    // private paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref()
    private router = useRouter();
    
    async connect(req:NoticePaymentRequest) {
        let url = `https://api-iom-signalr.724insure.net/SignalRHub?ClientID=${req.ClientID}&DeviceID=${req.DeviceID}&ReferenceID=${req.ReferenceID}&UserID=${req.UserID}&GroupType=${req.GroupType}&AccessToken=${req.AccessToken}`
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl(`${url}`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                // accessTokenFactory: () => "token"
            })
            .withAutomaticReconnect([0, 1000, 5000])
            // .withAutomaticReconnect([0, 1000, 5000, null])
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('SignalR PayMent Connection started'))
            .catch((err) => console.log('Error while starting connection: ' + err));

        this.hubConnection
            .onclose(function() {
                alert('Server has disconnected');
            }
        );
    }

    async RequestUpdateTopUpPayment(PaymenGatewaytInfo:PaymentGatewayResponse) {
        this.hubConnection.on('RequestUpdateTopUpPayment', async (notice:any) => {
          console.log(notice);
          if(notice.data) {
            if(PaymenGatewaytInfo.refno1 == notice.data.PaymentNo) {
                // const noticePayment = useStoreNoticePayment();
                // noticePayment.setNoticePayment(notice.data)
                // this.router.push("/order/compulsory/thanks")

                const paymentGat = useStorePaymentGet();
                const req: PaymentGetRequest = {
                    PaymentNo: notice.data.PaymentNo,
                };
                const response = await useRepository().payment.get(req);
                if(response.apiResponse.Status &&  response.apiResponse.Status == "200" && response.apiResponse.Data) {
                    paymentGat.setPaymentGet(response.apiResponse.Data[0])
                    this.router.push('/order/compulsory/thanks')
                }
            }
          }
        });
    }

    async RequestUpdateOrderPayment(PaymenGatewaytInfo:PaymentGatewayResponse) {
        this.hubConnection.on('RequestUpdateOrderPayment', async (notice:any) => {
          console.log(notice);
          if(notice.data) {
            if(PaymenGatewaytInfo.refno1 == notice.data.PaymentNo) {
                // const noticePayment = useStoreNoticePayment();
                // noticePayment.setNoticePayment(notice.data)
                // this.router.push("/order/compulsory/thanks")

                const paymentGat = useStorePaymentGet();
                const req: PaymentGetRequest = {
                    PaymentNo: notice.data.PaymentNo,
                };
                const response = await useRepository().payment.get(req);
                if(response.apiResponse.Status &&  response.apiResponse.Status == "200" && response.apiResponse.Data) {
                    paymentGat.setPaymentGet(response.apiResponse.Data[0])
                    this.router.push('/order/compulsory/thanks')
                }
            }
          }
        });
    }
}

export default PaymentNoticeService;