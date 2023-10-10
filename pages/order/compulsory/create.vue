<template>
    <NuxtLayout>
    </NuxtLayout>
</template>

<script lang="ts" setup>

import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";
import { useStorePayment } from "~/stores/order/storePayments";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";


// Define Store
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const placeorder = useStorePlaceorder();
const information = useStoreInformation();
const packages = useStorePackage();
const packageList = useStorePackageList();
const orderSummary = useStoreOrderSummary();
const { OrderSummaryInfo } = storeToRefs(orderSummary);
const payment = useStorePayment();
const paymentGateway = useStorePaymentGateway();

const paymentGat = useStorePaymentGet();
const { PaymentGetInfo } = storeToRefs(paymentGat);

const state = useStoreStateOrder()
const router = useRouter();

const onLoad = onMounted(async () => {
    if (AuthenInfo.value) {
        await clearStore()
        router.push("/order/compulsory/information");
    } else {
        router.push("/login");
    }
});

const clearStore = async () => {
    placeorder.clearOrder()
    information.clearInformation()
    orderSummary.clearOrderSummary()
    packages.clearPackage()
    packageList.clearPackageList()
    payment.clearPayment()
    paymentGateway.clearPaymenGateway()
    paymentGat.clearPaymentGet()
    state.clearState();
};

</script>
