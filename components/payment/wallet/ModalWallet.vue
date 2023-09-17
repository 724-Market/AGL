<template>
  <dialog id="wallet-dialog" v-show="_show">
    <div class="dialog-card">
      <div class="card-header">
        <button
          type="button"
          class="btn btn-close btn-close-wallet"
          @click="closeModal(false)"
        >
          ปิด
        </button>
      </div>

      <div
        :class="isStep1 ? 'card-body pledge-step-1 is-active' : 'card-body pledge-step-1'"
        
      >
        <FormKit
          type="form"
          :actions="false"
          id="form-pledge"
          form-class="form-pledge form-theme"
          :incomplete-message="false"
          v-if="paymentList"
        >
          <figure class="dialog-icon"><i class="fa-regular fa-wallet"></i></figure>
          <h5>กรอกจำนวนเงินที่ต้องการเติม</h5>
          <div class="form-hide-label topup-value">
            <FormKit
              type="number"
              label="จำนวนเงินที่ต้องการเติม"
              name="amount"
              :validation="`required|number|min:${paymentList.Min}|max:${paymentList.Max}`"
              :validation-messages="{
                required: 'กรุณากรอกจำนวนเงิน',
                number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
                min: `ขั้นต่ำ ${minVolumn} บาท`,
                max: `สูงสุดไม่เกิน ${maxVolumn}บาท`,
              }"
              step="1"
              autocomplete="off"
              v-model="Amount"
            />
          </div>
          <div class="topup">
            <button
              type="button"
              v-for="item in historyPaymentList"
              v-bind:key="item"
              @click="AddAmount(item)"
            >
              {{ useUtility().getCurrency(item, 0) }}
            </button>
            <small>ขั้นต่ำ {{ minVolumn }} บาท สูงสุดไม่เกิน {{ maxVolumn }} บาท</small>
          </div>
          <h5>เลือกช่องทางการชำระเงิน</h5>
          <div class="form-hide-label payment-choice">
            <ElementsFormRadioPledgeMethods v-model="paymentType" />
            <small>{{ feeMessage }}</small
            ><br />
            <small>{{ topupMessage }}</small>
          </div>

          <div class="form-hide-label accept-box">
            <FormKit
              type="checkbox"
              value="accept"
              name="terms-conditions"
              label="ข้าพเจ้าเข้าใจข้อกำหนดและยอมรับเงื่อนไขต่างๆ และตกลงยอมรับผูกพันตามข้อกำหนด"
              validation="required"
              :validation-messages="{ required: 'กรุณาคลิกยอมรับข้อกำหนดและเงื่อนไข' }"
              v-model="isConsent"
            />
          </div>
          <button
            type="button"
            class="formkit-input btn btn-primary btn-accept pledge-action"
            @click="submitPledge"
            label="ยืนยันการเติมเงิน"
            name="pledge-submit"
            id="pledge-submit"
            :disabled="
              !isConsent || !(Amount >= paymentList.Min && Amount <= paymentList.Max)
            "
            :loading="isLoading"
          >
            ยืนยันการเติมเงิน
          </button>
        </FormKit>
        <div v-else>
          <PaymentWalletModalLoading></PaymentWalletModalLoading>
        </div>
      </div>

      <div
        :class="isStep2 ? 'card-body pledge-step-2 is-active' : 'card-body pledge-step-2'"
      >
        <PaymentQrDetail
          v-if="isStep2"
          :paymen-gateway-info="props.walletPaymentGateway"
          :payment-type="'wallet'"
          :fee-amount="feeAmount"
          @check-payment="hanlderCheckPayment"
        ></PaymentQrDetail>
      </div>

      <div
        v-if="paymentResponse"
        :class="isStep3 ? 'card-body pledge-step-3 is-active' : 'card-body pledge-step-3'"
      >
        <div class="status-list" v-if="isSuccess">
          <figure class="status-icon">
            <div class="icon check success"></div>
          </figure>
          <h4 class="title">ชำระเงินสำเร็จแล้ว</h4>
          <div class="status-item">
            <h5 class="topic">หมายเลขทำรายการ</h5>
            <p>{{ paymentResponse.PaymentNo }}</p>
          </div>
          <div class="status-item">
            <h5 class="topic">จำนวนเงิน</h5>
            <p>{{ useUtility().getCurrency(paymentResponse.GrandAmount, 2) }} บาท</p>
          </div>
          <div class="status-item">
            <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
            <p>
              {{
                useUtility().formatDate(
                  paymentResponse.CreateDate,
                  "D MMMM BBBB HH:mm:ss"
                )
              }}
            </p>
          </div>
          <div class="status-item text-success">
            <h5 class="topic">สถานะ</h5>
            <p>ทำรายการสำเร็จ</p>
          </div>
          <div class="status-info">
            <div class="status-action">
              <button
                type="button"
                class="btn btn-close-wallet"
                @click="closeModal(true)"
              >
                ปิดหน้าต่างนี้
              </button>
            </div>
          </div>
        </div>

        <div class="status-list" v-else>
          <figure class="status-icon">
            <div class="icon cross danger"></div>
          </figure>
          <h4 class="title">ชำระเงินไม่สำเร็จ</h4>
          <div class="status-item">
            <h5 class="topic">หมายเลขทำรายการ</h5>
            <p>{{ paymentResponse.PaymentNo }}</p>
          </div>
          <div class="status-item">
            <h5 class="topic">จำนวนเงิน</h5>
            <p>{{ useUtility().getCurrency(paymentResponse.GrandAmount, 2) }} บาท</p>
          </div>
          <div class="status-item text-danger">
            <h5 class="topic">สถานะ</h5>
            <p>ทำรายการไม่สำเร็จ</p>
          </div>
          <div class="status-info">
            <div class="status-action">
              <button
                type="button"
                class="btn btn-close-wallet"
                @click="reset"
                title="ทำรายการใหม่"
              >
                ทำรายการใหม่
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading> -->
    <ElementsModalAlert
      v-if="isError"
      :is-error="isError"
      :message="messageError"
      :reload="false"
    />
  </dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import {
  NoticePaymentRequest,
  PaymentGatewayResponse,
  PaymentGetRequest,
  PaymentGetResponse,
} from "~/shared/entities/payment-entity";
import {
  CreditHistoryPaymentAdd,
  PaymentFeeLimitRequest,
} from "~/shared/entities/pledge-entity";
import { UserResponse } from "~/shared/entities/user-entity";
import PaymentNoticeService from "~/shared/services/payment-notice-service";
import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import { useStoreFeeLimit } from "~/stores/plege/storeFeeLimit";

