<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
    <FormKit 
      type="form" 
      :actions="false" 
      id="form-order" 
      form-class="form-order form-theme"
      v-model="values" 
      :incomplete-message="false">

      <div class="row">
        <div class="col-lg-7">

          <OrderCompulsoryPaymentMethod
            @pass-summary="handleSetSummary"
            :order="orderInfo"
            :calculate="calculate"
            :credit-balance="creditBalance">
          </OrderCompulsoryPaymentMethod>

        </div>

        <div class="col-lg-5">

          <aside class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-summary-cart">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#summary-cart" aria-expanded="false"
                      aria-controls="summary-cart">รายการที่เลือก</button>
                  </h2>
                  <div id="summary-cart" class="accordion-collapse collapse" data-bs-parent="#accordion-summary-cart">
                    <div class="accordion-body">

                      <OrderCartCar
                        v-if="carInfo && carDetail"
                        :car-detail="carInfo.CarDetail"
                        :car-use="carInfo.CarUse"
                        :is-car-red="carDetail.IsRedLicense"
                        :effective-date="carInfo.EffectiveDate"
                        :expire-date="carInfo.ExpireDate"
                        :insurance-day="carInfo.InsuranceDay"
                      ></OrderCartCar>

                      <OrderCartPackage
                        v-if="packageSelect && packageSelect.CompanyName != ''"
                        :package-select="packageSelect"
                      />

                      <OrderCartInsure
                        v-if="insureDetail && insuranceRecieve"
                        :delivery-type="insuranceRecieve ? deleveryTypes[insuranceRecieve.ShippingPolicy] : ''"
                        :is-person="insureDetail.IsPerson"
                        v-model:person-profile.sync="personProfile"
                        v-model:legal-person-profile="legalPersonProfile"
                      ></OrderCartInsure>

                    </div>
                  </div>
                </div>
              </div>

              <!-- <OrderCart v-if="packageSelect && packageSelect.CompanyName != ''" :is-online="packageSelect.IsOnlineActive"
                :company-name="packageSelect.CompanyName"
                :company-image="getCompanyPath(packageSelect.PackageResult[0].CompanyImage)"
                :price="getCurrency(packageSelect.PackageResult[0].PriceACT)" :price-discount="getCurrency(packageSelect.PackageResult[0].PriceACTDiscount)
                  " :car-name="packageSelect.PackageResult[0].UseCarName" /> -->

            </div>

            <div class="card-body card-table">

              <OrderCompulsoryPaymentSummaryDiscount
                :order="orderInfo"
                :packages="packageSelect"
                :summary="summaryDiscountObject"
                :calculate="calculate"
              >
              </OrderCompulsoryPaymentSummaryDiscount>

            </div>

            <OrderChecklist :list="checklist" @change-check-save="handlerCheckSave" />

          </aside>

          <!-- <FormKit type="submit" label="ไปต่อ" name="order-submit" 
            id="order-submit" :disabled="!checkSave" :loading="isLoading"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }" /> -->

          <button 
            type="button"
            class="formkit-input btn btn-primary form-actions"
            @click="submitOrder"
            label="ไปต่อ"
            name="order-submit"
            id="order-submit"
            :disabled="!checkSave"
            :loading="isLoading"
            style="display: block; margin-inline: auto; width: min(100%,420px);"
            >ไปต่อ
          </button>

          <NuxtLink to="placeorder" class="btn btn-back mt-3">ย้อนกลับ</NuxtLink>

        </div>
      </div>

    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import { 
  CalculateRequest, 
  CalculateResponse,
  SummaryDiscountObject,
  PaymentSaveRequest,
  PaymentSaveResponse
} from "~/shared/entities/payment-entity";
import { CreditBalanceResponse } from '~/shared/entities/pledge-entity'
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageResponse } from "~~/shared/entities/packageList-entity";
import { 
  CarDetailsExtension, 
  PlaceOrderRequest,
  InsuranceRecieveObject,
  CustomerOrderRequest,
  PersonProfile,
  LegalPersonProfile,
} from "~/shared/entities/placeorder-entity";

// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStorePayment } from "~/stores/order/storePayments";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";

type StringArray = {
  [key: string]: string;
};

const paymentMethod: StringArray = {
  qr: 'BILL_PAYMENT',
  card: 'CREDIT_CARD',
  pledge: 'PLEDGE'
}
const discountMethod: StringArray = {
  fulldiscount: 'ZERO_COMMISSION',
  partialdiscount: 'SOME_COMMISSION',
  fullpay: 'FULL_COMMISSION'
}
// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

const isError = ref(false);
const messageError = ref("");

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

const carInfo: globalThis.Ref<IInformation | undefined> = ref()
const packageSelect: globalThis.Ref<IPackageResponse | ""> = ref("")
const orderInfo: globalThis.Ref<PlaceOrderRequest | undefined> = ref()
const carDetail: globalThis.Ref<CarDetailsExtension | undefined> = ref()
const insureDetail: globalThis.Ref<CustomerOrderRequest | undefined> = ref({})
const personProfile: globalThis.Ref<PersonProfile | undefined> = ref();
const legalPersonProfile: globalThis.Ref<LegalPersonProfile | undefined> = ref();
const insuranceRecieve: globalThis.Ref<InsuranceRecieveObject | undefined> = ref()
const deleveryTypes: globalThis.Ref<{ ELECTRONIC: string; PAPER: string; DELIVERY: string; }>= ref({
  ELECTRONIC: 'pdf',
  PAPER: 'print',
  DELIVERY: 'postal'
})

