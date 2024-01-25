import AgentModule from "~/shared/repository/agent";
import BackendPaperModule from "~/shared/repository/backendpaper";
import CustomerModule from "~/shared/repository/customer";
import DeliveryModule from "~/shared/repository/delivery";
import FileModule from "~/shared/repository/file";
import MasterModule from "~/shared/repository/master"
import OrderModule from "~/shared/repository/order";
import PaperModule from "~/shared/repository/paper";
import PaymentModule from "~/shared/repository/payment";
import PledgeModule from "~/shared/repository/pledge";
import SessionModule from "~/shared/repository/session";
import TrackModule from "~/shared/repository/track";
import UserModule from "~/shared/repository/user";
import AffiliateModule from "~/shared/repository/affiliate";
// import PaymentNoticeService from "~/shared/services/payment-notice-service";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    agent: AgentModule,
    backendpaper: BackendPaperModule,
    customer: CustomerModule,
    delivery: DeliveryModule,
    file: FileModule,
    master: MasterModule,
    order: OrderModule,
    paper: PaperModule,
    payment: PaymentModule,
    pledge:PledgeModule,
    session: SessionModule,
    track: TrackModule,
    user:UserModule,
    affiliate:AffiliateModule,
    // paymentNotice:PaymentNoticeService
}


export default  () => {
  
    const modules: IApiInstance = {
        agent: new AgentModule(),
        backendpaper: new BackendPaperModule(),
        customer: new CustomerModule(),
        delivery: new DeliveryModule(),
        file: new FileModule(),
        master: new MasterModule(),
        order: new OrderModule(),
        paper: new PaperModule(),
        payment: new PaymentModule(),
        pledge:new PledgeModule(),
        session: new SessionModule(),
        track: new TrackModule(),
        user: new UserModule(),
        affiliate: new AffiliateModule(),
        // paymentNotice: new PaymentNoticeService(),
    };

    return modules
}