const emit = defineEmits(["closeWallet", "topupConfirm"]);

const props = defineProps({
  show: Boolean,
  // paymentList: {
  //   type: Object as () => CreditHistoryPaymentAdd,
  // },
  walletPaymentGateway: {
    type: Object as () => PaymentGatewayResponse,
  },
});
const isError = ref(false);
const messageError = ref("");
const _show = ref(false);
const historyPaymentList: globalThis.Ref<number[]> = ref([]);
const paymentResponse: globalThis.Ref<PaymentGetResponse | undefined> = ref();
const minVolumn = ref("");
const maxVolumn = ref("");
const Amount = ref(0);
const isConsent = ref(false);
const paymentType = ref("");
const isLoading = ref(false);
const isStep1 = ref(false);
const isStep2 = ref(false);
const isStep3 = ref(false);
const isSuccess = ref(false);
let paymentService: PaymentNoticeService;
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);
const noticePayment = useStoreNoticePayment();

const feeLimit = useStoreFeeLimit();
const router = useRouter();
const route = useRoute();

const feeAmount = ref(0);
const feeMessage = ref("");
const topupMessage = ref("");
const paymentList: globalThis.Ref<CreditHistoryPaymentAdd | undefined> = ref();
// Submit form event
const submitPledge = async (formData: any) => {
  // Add waiting time for debug
  emit("topupConfirm", isConsent.value, Amount.value, paymentType.value);
};
const AddAmount = (credit: number) => {
  const amount = parseInt(Amount.value.toString());
  let total = amount + credit;
  if (paymentList.value) {
    if (total >= paymentList.value.Min && total <= paymentList.value.Max) {
      Amount.value = total;
    } else {
      Amount.value = paymentList.value.Max;
    }
  }
  //getMessageWallet();
};
watch(
  () => props.show,
  () => {
    console.log("prop value changed", props.show);
    if (props.show) {
      openModal();
    } else {
      closeModal(false);
    }
  }
);
watch(
  () => props.walletPaymentGateway,
  async () => {
    console.log("prop value changed", props.walletPaymentGateway);
    if (props.walletPaymentGateway) {
      isStep1.value = false;
      isStep2.value = true;
      isStep3.value = false;

      // init signalr in wallet
      await signalRPaymentService();
    }
  }
);
watch(
  () => paymentType.value,
  () => {
    console.log("change value paymentType", paymentType);
    //getMessageWallet(Amount.value);
  }
);
watch(
  () => route.hash,
  async () => {
    console.log("route.hash", route.hash);
    if (route.hash.includes("#topup_thanks") && props.walletPaymentGateway) {
      const PaymentNo: string = route.hash.split("?PaymentNo=")[1];
      if (props.walletPaymentGateway.refno2 == PaymentNo) {
        isLoading.value = true;
        const req: PaymentGetRequest = {
          PaymentNo: PaymentNo,
        };
        const response = await useRepository().pledge.creditorderPaymentGet(req);
        if (
          response.apiResponse.Status &&
          response.apiResponse.Status == "200" &&
          response.apiResponse.Data
        ) {
          paymentResponse.value = response.apiResponse.Data[0];
          hanlderCheckPayment(paymentResponse.value);
        }
        isLoading.value = false;
      }
    }
  }
);
const loadPledgeHistoryPaymentAddList = async () => {
  isError.value = false;
  messageError.value = "";
  isLoading.value = true;
  const response = await useRepository().pledge.creditHistoryPaymentAddList();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      paymentList.value = response.apiResponse.Data;
    } else {
      // data not found
    }
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
  isLoading.value = false;
};
const onLoad = onMounted(async () => {
  if (props.show) {
    openModal();
  }

  const values = await Promise.all([
    loadPledgeHistoryPaymentAddList(),
    useService().paymentNotice,
    getMessageWallet(),
  ]);
  if (values.length > 0) {
    paymentService = values[1];

    if (paymentList.value) {
      paymentList.value.List.sort((a, b) => a - b);
      historyPaymentList.value = paymentList.value.List;
      minVolumn.value = useUtility().getCurrency(paymentList.value.Min, 0);
      maxVolumn.value = useUtility().getCurrency(paymentList.value.Max, 0);
    }
  }
  // const myModal = document.getElementById("modal_demo") as Element
  // modal = new $bootstrap.Modal(myModal);
});

