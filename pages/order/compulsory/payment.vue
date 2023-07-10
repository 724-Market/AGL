<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-7">

          <OrderCompulsoryPaymentMethod
            :order="orderInfo">
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

              <OrderCompulsoryPaymentSummaryDiscount></OrderCompulsoryPaymentSummaryDiscount>

            </div>

            <OrderChecklist :list="checklist" />

          </aside>

          <FormKit type="submit" label="ไปต่อ" name="order-submit" id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }" :disabled="submitted" :loading="isLoading" />

          <NuxtLink to="packages" class="btn btn-back">ย้อนกลับ</NuxtLink>

        </div>
      </div>

    </FormKit>

  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
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

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

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
    } else {
      router.push("/order/compulsory/placeorder");
    }
  } else {
    router.push("/login");
  }
})

// Submit form event
const submitOrder = async (formData: any) => {
  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))
}

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

