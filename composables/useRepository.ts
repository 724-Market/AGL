import AgentModule from "~/shared/repository/agent";
import DeliveryModule from "~/shared/repository/delivery";
import MasterModule from "~/shared/repository/master"
import OrderModule from "~/shared/repository/order";
import SessionModule from "~/shared/repository/session";
import FileModule from "~/shared/repository/file";
import PledgeModule from "~/shared/repository/pledge";
import PaymentModule from "~/shared/repository/payment";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    master: MasterModule,
    delivery: DeliveryModule,
    order: OrderModule,
    agent: AgentModule,
    session: SessionModule,
    file: FileModule,
    payment: PaymentModule
    pledge:PledgeModule
}


export default  () => {
  
    const modules: IApiInstance = {
        master: new MasterModule(),
        delivery: new DeliveryModule(),
        order: new OrderModule(),
        agent: new AgentModule(),
        session: new SessionModule(),
        file: new FileModule(),
        pledge:new PledgeModule(),
        payment: new PaymentModule()
    };

    return modules
}