const getMessageWallet = async () => {
  const req: PaymentFeeLimitRequest = {
    PaymentType: "BILL_PAYMENT",
  };
  const response = await feeLimit.getFeeLimit(req);
  if (response.Status && response.Status == "200") {
    if (response.Data) {
      let filter = response.Data.filter((x) => x.Amount > 0);
      if (filter.length > 0) {
        feeMessage.value = `ค่าธรรมเนียม ${useUtility().getCurrency(
          filter[0].Amount,
          2
        )} บาท`;
      }
      filter = response.Data.filter((x) => x.Amount == 0);
      if (filter.length > 0) {
        topupMessage.value = `เติม ${useUtility().getCurrency(
          filter[0].Min
        )} บาท ขึ้นไป ไม่เสียค่าธรรมเนียม`;
      }
    } else {
      // data not found
    }
  } else {
  }
};
const hanlderCheckPayment = (response: PaymentGetResponse) => {
  paymentResponse.value = response;
  if (!response.IsPending) {
    if (!response.IsCancel && response.IsSuccess) {
      isSuccess.value = true;
    } else {
      isSuccess.value = false;
    }
    isStep3.value = true;
    isStep1.value = false;
    isStep2.value = false;
  }
};

const signalRPaymentService = async () => {
  if (AuthenInfo.value) {
    if (props.walletPaymentGateway) {
      const responseUser = await useRepository().user.GetUser();

      if (responseUser.apiResponse.Status && responseUser.apiResponse.Status == "200") {
        if (responseUser.apiResponse.Data && responseUser.apiResponse.Data.length > 0) {
          const user: UserResponse = responseUser.apiResponse.Data[0];
          let deviceId = await useUtility().getDeviceId();
          const paymentServiceReq: NoticePaymentRequest = {
            ClientID: "AgentLoveWeb",
            DeviceID: deviceId,
            ReferenceID: props.walletPaymentGateway.refno2,
            UserID: user.ID,
            GroupType: "qr",
            AccessToken: AuthenInfo.value.accessToken,
          };
          await paymentService.connect(paymentServiceReq);
          await paymentService.RequestUpdateTopUpPayment(props.walletPaymentGateway);
          // if(NoticePaymentInfo.value){
          //   isStep3.value = true
          //   isStep1.value = false
          //   isStep2.value = false
          // }
        }
      }
    } else {
      router.push("/history");
    }
  } else {
    router.push("/login");
  }
};

const reset = () => {
  isStep1.value = true;
  isStep2.value = false;
  isStep3.value = false;
  isSuccess.value = false;
  paymentResponse.value = undefined;
};
function openModal() {
  //modal.show()
  _show.value = props.show;
  isStep1.value = true;
  isStep2.value = false;
  isStep3.value = false;
  const dialogLoading = document.getElementById("wallet-dialog");
  if (dialogLoading) dialogLoading.showModal();
}

async function closeModal(refresh: boolean) {
  //modal.hide()
  _show.value = false;
  const dialogLoading = document.getElementById("wallet-dialog");
  if (dialogLoading) dialogLoading.close();
  if (props.walletPaymentGateway) paymentService.disconnect();
  // paymentService.disconnect();
  emit("closeWallet", false, refresh);
}
</script>
<style scoped>
.btn-primary a.btn-primary {
  background-color: #138543 !important;
  border-color: #138543 !important;
  color: #fff !important;
}
.btn:disabled {
  background: var(--fk-color-border) !important;
  color: var(--fk-color-button) !important;
  cursor: not-allowed;
}
</style>
