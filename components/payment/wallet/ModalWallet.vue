<template>
  <Teleport to="body">
    <dialog id="wallet-dialog" v-show="_show">
      <div class="dialog-card">
        <div class="card-header" v-if="!isStep3">
          <button type="button" class="btn btn-close btn-close-wallet" @click="hideModal">ปิด</button>
        </div>

        <div v-if="pledgeStep === 'loading'" class="card-body is-active">
          <UtilitiesLoading :waiting-text="waitingText" />
        </div>

        <div v-else>

          <div :class="isStep1 ? 'card-body pledge-step-1 is-active' : 'card-body pledge-step-1'">

            <FormKit type="form" :actions="false" id="form-pledge" form-class="form-pledge form-theme"
              :incomplete-message="false" @submit="submitPledge" v-if="paymentList">

              <figure class="dialog-icon"><i class="fa-regular fa-wallet"></i></figure>
              <h5>กรอกจำนวนเงินที่ต้องการเติม</h5>

              <div class="form-hide-label topup-value">
                <FormKit type="number" label="จำนวนเงินที่ต้องการเติม" name="amount"
                  :validation="`required|number|min:${paymentList.Min}|max:${paymentList.Max}`" :validation-messages="{
      required: 'กรุณากรอกจำนวนเงิน',
      number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      min: `ขั้นต่ำ ${minVolumn} บาท`,
      max: `สูงสุดไม่เกิน ${maxVolumn} บาท`,
    }" step="1" inputmode="numeric" autocomplete="off" v-model="Amount" />
              </div>

              <div class="topup">
                <button type="button" v-for="item in historyPaymentList" v-bind:key="item" @click="AddAmount(item)">
                  {{ useUtility().getCurrency(item, 0) }}
                </button>
                <small>ขั้นต่ำ {{ minVolumn }} บาท สูงสุดไม่เกิน {{ maxVolumn }} บาท</small>
              </div>

              <h5>ช่องทางการชำระเงิน</h5>
              <div class="form-hide-label payment-choice">
                <ElementsFormRadioPledgeMethods v-model="paymentType" />
              </div>
              <div class="notice-info">
                {{ feeMessage }}<br />
                {{ topupMessage }}
              </div>

              <div class="form-hide-label accept-box">
                <FormKit type="checkbox" name="terms"
                  label="ข้าพเจ้าเข้าใจข้อกำหนดและยอมรับเงื่อนไขต่างๆ และตกลงยอมรับผูกพันตามข้อกำหนด"
                  validation="accepted" :validation-messages="{ accepted: 'กรุณาคลิกยอมรับข้อกำหนดและเงื่อนไข' }" />
              </div>

              <FormKit type="submit" label="ยืนยันการเติมเงิน" name="pledge-submit" id="pledge-submit" :classes="{
      input: 'btn-primary btn-accept',
      outer: 'pledge-action',
    }" :disabled="isLoading" :loading="isLoading" />
            </FormKit>
          </div>

          <div :class="isStep2 ? 'card-body pledge-step-2 is-active' : 'card-body pledge-step-2'">

            <PaymentQrDetail v-if="isStep2" :paymen-gateway-info="props.walletPaymentGateway" :payment-type="'wallet'"
              :fee-amount="feeAmount" @on-check-payment="handlerCheckPayment"></PaymentQrDetail>
          </div>

          <div v-if="paymentResponse"
            :class="isStep3 ? 'card-body pledge-step-3 is-active' : 'card-body pledge-step-3'">
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
                  <button type="button" class="btn btn-close-wallet" @click="closeModal(true)">
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
                  <button type="button" class="btn btn-close-wallet" @click="reset" title="ทำรายการใหม่">
                    ทำรายการใหม่
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ElementsModalAlert v-if="isError" :is-error="isError" :message="messageError" :reload="false" />
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import type {
  NoticePaymentRequest,
  PaymentGatewayResponse,
  PaymentGetRequest,
  PaymentGetResponse,
} from "~/shared/entities/payment-entity"
import type {
  CreditHistoryPaymentAdd,
  CreditOrderPaymentCreateResponse,
  PaymentFeeLimitRequest,
} from "~/shared/entities/pledge-entity"
import type { UserResponse } from "~/shared/entities/user-entity"
import PaymentNoticeService from "~/shared/services/payment-notice-service"
import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment"
import { useStoreUserAuth } from "~/stores/user/storeUserAuth"
import { useStoreFeeLimit } from "~/stores/plege/storeFeeLimit"

