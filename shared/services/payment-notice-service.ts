// import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { NoticePaymentRequest, NoticePayment, PaymentGatewayResponse }  from "../entities/payment-entity";
import { storeToRefs } from "pinia";
import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";

const noticePayment = useStoreNoticePayment();

const paymentGateway = useStorePaymentGateway();
const { PaymenGatewaytInfo } = storeToRefs(paymentGateway);

class PaymentNoticeService {
    private hubConnection!: signalR.HubConnection;
    private paymenGatewaytInfo: globalThis.Ref<PaymentGatewayResponse | undefined> = ref()
    private router = useRouter();
    
    async connect(req:NoticePaymentRequest) {
        let url = `https://api-iom-signalr.724insure.net/SignalRHub?ClientID=${req.ClientID}&DeviceID=${req.DeviceID}&ReferenceID=${req.ReferenceID}&UserID=${req.UserID}&GroupType=${req.GroupType}&AccessToken=${req.AccessToken}`
        this.hubConnection = new signalR.HubConnectionBuilder()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl(`https://api-iom-signalr.724insure.net/SignalRHub`, {
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

    async RequestUpdateTopUpPayment() {
        this.hubConnection.on('RequestUpdateTopUpPayment', (notice:NoticePayment) => {
          console.log(notice);
          if(notice.data) {
            if(PaymenGatewaytInfo.value.refno1 == notice.data.PaymentNo) {
                noticePayment.setNoticePayment(notice.data)
                this.router.push("/order/compulsory/thanks")
            }
          }
        });
    }

    async RequestUpdateOrderPayment() {
        this.hubConnection.on('RequestUpdateOrderPayment', (notice:NoticePayment) => {
          console.log(notice);
          if(notice.data) {
            if(PaymenGatewaytInfo.value.refno1 == notice.data.PaymentNo) {
                noticePayment.setNoticePayment(notice.data)
                this.router.push("/order/compulsory/thanks")
            }
          }
        });
    }
}

export default PaymentNoticeService;