const calculate: globalThis.Ref<CalculateResponse | undefined> = ref()
const creditBalance: globalThis.Ref<CreditBalanceResponse | undefined> = ref()
const summaryDiscountObject: globalThis.Ref<SummaryDiscountObject | undefined> = ref()
const paymentSaveResponse: globalThis.Ref<PaymentSaveResponse | undefined> = ref()

var checkSave: globalThis.Ref<Boolean> = ref(false);
let values = reactive({})

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: '1',
    className: '',
    desc: 'เลือกช่องทางการชำระเงิน'
  },
  {
    id: '2',
    className: '',
    desc: 'เลือกการใช้ส่วนลด'
  }
])

//define store
const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)

const storeCarInfo = useStoreInformation();
const { CarInfo } = storeToRefs(storeCarInfo);

const storePackage = useStorePackage(); 
const { PackageInfo } = storeToRefs(storePackage)

const storeOrder = useStorePlaceorder()
const { OrderInfo } = storeToRefs(storeOrder)

const storePayment = useStorePayment()

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    if(OrderInfo.value) {
      orderInfo.value = OrderInfo.value
      carInfo.value = CarInfo.value
      packageSelect.value = PackageInfo.value

      carDetail.value = OrderInfo.value.CarDetailsExtension
      insureDetail.value = OrderInfo.value.Customer
      personProfile.value = OrderInfo.value.Customer?.PersonProfile
      legalPersonProfile.value = OrderInfo.value.Customer?.LegalPersonProfile
      insuranceRecieve.value = {
        ShippingPolicy: OrderInfo.value.DeliveryMethod1?.DeliveryType ?? "",
        Email: OrderInfo.value.DeliveryMethod1?.DeliveryEmail ?? "",
        PostalDelivary: {
          IsDeliveryAddressSameAsDefault: OrderInfo.value.Customer?.IsDeliveryAddressSameAsDefault ?? true,
          ShippingMethod: OrderInfo.value.DeliveryMethod1?.DeliveryChannelType ?? "",
          ShippingFee: "50 บาท", //TODO: MockUp
          DeliveryAddress: OrderInfo.value.Customer?.DeliveryAddress,
        }
      }
      await getCalculate();
    } else {
      router.push("/order/compulsory/placeorder");
    }
  } else {
    router.push("/login");
  }
})

// Submit form event
const submitOrder = async (formData: any) => {
  isLoading.value = true;
  let indexType = summaryDiscountObject.value?.PaymentMethod ?? ''
  let indexDiscount = summaryDiscountObject.value?.DiscountMethod ?? ''
  let paymentSaveReq: PaymentSaveRequest = {
    OrderNo: orderInfo.value?.OrderNo ?? '',
    PaymentType: paymentMethod[indexType],
    DiscountType: discountMethod[indexDiscount],
    DiscountValue: summaryDiscountObject.value?.DisPrice ?? 0,
    CouponCode: '', //TODO: Is new Sprint 
    NumCredit: 0, //TODO: Is new Sprint 
    IsUseCredit: summaryDiscountObject.value?.PaymentMethod == 'pledge' ? true : false
  }

  const response = await useRepository().payment.save(paymentSaveReq);
  if (response.apiResponse.Status && response.apiResponse.Status == "200" && response.apiResponse.Data) {
    paymentSaveResponse.value = response.apiResponse.Data
    storePayment.setPayment(paymentSaveResponse.value)
    router.push("/order/compulsory/summary?OrderNo="+paymentSaveResponse.value.OrderNo);
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
  isLoading.value = false;
}

const getCalculate = async () => {
  //get credit balance
  isLoading.value = true;
  const resCRedit = await useRepository().pledge.creditBalance();
  if (resCRedit.apiResponse.Status && resCRedit.apiResponse.Status == "200" && resCRedit.apiResponse.Data) {
    creditBalance.value = resCRedit.apiResponse.Data[0]
    // console.log('creditBalance', resCRedit.apiResponse.Data[0])
  } else {
    isError.value = true;
    messageError.value = resCRedit.apiResponse.ErrorMessage ?? ""
  }

  //get calculate
  let calculateReq: CalculateRequest = {
    OrderNo: orderInfo.value?.OrderNo ?? ''
  }
  const resCalculate = await useRepository().payment.calculate(calculateReq);
  if (resCalculate.apiResponse.Status && resCalculate.apiResponse.Status == "200" && resCalculate.apiResponse.Data) {
    calculate.value = resCalculate.apiResponse.Data[0]
    // console.log('calculate', resCalculate.apiResponse.Data[0])
  } else {
    isError.value = true
    messageError.value = resCalculate.apiResponse.ErrorMessage ?? ""
  }
  isLoading.value = false;
}

const handleSetSummary = async (summaryDiscount: SummaryDiscountObject) => {
  summaryDiscountObject.value = summaryDiscount 
  if(summaryDiscountObject.value.PaymentMethod != '' && summaryDiscountObject.value.DiscountMethod == '') {
    checklist.value[0].className = 'current'
    checklist.value[1].className = ''
  } else if (summaryDiscountObject.value.PaymentMethod != '' && summaryDiscountObject.value.DiscountMethod != '') {
    checklist.value[0].className = 'current'
    checklist.value[1].className = 'current'
  } else {
    checklist.value[0].className = ''
    checklist.value[1].className = ''
  }
}

const handlerCheckSave = (check: boolean) => {
  checkSave.value = check;
};

// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = true
const showPageHeader = true

// Define page meta
const pageTitle = 'วิธีการชำระเงิน'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = 'Compulsory วิธีการชำระเงิน'

// Define meta seo
useHead({
  title:pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-payment",
  },
})
</script>