const pledgeStep = useState('pledge-step')
const waitingText = ref('')

// Define emit function to emit events on modal
const emit = defineEmits(["onCloseWallet", "topupConfirm", "onCheckPayment"])

// Function to emit the 'onCloseModal' event
const hideModal = () => {
  pledgeStep.value = ''
  emit('onCloseWallet')
}

const props = defineProps({
  show: Boolean,
  walletPaymentGateway: {
    type: Object as () => PaymentGatewayResponse,
  },
  creditOrder: {
    type: Object as () => CreditOrderPaymentCreateResponse,
  },
})

const isError = ref(false)
const messageError = ref("")
const _show = ref(false)
const historyPaymentList: globalThis.Ref<number[]> = ref([])
const paymentResponse: globalThis.Ref<PaymentGetResponse | undefined> = ref()
const minVolumn = ref("")
const maxVolumn = ref("")
const Amount = ref<number | null>(null)
const paymentType = ref('qr')
const isStep1 = ref(false)
const isStep2 = ref(false)
const isStep3 = ref(false)
const isSuccess = ref(false)
let paymentService: PaymentNoticeService
const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const noticePayment = useStoreNoticePayment()

const feeLimit = useStoreFeeLimit()
const router = useRouter()
const route = useRoute()

const feeAmount = ref(0)
const feeMessage = ref("")
const topupMessage = ref("")
const paymentList: globalThis.Ref<CreditHistoryPaymentAdd | undefined> = ref()

// Get `agentInfo` store
const agentInfoStore = useAgentInfoStore()

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// on Mounted
onMounted(() => {
  pledgeStep.value = 'loading'
})

/////////////////////////////////////////
// Submit pledge
const submitPledge = async (formData: any) => {

  // Delay time after submit
  await new Promise((r) => setTimeout(r, 500))

  // Change pledge state
  pledgeStep.value = 'loading'

  emit('topupConfirm', formData.terms, formData.amount, formData.PledgeMethods)
}

/////////////////////////////////////////
// Add amount
const AddAmount = (credit: number) => {
  let amount = parseInt(Amount.value?.toString() || "0")
  if (Number.isNaN(amount)) amount = 0
  let total = credit

  if (paymentList.value) {

    if (total >= paymentList.value.Min && total <= paymentList.value.Max) {
      Amount.value = total
    } else {
      Amount.value = paymentList.value.Min
    }
  }
}

/////////////////////////////////////////
watch(
  () => props.show,
  () => {
    // console.log("prop value changed", props.show)
    if (props.show) {
      openModal()
    } else {
      closeModal(false)
    }
  }
)
watch(
  () => props.walletPaymentGateway,
  async () => {
    // console.log("prop value changed", props.walletPaymentGateway)
    if (props.walletPaymentGateway) {
      isStep1.value = false
      isStep2.value = true
      isStep3.value = false

      // Change pledge state
      pledgeStep.value = ''

      // init signalr in wallet
      await signalRPaymentService()
    }
  }
)
watch(
  () => props.creditOrder,
  async () => {
    if (props.creditOrder) {
      feeAmount.value = props.creditOrder.FeeAmount
    }
  }
)
watch(
  () => paymentType.value,
  () => {
    // console.log("change value paymentType", paymentType)
    //getMessageWallet(Amount.value)
  }
)
watch(
  () => route.hash,
  async () => {
    // console.log("route.hash", route.hash)
    if (route.hash.includes("#topup_thanks") && props.walletPaymentGateway) {
      const PaymentNo: string = route.hash.split("?PaymentNo=")[1]
      if (props.walletPaymentGateway.refno2 == PaymentNo) {
        isLoading.value = true
        const req: PaymentGetRequest = {
          PaymentNo: PaymentNo,
        }
        const response = await useRepository().pledge.creditorderPaymentGet(req)
        if (
          response.apiResponse.Status &&
          response.apiResponse.Status == "200" &&
          response.apiResponse.Data
        ) {

          paymentResponse.value = response.apiResponse.Data[0]
          handlerCheckPayment(paymentResponse.value)

          await useAsyncData(agentInfoStore.getAll)

        }
        isLoading.value = false
      }
    }
  }
)
const loadPledgeHistoryPaymentAddList = async () => {
  isError.value = false
  messageError.value = ""
  isLoading.value = true
  const response = await useRepository().pledge.creditHistoryPaymentAddList()
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      paymentList.value = response.apiResponse.Data
    } else {
      // data not found
    }
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
  isLoading.value = false
}
const onLoad = onMounted(async () => {
  if (props.show) {
    openModal()
  }

  const values = await Promise.all([
    loadPledgeHistoryPaymentAddList(),
    useService().paymentNotice,
    getMessageWallet(),
  ])

  if (values.length > 0) {
    paymentService = values[1]

    if (paymentList.value) {
      paymentList.value.List.sort((a, b) => a - b)
      historyPaymentList.value = paymentList.value.List
      minVolumn.value = useUtility().getCurrency(paymentList.value.Min, 0)
      maxVolumn.value = useUtility().getCurrency(paymentList.value.Max, 0)

      // Change pledge state
      pledgeStep.value = ''
    }
  }
})

