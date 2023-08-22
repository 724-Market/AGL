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
        v-if="props.paymentList"
      >
        <FormKit
          type="form"
          @submit="submitPledge"
          :actions="false"
          id="form-pledge"
          form-class="form-pledge form-theme"
          :incomplete-message="false"
        >
          <figure class="dialog-icon"><i class="fa-regular fa-wallet"></i></figure>
          <h5>กรอกจำนวนเงินที่ต้องการเติม</h5>
          <div class="form-hide-label topup-value">
            <FormKit
              type="number"
              label="จำนวนเงินที่ต้องการเติม"
              name="amount"
              :validation="`required|number|min:${props.paymentList.Min}|max:${props.paymentList.Max}`"
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
          <FormKit
            type="submit"
            label="ยืนยันการเติมเงิน"
            name="pledge-submit"
            id="pledge-submit"
            :classes="{
              input: 'btn-primary btn-accept',
              outer: 'pledge-action',
            }"
            :disabled="
              !isConsent ||
              !(Amount >= props.paymentList.Min && Amount <= props.paymentList.Max)
            "
            :loading="isLoading"
          />
        </FormKit>
      </div>

      <div
        :class="isStep2 ? 'card-body pledge-step-2 is-active' : 'card-body pledge-step-2'"
      >
        <!-- <div class="qr-payment">
          <div class="status-list">
            <div class="logo">724 Payment</div>
            <div class="status-item">
              <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
              <p>7B2303094767564</p>
            </div>
            <div class="status-item">
              <h5 class="topic">จำนวนเงิน</h5>
              <p>123.45 บาท</p>
            </div>
            <div class="status-item text-warning">
              <h5 class="topic">กรุณาชำระภายใน</h5>
              <p>14 มี.ค. 2566 17:34 น.</p>
            </div>
          </div>
          <div class="qr-info">
            <figure class="qr-code">
              <img src="/uploads/qr.png" alt="" />
            </figure>
            <small>0543FRE3GDTEY094767</small>
            <p>หรือคลิกปุ่มเพื่อบันทึก QR ด้านล่าง</p>
            <a class="btn btn-secondary" href="#" title="บันทึก QR"
              ><i class="fa-solid fa-download"></i>บันทึก QR</a
            >
          </div>
        </div> -->
        <PaymentQrDetail
          :paymen-gateway-info="props.walletPaymentGateway"
          :payment-type="'wallet'"
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
import { CreditHistoryPaymentAdd } from "~/shared/entities/pledge-entity";
import { UserResponse } from "~/shared/entities/user-entity";
import PaymentNoticeService from "~/shared/services/payment-notice-service";
import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";

const emit = defineEmits(["closeWallet", "topupConfirm"]);

const props = defineProps({
  show: Boolean,
  paymentList: {
    type: Object as () => CreditHistoryPaymentAdd,
  },
  walletPaymentGateway: {
    type: Object as () => PaymentGatewayResponse,
  },
});

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
let paymentService:PaymentNoticeService
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);
const noticePayment = useStoreNoticePayment();
const { NoticePaymentInfo } = storeToRefs(noticePayment);
const router = useRouter();
const route = useRoute();

// Submit form event
const submitPledge = async (formData: any) => {
  // Add waiting time for debug
  emit("topupConfirm", isConsent.value, Amount.value, paymentType.value);
};
const AddAmount = (credit: number) => {
  const amount = Amount.value;
  let total = amount + credit;
  if (props.paymentList) {
    if (total >= props.paymentList.Min && total <= props.paymentList.Max) {
      Amount.value = total;
    }
  }
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
  () => route.hash,
  async () => {
    console.log("route.hash", route.hash);
    if (route.hash.includes("#topup_thanks") && props.walletPaymentGateway) {
      const PaymentNo: string = route.hash.split("?PaymentNo=")[1];
      if (props.walletPaymentGateway.payment_id == PaymentNo) {
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
      }
    }
  }
);
const onLoad = onMounted(async () => {
  paymentService = await useService().paymentNotice;
  // const myModal = document.getElementById("modal_demo") as Element
  // modal = new $bootstrap.Modal(myModal);
  if (props.show) {
    openModal();
  }
});
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
  if (props.paymentList) {
    props.paymentList.List.sort((a, b) => a - b);
    historyPaymentList.value = props.paymentList.List;
    minVolumn.value = useUtility().getCurrency(props.paymentList.Min, 0);
    maxVolumn.value = useUtility().getCurrency(props.paymentList.Max, 0);
  }
}

async function closeModal(refresh: boolean) {
  //modal.hide()
  _show.value = false;
  const dialogLoading = document.getElementById("wallet-dialog");
  if (dialogLoading) dialogLoading.close();
  paymentService.disconnect();
  emit("closeWallet", false, refresh);
}
</script>
