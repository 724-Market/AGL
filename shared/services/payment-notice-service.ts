// import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { storeToRefs } from "pinia";
import { NoticePaymentRequest, NoticePaymentData, PaymentGatewayResponse, PaymentGetRequest }  from "../entities/payment-entity";
import { useStorePaymentGet } from '~/stores/order/storePaymentGet';
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";

class PaymentNoticeService {
    private hubConnection!: signalR.HubConnection;
    private router = useRouter();
    
    async connect(req:NoticePaymentRequest) {
        const url = `https://api-iom-signalr.724insure.net/SignalRHub?ClientID=${req.ClientID}&DeviceID=${req.DeviceID}&ReferenceID=${req.ReferenceID}&UserID=${req.UserID}&GroupType=${req.GroupType}&AccessToken=${req.AccessToken}`
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
                console.log('Server has disconnected');
            }
        );
    }

    async disconnect() {
       this.hubConnection.stop()
    }

    async RequestUpdateTopUpPayment(PaymenGatewaytInfo:PaymentGatewayResponse) {
        this.hubConnection.on('RequestUpdateTopUpPayment', async (message:string, data:string) => {
          console.log(message, data);
          if(data) {
            const res: NoticePaymentData = JSON.parse(data)
            console.log(res)
            if(PaymenGatewaytInfo.refno2 == res.PaymentNo) {
                this.router.push('#topup_thanks?PaymentNo=' + res.PaymentNo)
            }
          }
        });
    }

    async RequestUpdateOrderPayment(PaymenGateway:PaymentGatewayResponse) {
        this.hubConnection.on('RequestUpdateOrderPayment', async (message:string, data:string) => {
          console.log(message, data);
          if(data) {
            const res: NoticePaymentData = JSON.parse(data)
            const paymentGateway = useStorePaymentGateway();
            const { PaymenGatewaytInfo } = storeToRefs(paymentGateway);
            // const PaymenGatewaytInfo = JSON.parse(sessionStorage.getItem("useStoreInformation") || "") as PaymentGatewayResponse | undefined;
            if(PaymenGatewaytInfo.value && PaymenGatewaytInfo.value.refno2 != '' && PaymenGatewaytInfo.value.refno2 == res.PaymentNo) {
                const paymentGat = useStorePaymentGet();
                const req: PaymentGetRequest = {
                    PaymentNo: res.PaymentNo,
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