const getMessageWallet = async () => {
  const req: PaymentFeeLimitRequest = {
    PaymentType: "BILL_PAYMENT",
  }
  const response = await feeLimit.getFeeLimit(req)
  if (response.Status && response.Status == "200") {
    if (response.Data) {
      let filter = response.Data.filter((x) => x.Amount > 0)
      if (filter.length > 0) {
        feeMessage.value = `ค่าธรรมเนียม ${useUtility().getCurrency(
          filter[0].Amount,
          2
        )} บาท`
      }
      filter = response.Data.filter((x) => x.Amount == 0)
      if (filter.length > 0) {
        topupMessage.value = `เติม ${useUtility().getCurrency(
          filter[0].Min
        )} บาท ขึ้นไป ไม่เสียค่าธรรมเนียม`
      }
    } else {
      // data not found
    }
  } else {
  }
}

const handlerCheckPayment = (response: PaymentGetResponse) => {
  paymentResponse.value = response
  if (!response.IsPending) {
    if (!response.IsCancel && response.IsSuccess) {
      isSuccess.value = true
    } else {
      isSuccess.value = false
    }
    isStep3.value = true
    isStep1.value = false
    isStep2.value = false

    // Change pledge state
    pledgeStep.value = ''
  }
}

const signalRPaymentService = async () => {
  if (AuthenInfo.value) {
    if (props.walletPaymentGateway) {
      const responseUser = await useRepository().user.GetUser()

      if (responseUser.apiResponse.Status && responseUser.apiResponse.Status == "200") {
        if (responseUser.apiResponse.Data && responseUser.apiResponse.Data.length > 0) {
          const user: UserResponse = responseUser.apiResponse.Data[0]
          let deviceId = await useUtility().getDeviceId()
          const paymentServiceReq: NoticePaymentRequest = {
            ClientID: "AgentLoveWeb",
            DeviceID: deviceId,
            ReferenceID: props.walletPaymentGateway.refno2,
            UserID: user.ID,
            GroupType: "qr",
            AccessToken: AuthenInfo.value.accessToken,
          }
          await paymentService.connect(paymentServiceReq)
          await paymentService.RequestUpdateTopUpPayment(props.walletPaymentGateway)
          // if(NoticePaymentInfo.value){
          //   isStep3.value = true
          //   isStep1.value = false
          //   isStep2.value = false
          // }
        }
      }
    } else {
      router.push("/history")
    }
  } else {
    router.push("/login")
  }
}

const reset = () => {
  isStep1.value = true
  isStep2.value = false
  isStep3.value = false
  isSuccess.value = false
  paymentResponse.value = undefined

  // Change pledge state
  pledgeStep.value = ''

  waitingText.value = ''
}
function openModal() {
  //modal.show()
  _show.value = props.show
  isStep1.value = true
  isStep2.value = false
  isStep3.value = false
  const dialogLoading = document.getElementById("wallet-dialog")
  if (dialogLoading) dialogLoading.showModal()
}

async function closeModal(refresh: boolean) {
  //modal.hide()
  _show.value = false
  const dialogLoading = document.getElementById("wallet-dialog")
  if (dialogLoading) dialogLoading.close()
  if (props.walletPaymentGateway) paymentService.disconnect()
  // paymentService.disconnect()
  emit("onCloseWallet", false, refresh)
}
</script>
