import AgentModule from "~/shared/repository/agent";
import DeliveryModule from "~/shared/repository/delivery";
import MasterModule from "~/shared/repository/master"
import OrderModule from "~/shared/repository/order";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
    master: MasterModule,
    delivery: DeliveryModule,
    order: OrderModule,
    agent: AgentModule,
}


export default () => {
    const modules: IApiInstance = {
        master: new MasterModule(),
        delivery: new DeliveryModule(),
        order: new OrderModule(),
        agent: new AgentModule()
    };

    return modules
}