// import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

class PaymentNoticeService {
    private hubConnection!: signalR.HubConnection;
    
    async connect() {
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
    
  
    // async sendMessage(message) {
    //   if (!this.connection) {
    //     throw new Error('SignalR not connected');
    //   }
  
    //   await this.connection.invoke('SendMessage', message);
    // }
}

export default PaymentNoticeService;