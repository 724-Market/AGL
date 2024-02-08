<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <FormKit
      type="form"
      :actions="false"
      id="form-order"
      form-class="form-order form-theme"
      :incomplete-message="false"
      v-model="values"
    >
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <!-- # # # # # # # # # # # # # # # # # # # # # รายละเอียดรถ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderCarDetail
            @check-car-detail="handleCheckCarDetail"
            :car-color="carColor"
            :car-province="carProvince"
            :info="infomation"
            :car-detail-cache="carDetailCache"
          ></OrderCompulsoryPlaceorderCarDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้เอาประกันภัย # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsureDetail
            v-if="prefix.length > 0 && nationality.length > 0 && addrProvinceForInsured.length > 0 "
            @change-province="handlerChangeProvinceForInsured"
            @change-district="handlerChangeDistrictForInsured"
            @change-sub-district="handlerChangeSubDistrictForInsured"
            @change-customer-type="handlerChangeCustomerType"
            @change-full-address="handlerChangeFullAddress"
            @change-insure-detail="handlerChangeInsureDetail"
            :customer-id="OrderInfo.Customer?.PersonProfile?.CustomerID"
            :prefix="prefix"
            :nationality="nationality"
            :addr-province="addrProvinceForInsured"
            :addr-district="addrDistrictForInsured"
            :addr-sub-district="addrSubDistrictForInsured"
            :addr-zip-code="addrZipCodeForInsured"
            :cache-order-request="insureDetailCache"
          ></OrderCompulsoryPlaceorderInsureDetail>


          <!-- # # # # # # # # # # # # # # # # # # # # # วิธีการรับกรมธรรม์ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsuranceRecieve
            v-if="prefix.length > 0 && addrProvinceForRecieve.length > 0"
            @change-province="handlerChangeProvinceForRecieve"
            @change-district="handlerChangeDistrictForRecieve"
            @change-sub-district="handlerChangeSubDistrictForRecieve"
            @check-insurance-recieve="handleCheckInsuranceRecieve"
            :insure-full-address="insureFullAddress"
            :prefix="prefixRecieve"
            :delivery="delivery"
            :addr-province="addrProvinceForRecieve"
            :addr-district="addrDistrictForRecieve"
            :addr-sub-district="addrSubDistrictForRecieve"
            :addr-zip-code="addrZipCodeForRecieve"
            :package-select="packageSelect"
            :insurance-recieve-cache="insuranceRecieveCache"
          ></OrderCompulsoryPlaceorderInsuranceRecieve>

          <!-- # # # # # # # # # # # # # # # # # # # # # ใบกำกับภาษี # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderTaxInvoice
            v-if="
              packageSelect &&
              prefix.length > 0 &&
              delivery.length > 0 &&
              addrProvinceForTax.length > 0
            "
            @change-province="handlerChangeProvinceForTax"
            @change-district="handlerChangeDistrictForTax"
            @change-sub-district="handlerChangeSubDistrictForTax"
            @change-province2="handlerChangeProvinceForTax2"
            @change-district2="handlerChangeDistrictForTax2"
            @change-sub-district2="handlerChangeSubDistrictForTax2"
            :insure-full-address="insureFullAddress"
            :prefix="prefix"
            :delivery="delivery"
            :addr-province="addrProvinceForTax"
            :addr-district="addrDistrictForTax"
            :addr-sub-district="addrSubDistrictForTax"
            :addr-zip-code="addrZipCodeForTax"
            :addr-province2="addrProvinceForTax2"
            :addr-district2="addrDistrictForTax2"
            :addr-sub-district2="addrSubDistrictForTax2"
            :addr-zip-code2="addrZipCodeForTax2"
            :is-include-tax="packageSelect.IsTaxInclude"
            :shipping-policy="insuranceRecieve ? insuranceRecieve.ShippingPolicy : ''"
            :cache-order-request="taxInvoiceCache"
            @change-tax-invoice="handlerChangeTaxInvoice"
          ></OrderCompulsoryPlaceorderTaxInvoice>
          <ElementsModalAlert
            v-if="isError"
            :is-error="isError"
            :message="messageError"
            :reload="false"
          />
        </div>

        <!-- # # # # # # # # # # # # # # # # # # # # # Right Slide Bar # # # # # # # # # # # # # # # # # # # # #-->
        <div class="col-lg-4 col-xl-3">
          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">
              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลรถ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartCar
                v-if="infomation && carDetail"
                :car-detail="infomation.CarDetail"
                :car-use="infomation.CarUse"
                :is-car-red="carDetail.IsRedLicense"
                :effective-date="infomation.EffectiveDate"
                :expire-date="infomation.ExpireDate"
                :insurance-day="infomation.InsuranceDay"
              ></OrderCartCar>

              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลแพคเกจ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartPackage
                v-if="packageSelect && packageSelect.CompanyName != ''"
                :package-select="packageSelect"
              />
              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้เอาประกัน # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartInsure
                v-if="insureDetail && insuranceRecieve"
                :delivery-type="insuranceRecieve ? insuranceRecieve.ShippingPolicy : ''"
                :is-person="insureDetail.IsPerson"
                v-model:person-profile.sync="personProfile"
                v-model:legal-person-profile="legalPersonProfile"
              ></OrderCartInsure>
            </div>

            <OrderChecklist :list="checklist" @change-check-save="handlerCheckSave" />
          </aside>

          <!-- <FormKit
            type="submit"
            label="ไปเลือกวิธีชำระเงิน"
            name="order-submit"
            id="order-submit"
            :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }"

            :disabled="!checkSave"
            :loading="isLoading"
          /> -->

          <button
            type="button"
            class="formkit-input btn btn-primary form-actions"
            @click="submitOrder"
            label="ไปเลือกวิธีชำระเงิน"
            name="order-submit"
            id="order-submit"
            :disabled="!checkSave"
            :loading="isLoading"
          >
            ไปเลือกวิธีชำระเงิน
          </button>

          <NuxtLink @click="backStep()" class="btn btn-back mt-3">ย้อนกลับ</NuxtLink>
        </div>
      </div>
    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import type { IInformation } from "~~/shared/entities/information-entity";
import type {
  IPackageRequest,
  IPackageResponse,
  PaperRequest,
} from "~~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import type { IChecklist } from "~~/shared/entities/checklist-entity";
import type {
  DistrictReq,
  ICarColorReq,
  ICarColorResponse,
  MasterResponse,
  PrefixReq,
  SubDistrictReq,
} from "~/shared/entities/master-entity";
import type { SelectOption } from "~/shared/entities/select-option";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import type {
  DefaultAddress,
  CarDetailsExtension,
  DeliveryAddress,
  InsuranceRecieveObject,
  PlaceOrderRequest,
  CustomerOrderRequest,
  PersonProfile,
  LegalPersonProfile,
  TaxInvoiceDeliveryAddress,
  DeliveryMethod,
} from "~/shared/entities/placeorder-entity";
import type { Order, OrderDetailRequest, OrderResponse } from "~/shared/entities/order-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const SubCarModel: globalThis.Ref<String> = ref("");

const infomation: globalThis.Ref<IInformation | undefined> = ref();
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const carProvince: globalThis.Ref<SelectOption[]> = ref([]);
const carColor: globalThis.Ref<SelectOption[]> = ref([]);
const prefix: globalThis.Ref<SelectOption[]> = ref([]);
const prefixRecieve: globalThis.Ref<SelectOption[]> = ref([]);
const nationality: globalThis.Ref<SelectOption[]> = ref([]);

const addrProvinceForInsured: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrictForInsured: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrictForInsured: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCodeForInsured = ref("");

// const addrZipCode = ref(""); //TODO: Bug ZipCode

const addrProvinceForRecieve: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrictForRecieve: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrictForRecieve: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCodeForRecieve = ref("");

const addrProvinceForTax: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrictForTax: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrictForTax: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCodeForTax = ref("");

const addrProvinceForTax2: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrictForTax2: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrictForTax2: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCodeForTax2 = ref("");

const addrZipCode2 = ref("");

const delivery: globalThis.Ref<SelectOption[]> = ref([]);
const insureFullAddress: globalThis.Ref<string> = ref("");
const isSelect: globalThis.Ref<Boolean> = ref(false);
const defaultAddress: globalThis.Ref<DefaultAddress | undefined> = ref();

const carDetailCache: globalThis.Ref<CarDetailsExtension | undefined> = ref();
const insuranceRecieveCache: globalThis.Ref<InsuranceRecieveObject | undefined> = ref();
const insureDetailCache: globalThis.Ref<PlaceOrderRequest | undefined> = ref();
const taxInvoiceCache: globalThis.Ref<PlaceOrderRequest | undefined> = ref();

const carDetail: globalThis.Ref<CarDetailsExtension | undefined> = ref();
const insuranceRecieve: globalThis.Ref<InsuranceRecieveObject | undefined> = ref();
const insureDetail: globalThis.Ref<CustomerOrderRequest> = ref({});
const personProfile: globalThis.Ref<PersonProfile | undefined> = ref();
const legalPersonProfile: globalThis.Ref<LegalPersonProfile | undefined> = ref();
const RequestIncludeTax = ref(false);
const TaxInvoiceAddressShipped = ref("");
const TaxInvoiceAddressShipping = ref("");
const PaperCount = ref(0);
const isError = ref(false);
const messageError = ref("");
var checkSave: globalThis.Ref<Boolean> = ref(false);

let values = reactive({});

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "รายละเอียดรถ",
  },
  {
    id: "2",
    className: "",
    desc: "ข้อมูลผู้เอาประกันภัย",
  },
  {
    id: "3",
    className: "",
    desc: "วิธีการรับกรมธรรม์",
  },
  {
    id: "4",
    className: "",
    desc: "ใบกำกับภาษี",
  },
]);
const changeInsure = ref(false);
//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);

//define store
const storeInfo = useStoreInformation();
// define getter in store
const { CarInfo } = storeToRefs(storeInfo);

const storePackage = useStorePackage();

const { PackageInfo } = storeToRefs(storePackage);
//define store
const storeOrder = useStorePlaceorder();
// define getter in store
const { OrderInfo } = storeToRefs(storeOrder);

const storeOrderSummary = useStoreOrderSummary();
const { OrderSummaryInfo } = storeToRefs(storeOrderSummary);

const router = useRouter();
const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    if (
      PackageInfo.value &&
      PackageInfo.value.CompanyCode != "" &&
      CarInfo.value &&
      CarInfo.value.CarType != ""
    ) {
      infomation.value = CarInfo.value;
      SubCarModel.value = infomation.value.SubCarModel;

      packageSelect.value = PackageInfo.value;

      isLoading.value = true;
      await loadPapeRonHand();
      await loadProvince();
      await loadCarColor();
      await loadPrefix(true);
      await loadPrefixRecieve();
      await loadNationality();
      await loadDelivery();
      isLoading.value = false;
    } else {
      useStateMenu().setStateMenu(1);
      router.push("/order/compulsory/information");
    }
    
    if (OrderInfo.value && OrderInfo.value.OrderNo != "") {
      let insuranceRecieve: InsuranceRecieveObject = {
        ShippingPolicy: OrderInfo.value.DeliveryMethod1?.DeliveryType ?? "",
        Email: OrderInfo.value.DeliveryMethod1?.DeliveryEmail ?? "",
        PostalDelivary: {
          IsDeliveryAddressSameAsDefault:
            OrderInfo.value.Customer?.IsDeliveryAddressSameAsDefault ?? true,
          ShippingMethod: OrderInfo.value.DeliveryMethod1?.DeliveryChannelType ?? "",
          ShippingFee: "50 บาท", //TODO: MockUp
          DeliveryAddress: OrderInfo.value.Customer?.DeliveryAddress,
        },
      };
      // set cache Data Step1
      carDetailCache.value = OrderInfo.value.CarDetailsExtension;
      // set cache Data Step2
      insureDetailCache.value = OrderInfo.value;
      // set cache Data Step3
      insuranceRecieveCache.value = insuranceRecieve;
      // set cache Data Step4
      taxInvoiceCache.value = OrderInfo.value;

      const info = sessionStorage.getItem("useStoreOrderSummary") ?
          JSON.parse(sessionStorage.getItem("useStoreOrderSummary") || "") as OrderResponse : undefined
      if(info) {
        insureFullAddress.value = `${info.Order?.Customer?.TaxInvoiceAddress?.FirstName} ${info.Order?.Customer?.TaxInvoiceAddress?.LastName} 
                                   ${info.Order?.Customer?.TaxInvoiceAddress?.No} ${info.Order?.Customer?.TaxInvoiceAddress?.Moo} 
                                   ${info.Order?.Customer?.TaxInvoiceAddress?.Place} ${info.Order?.Customer?.TaxInvoiceAddress?.Building} 
                                   ${info.Order?.Customer?.TaxInvoiceAddress?.Alley} ${info.Order?.Customer?.TaxInvoiceAddress?.Road}`
      }
    }

    // if (OrderInfo.value) {
    //   console.log("OrderInfo", OrderInfo.value);
    //   let insuranceRecieve: InsuranceRecieveObject = {
    //     ShippingPolicy: OrderInfo.value.DeliveryMethod1?.DeliveryType ?? "",
    //     Email: OrderInfo.value.DeliveryMethod1?.DeliveryEmail ?? "",
    //     PostalDelivary: {
    //       IsDeliveryAddressSameAsDefault: true,
    //       ShippingMethod: OrderInfo.value.DeliveryMethod1?.DeliveryChannelType ?? "",
    //       ShippingFee: "50 บาท", //TODO: MockUp
    //       DeliveryAddress: OrderInfo.value.Customer?.DeliveryAddress,
    //     },
    //   };
    //   // set cache Data Step1
    //   carDetailCache.value = OrderInfo.value.CarDetailsExtension;
    //   // set cache Data Step2
    //   insureDetailCache.value = OrderInfo.value;
    //   // set cache Data Step3
    //   insuranceRecieveCache.value = insuranceRecieve;
    //   // set cache Data Step4
    //   taxInvoiceCache.value = OrderInfo.value;
    // }
  } else {
    router.push("/login");
  }
});

// Submit form event
const submitOrder = async (formData: any) => {
  isLoading.value = true;

  let orderNo = OrderInfo.value?.OrderNo;
  if (insuranceRecieve.value?.ShippingPolicy == "postal") {
    if (!insuranceRecieve.value?.PostalDelivary?.IsDeliveryAddressSameAsDefault) {
      insureDetail.value.DeliveryAddress =
        insuranceRecieve.value?.PostalDelivary?.DeliveryAddress;
    }
  }

  insureDetail.value.IsDeliveryAddressSameAsDefault =
    insuranceRecieve.value?.PostalDelivary?.IsDeliveryAddressSameAsDefault;
  let DeliveryMethod = getDeliveryMethod();
  let DeliveryMethod2 = null;
  if (DeliveryMethod[1].MethodType != "") {
    DeliveryMethod2 = DeliveryMethod[1];
  }

  if(insureDetail.value.DefaultAddress?.AddressID) {
    if(insureDetail.value.DeliveryAddress?.ProvinceID)
      insureDetail.value.DeliveryAddress.AddressID = insureDetail.value.DefaultAddress?.AddressID
    if(insureDetail.value.TaxInvoiceAddress?.ProvinceID)
      insureDetail.value.TaxInvoiceAddress.AddressID = insureDetail.value.DefaultAddress?.AddressID
    if(insureDetail.value.TaxInvoiceDeliveryAddress?.ProvinceID)
      insureDetail.value.TaxInvoiceDeliveryAddress.AddressID = insureDetail.value.DefaultAddress?.AddressID
  }
  const orderReq: PlaceOrderRequest = {
    OrderNo: orderNo ?? undefined,
    Package: {
      UseCarCode: infomation.value?.CarUse ?? "",
      CarTypeCode: infomation.value?.CarType ?? "",
      CarCategoryID: infomation.value?.CarSize ?? "",
      CarSalesYear: infomation.value?.CarYear ?? "",
      CarBrandID: infomation.value?.CarBrand ?? "",
      CarModelID: infomation.value?.CarModel ?? "",
      SubCarModelID: infomation.value?.SubCarModel.split("|")[0] ?? "",
      CompanyCode: packageSelect.value?.CompanyCode ?? "",
      AgentCode: packageSelect.value?.AgentCode ?? "",
      EffectiveType: infomation.value?.EffectiveType ?? "",
      EffectiveDate: infomation.value?.EffectiveDate ?? "",
      ExpireDate: infomation.value?.ExpireDate ?? "",
    },
    CarDetailsExtension: carDetail.value,
    Customer: insureDetail.value,
    DeliveryMethod1: DeliveryMethod[0],
    DeliveryMethod2: RequestIncludeTax.value ? DeliveryMethod2 : null,
    IsTaxInvoice: RequestIncludeTax.value,
  };
  storeOrder.setOrder(orderReq);
  isError.value = false;
  messageError.value = "";

  console.log("orderReq", orderReq);
  //create order
   if (!orderReq.OrderNo || orderReq.OrderNo == "") {
     const response = await useRepository().order.create(orderReq);

     if (
       response.apiResponse.Status &&
       response.apiResponse.Status == "200" &&
       response.apiResponse.Data
     ) {
       orderReq.OrderNo = response.apiResponse.Data.OrderNo;
     } else {
       isError.value = true;
       messageError.value = response.apiResponse.ErrorMessage ?? "";
     }
   } else {
     // edit order
     const response = await useRepository().order.save(orderReq);

     if (
       response.apiResponse.Status &&
       response.apiResponse.Status == "200" &&
       response.apiResponse.Data
     ) {
       orderReq.OrderNo = response.apiResponse.Data.OrderNo;
     } else {
       isError.value = true;
       messageError.value = response.apiResponse.ErrorMessage ?? "";
     }
   }
   if (!isError.value) {
     // get order after save or create
     const req: OrderDetailRequest = {
       OrderNo: orderReq.OrderNo ?? "",
     };
     const getData = await useRepository().order.summary(req);
     if (
       getData.apiResponse.Status &&
       getData.apiResponse.Status == "200" &&
       getData.apiResponse.Data &&
       getData.apiResponse.Data.length > 0
     ) {
       const summaryOrder = getData.apiResponse.Data[0].Order as Order
       const orderSetStore: PlaceOrderRequest = {
         OrderNo: orderReq.OrderNo,
         Package: summaryOrder.Package,
         CarDetailsExtension: summaryOrder.CarDetailsExtension,
         Customer: summaryOrder.Customer,
         DeliveryMethod1: summaryOrder.DeliveryMethod1,
         DeliveryMethod2: summaryOrder.DeliveryMethod2,
         IsTaxInvoice: summaryOrder.IsTaxInvoice,
       };
       
       storeOrder.setOrder(orderSetStore);
       useStateMenu().setStateMenu(4);
       router.push("/order/compulsory/payment");
     }
   }
   //set state menu

  isLoading.value = false;
};

const backStep = async () => {
  useStateMenu().setStateMenu(2);
  router.push("/order/compulsory/packages");
};

const getDeliveryMethod = (): DeliveryMethod[] => {
  let data: DeliveryMethod[] = [
    {
      DeliveryChannelType: "",
      DeliveryEmail: "",
      DeliveryType: "",
      MethodType: "",
    },
    {
      DeliveryChannelType: "",
      DeliveryEmail: "",
      DeliveryType: "",
      MethodType: "",
    },
  ];
  if (insuranceRecieve.value) {
    switch (insuranceRecieve.value.ShippingPolicy) {
      //รับเป็นไฟล์ PDF
      case "pdf":
        data[0] = {
          DeliveryChannelType:
            insuranceRecieve.value?.PostalDelivary?.ShippingMethod ?? "",
          DeliveryEmail: insuranceRecieve.value?.Email ?? "",
          DeliveryType: "ELECTRONIC",
          MethodType: "EXCLUDE",
        };
        data[1] = {
          DeliveryChannelType: TaxInvoiceAddressShipping.value,
          DeliveryEmail: "",
          DeliveryType: "DELIVERY",
          MethodType: "TAXINVOICE",
        };
        break;
      //พิมพ์ลงกระดาษมัดจำ
      case "print":
        data[0] = {
          DeliveryChannelType:
            insuranceRecieve.value?.PostalDelivary?.ShippingMethod ?? "",
          DeliveryEmail: "",
          DeliveryType: "PAPER",
          MethodType: "EXCLUDE",
        };
        data[1] = {
          DeliveryChannelType: TaxInvoiceAddressShipping.value,
          DeliveryEmail: "",
          DeliveryType: "DELIVERY",
          MethodType: "TAXINVOICE",
        };
        break;
      // จัดส่งตัวจริง
      case "postal":
        //จัดส่งพร้อมกรมธรรม์
        if (RequestIncludeTax.value) {
          if (TaxInvoiceAddressShipped.value == "together") {
            data[0] = {
              DeliveryChannelType:
                insuranceRecieve.value?.PostalDelivary?.ShippingMethod ?? "",
              DeliveryEmail: "",
              DeliveryType: "DELIVERY",
              MethodType: "ALL_AT_ONCE",
            };
            data[1] = {
              DeliveryChannelType: "",
              DeliveryEmail: "",
              DeliveryType: "",
              MethodType: "",
            };
          }
          //จัดส่งแยก
          else {
            data[0] = {
              DeliveryChannelType:
                insuranceRecieve.value?.PostalDelivary?.ShippingMethod ?? "",
              DeliveryEmail: "",
              DeliveryType: "DELIVERY",
              MethodType: "POLICY",
            };
            data[1] = {
              DeliveryChannelType: TaxInvoiceAddressShipping.value,
              DeliveryEmail: "",
              DeliveryType: "DELIVERY",
              MethodType: "TAXINVOICE",
            };
          }
        } else {
          data[0] = {
            DeliveryChannelType:
              insuranceRecieve.value?.PostalDelivary?.ShippingMethod ?? "",
            DeliveryEmail: "",
            DeliveryType: "DELIVERY",
            MethodType: "POLICY",
          };
        }
        break;
    }
  }
  return data;
};
// handle loading api & set refs
const loadPrefix = async (isPerson: boolean) => {
  const req: PrefixReq = {
    IsPerson: isPerson,
  };
  const response = await useRepository().master.prefix(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      prefix.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
      prefix.value.unshift({
        label: "เลือกคำนำหน้า",
        value: "",
        attrs: { disabled: true },
      });
      console.log("prefix.value", prefix.value);
    } else {
      // data not found
    }
  } else {
  }
};
const loadPrefixRecieve = async () => {
  const req: PrefixReq = {
    IsPerson: true,
  };
  const response = await useRepository().master.prefix(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      prefixRecieve.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
      prefixRecieve.value.unshift({
        label: "เลือกคำนำหน้า",
        value: "",
        attrs: { disabled: true },
      });
    } else {
      // data not found
    }
  } else {
  }
};
const loadPapeRonHand = async () => {
  if (PackageInfo.value && PackageInfo.value.Paper) {
    const req: PaperRequest = {
      ProductID: PackageInfo.value.Paper.ProductID,
    };
    const response = await useRepository().pledge.paperonhand(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      if (response.apiResponse.Data) {
        if (packageSelect.value && packageSelect.value?.Paper) {
          packageSelect.value.Paper.Quantity = response.apiResponse.Data[0].Quantity;
        }
      } else {
        // data not found
      }
    } else {
    }
  }
};
const loadProvince = async () => {
  const response = await useRepository().master.province();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      carProvince.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
  addrProvinceForInsured.value = carProvince.value;
  addrProvinceForRecieve.value = carProvince.value;
  addrProvinceForTax.value = carProvince.value;
  addrProvinceForTax2.value = carProvince.value;
};
const loadDistrict = async (provId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: DistrictReq = {
    ProvinceID: provId,
  };
  const response = await useRepository().master.district(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const opt: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return opt;
      });
    } else {
      // data not found
    }
  } else {
  }

  return options;
};
const loadSubDistrict = async (distId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: SubDistrictReq = {
    DistrictID: distId,
  };
  const response = await useRepository().master.subDistrict(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: `${x.Name} : ${x.ZipCode}`,
          value: x.ID,
          option: x.ZipCode ?? "",
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }

  return options;
};
const loadZipCodeForInsured = async (subDistId: string): Promise<string> => {
  let option = "";
  const filter = addrSubDistrictForInsured.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    option = filter[0].option ?? "";
  }
  return option;
};
const loadZipCodeForRecieve = async (subDistId: string): Promise<string> => {
  let option = "";
  const filter = addrSubDistrictForRecieve.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    option = filter[0].option ?? "";
  }
  return option;
};
const loadZipCodeForTax = async (subDistId: string): Promise<string> => {
  let option = "";
  const filter = addrSubDistrictForTax.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    option = filter[0].option ?? "";
  }
  return option;
};
const loadZipCodeForTax2 = async (subDistId: string): Promise<string> => {
  let option = "";
  const filter = addrSubDistrictForTax2.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    option = filter[0].option ?? "";
  }
  return option;
};
const loadDelivery = async () => {
  const response = await useRepository().delivery.channel();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      delivery.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.Type,
          option: x.Cost.toString(),
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
};
const loadNationality = async () => {
  const response = await useRepository().master.nationality();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      nationality.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
};
const loadCarColor = async () => {
  if (PackageInfo.value) {
    let carColorList: SelectOption[] = [];
    const req: ICarColorReq = {
      // CompanyCode: PackageInfo.value.CompanyCode,
      CompanyCode: "TMW", //TODO: MockUo
    };
    const responseColor = await useRepository().master.carColor(req);

    responseColor.apiResponse.Data?.forEach((obj: ICarColorResponse) => {
      let color: SelectOption = {
        label: obj.Name,
        value: obj.CarColorID,
      };
      carColorList.push(color);
    });
    carColor.value = carColorList;
  }
};

// handler function for emit
const handlerChangeCustomerType = async (e: string) => {
  if (e) {
    isLoading.value = true;
    await loadPrefix(e == "person");

    isLoading.value = false;
  }
};
const handlerChangeProvinceForInsured = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrDistrictForInsured.value = await loadDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeProvinceForRecieve = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrDistrictForRecieve.value = await loadDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeProvinceForTax = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrDistrictForTax.value = await loadDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeProvinceForTax2 = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrDistrictForTax2.value = await loadDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeDistrictForInsured = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrSubDistrictForInsured.value = await loadSubDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeDistrictForRecieve = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrSubDistrictForRecieve.value = await loadSubDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeDistrictForTax = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrSubDistrictForTax.value = await loadSubDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeDistrictForTax2 = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrSubDistrictForTax2.value = await loadSubDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeSubDistrictForInsured = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrZipCodeForInsured.value = await loadZipCodeForInsured(e);
    isLoading.value = false;
  }
};
const handlerChangeSubDistrictForRecieve = async (e: string) => {
  if (e) {
    // console.log('handlerChangeSubDistrictForRecieve',e)
    isLoading.value = true;
    addrZipCodeForRecieve.value = await loadZipCodeForRecieve(e);
    isLoading.value = false;
  }
};
const handlerChangeSubDistrictForTax = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrZipCodeForTax.value = await loadZipCodeForTax(e);
    isLoading.value = false;
  }
};
const handlerChangeSubDistrictForTax2 = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrZipCodeForTax2.value = await loadZipCodeForTax2(e);
    isLoading.value = false;
  }
};
// const handlerChangeProvince2 = async (e: string) => {
//   if (e) {
//     isLoading.value = true;
//     addrDistrict2.value = await loadDistrict(e);

//     isLoading.value = false;
//   }
// };
// const handlerChangeDistrict2 = async (e: string) => {
//   if (e) {
//     isLoading.value = true;
//     addrSubDistrict2.value = await loadSubDistrict(e);

//     isLoading.value = false;
//   }
// };
// const handlerChangeSubDistrict2 = async (e: string) => {
//   if (e) {
//     isLoading.value = true;
//     addrZipCode2.value = await loadZipCode(e);
//     isLoading.value = false;
//   }
// };
const handlerChangeFullAddress = (addr: string, ObjectAddress: DefaultAddress) => {
  if (ObjectAddress) {
    defaultAddress.value = ObjectAddress;
  }
  if (addr) {
    insureFullAddress.value =
      `${ObjectAddress.PrefixName} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} ` +
      addr;
  }
};
const handleCheckCarDetail = async (objectCarDetail: CarDetailsExtension) => {
  console.log("handleCheckCarDetail", objectCarDetail);
  if (
    objectCarDetail.License.length > 0 &&
    objectCarDetail.LicenseProvinceID.length > 0 &&
    objectCarDetail.ColorID.length > 0 &&
    objectCarDetail.BodyNo.length > 0
  ) {
    if (SubCarModel.value === "unknown" || SubCarModel.value === "other") {
      if (objectCarDetail.LicenseFileID.length > 0)
        checklist.value[0].className = "current";
      else checklist.value[0].className = "";
    } else checklist.value[0].className = "current";
  } else {
    checklist.value[0].className = "";
  }

  carDetail.value = objectCarDetail;
};
const handleCheckInsuranceRecieve = async (RecieveObject: InsuranceRecieveObject) => {
  // console.log('RecieveObject', RecieveObject)
  switch (RecieveObject.ShippingPolicy) {
    case "pdf":
      if (RecieveObject.Email.length > 0) checklist.value[2].className = "current";
      else checklist.value[2].className = "";
      break;
    case "print":
      checklist.value[2].className = "current";
      break;
    case "postal":
      if (RecieveObject.PostalDelivary?.IsDeliveryAddressSameAsDefault) {
        if (RecieveObject.PostalDelivary?.ShippingMethod.length > 0)
          checklist.value[2].className = "current";
        else checklist.value[2].className = "";
      } else {
        let deliveryAddress = RecieveObject.PostalDelivary?.DeliveryAddress;
        // console.log("deliveryAddress", deliveryAddress);
        if (deliveryAddress && RecieveObject.PostalDelivary?.ShippingMethod != "") {
          if (
            // deliveryAddress.AddressText.length > 0 &&
            deliveryAddress.PhoneNumber.length > 0 &&
            deliveryAddress.FirstName.length > 0 &&
            deliveryAddress.LastName.length > 0 &&
            deliveryAddress.No.length > 0 &&
            deliveryAddress.ProvinceID.length > 0 &&
            deliveryAddress.DistrictID.length > 0 &&
            deliveryAddress.SubDistrictID.length > 0
          ) {
            checklist.value[2].className = "current";
          } else checklist.value[2].className = "";
        } else checklist.value[2].className = "";
      }
      break;
  }
  insuranceRecieve.value = RecieveObject;
};
const handlerChangeInsureDetail = (InsureDetail: CustomerOrderRequest) => {
  console.log("InsureDetail", InsureDetail);
  checklist.value[1].className = "";
  changeInsure.value = true;
  insureDetail.value = InsureDetail;
  personProfile.value = InsureDetail.PersonProfile;
  legalPersonProfile.value = InsureDetail.LegalPersonProfile;
  //insureDetail.value.DefaultAddress = defaultAddress.value

  // set checklist
  if (insureDetail.value) {
    if (
      insureDetail.value.IsPerson &&
      insureDetail.value.PersonProfile &&
      insureDetail.value.DefaultAddress
    ) {
      //บุคคลธรรมดา คนไทย
      if (
        insureDetail.value.PersonProfile.NationalityID ==
        "62ED0829703B4E589A2A63C740B88155"
      ) {
        if (
          insureDetail.value.PersonProfile.PrefixID.length > 0 &&
          insureDetail.value.PersonProfile.FirstName.length > 0 &&
          insureDetail.value.PersonProfile.LastName.length > 0 &&
          insureDetail.value.PersonProfile.BirthDate.length > 0 &&
          insureDetail.value.PersonProfile.PersonalID.length > 0 &&
          insureDetail.value.PersonProfile.PhoneNumber.length > 0 &&
          insureDetail.value.DefaultAddress.No.length > 0 &&
          insureDetail.value.DefaultAddress.ProvinceID.length > 0 &&
          insureDetail.value.DefaultAddress.DistrictID.length > 0 &&
          insureDetail.value.DefaultAddress.SubDistrictID.length > 0
        ) {
          checklist.value[1].className = "current";
        } else {
          checklist.value[1].className = "";
        }
      } else {
        //บุคคลธรรมดา คนต่างชาติ
        if (
          insureDetail.value.PersonProfile.PrefixID.length > 0 &&
          insureDetail.value.PersonProfile.FirstName.length > 0 &&
          insureDetail.value.PersonProfile.LastName.length > 0 &&
          insureDetail.value.PersonProfile.BirthDate.length > 0 &&
          insureDetail.value.PersonProfile.PersonalID.length > 0 &&
          insureDetail.value.PersonProfile.NationalityID.length > 0 &&
          insureDetail.value.PersonProfile.PhoneNumber.length > 0 &&
          insureDetail.value.DefaultAddress.No.length > 0 &&
          insureDetail.value.DefaultAddress.ProvinceID.length > 0 &&
          insureDetail.value.DefaultAddress.DistrictID.length > 0 &&
          insureDetail.value.DefaultAddress.SubDistrictID.length > 0
        ) {
          checklist.value[1].className = "current";
        } else {
          checklist.value[1].className = "";
        }
      }
    } else if (
      insureDetail.value.LegalPersonProfile &&
      insureDetail.value.DefaultAddress
    ) {
      if (insureDetail.value.IsBranch) {
        if (
          insureDetail.value.LegalPersonProfile.PrefixID.length > 0 &&
          insureDetail.value.LegalPersonProfile.Name.length > 0 &&
          insureDetail.value.LegalPersonProfile.ContactPhoneNumber.length > 0 &&
          insureDetail.value.LegalPersonProfile.TaxID.length > 0 &&
          insureDetail.value.LegalPersonProfile.BranchID.length > 0 &&
          insureDetail.value.LegalPersonProfile.BranchName.length > 0 &&
          insureDetail.value.DefaultAddress.No.length > 0 &&
          insureDetail.value.DefaultAddress.ProvinceID.length > 0 &&
          insureDetail.value.DefaultAddress.DistrictID.length > 0 &&
          insureDetail.value.DefaultAddress.SubDistrictID.length > 0
        ) {
          checklist.value[1].className = "current";
        } else {
          checklist.value[1].className = "";
        }
      } else {
        if (
          insureDetail.value.LegalPersonProfile.PrefixID.length > 0 &&
          insureDetail.value.LegalPersonProfile.Name.length > 0 &&
          insureDetail.value.LegalPersonProfile.ContactPhoneNumber.length > 0 &&
          insureDetail.value.LegalPersonProfile.TaxID.length > 0 &&
          insureDetail.value.DefaultAddress.No.length > 0 &&
          insureDetail.value.DefaultAddress.ProvinceID.length > 0 &&
          insureDetail.value.DefaultAddress.DistrictID.length > 0 &&
          insureDetail.value.DefaultAddress.SubDistrictID.length > 0
        ) {
          checklist.value[1].className = "current";
        } else {
          checklist.value[1].className = "";
        }
      }
    }
  }
  changeInsure.value = false;
};
const handlerChangeTaxInvoice = (
  InsureDetail: CustomerOrderRequest,
  isIncludeTax: boolean,
  shippedPolicy: string,
  ShippingMethod: string
) => {
  let validate = [false, false];
  RequestIncludeTax.value = isIncludeTax;
  TaxInvoiceAddressShipped.value = shippedPolicy;
  TaxInvoiceAddressShipping.value = ShippingMethod;
  if (!insureDetail.value) {
    insureDetail.value = InsureDetail;
  }

  if (InsureDetail.TaxInvoiceAddress) {
    insureDetail.value.TaxInvoiceAddress = InsureDetail.TaxInvoiceAddress;
  }
  if (InsureDetail.TaxInvoiceDeliveryAddress) {
    insureDetail.value.TaxInvoiceDeliveryAddress = InsureDetail.TaxInvoiceDeliveryAddress;
  }
  // if (InsureDetail.IsTaxInvoiceAddressSameAsDefault) {
  //   insureDetail.value.IsTaxInvoiceAddressSameAsDefault = InsureDetail.IsTaxInvoiceAddressSameAsDefault;
  // }
  insureDetail.value.IsTaxInvoiceAddressSameAsDefault = InsureDetail.IsTaxInvoiceAddressSameAsDefault;
  // if (InsureDetail.IsTaxInvoiceDeliveryAddressSameAsDefault) {
  //   insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault = InsureDetail.IsTaxInvoiceDeliveryAddressSameAsDefault;
  // }
  insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault = InsureDetail.IsTaxInvoiceDeliveryAddressSameAsDefault;

  if (isIncludeTax) {
    if (insuranceRecieve.value) {
      // set ที่อยู่จีดส่งเอกสารใบกำกับภาษี กรณีเลือก วิธีรับกรมธรรม์ จัดส่งตัวจริง และเลือกเป็นจัดส่งพร้อมกรมธรรม์
      console.log("insuranceRecieve.value", insuranceRecieve.value);
      console.log("shippedPolicy", shippedPolicy);
      if (
        insuranceRecieve.value.ShippingPolicy == "postal" &&
        shippedPolicy == "together"
      ) {
        insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault =
          insuranceRecieve.value.PostalDelivary?.IsDeliveryAddressSameAsDefault;
        insureDetail.value.TaxInvoiceDeliveryAddress = insuranceRecieve.value
          .PostalDelivary?.DeliveryAddress as TaxInvoiceDeliveryAddress;
      }

      if (insureDetail.value.IsTaxInvoiceAddressSameAsDefault == false) {
        // ไม่ใช่ default จาก ที่อยู่ผู้เอาประกัน
        if (insureDetail.value.TaxInvoiceAddress) {
          if (
            insureDetail.value.TaxInvoiceAddress.No.length > 0 &&
            insureDetail.value.TaxInvoiceAddress.ProvinceID.length > 0 &&
            insureDetail.value.TaxInvoiceAddress.DistrictID.length > 0 &&
            insureDetail.value.TaxInvoiceAddress.SubDistrictID.length > 0
          ) {
            validate[0] = true;
          } else {
            validate[0] = false;
          }
        } else {
          validate[0] = false;
        }
      } else {
        validate[0] = true;
      }

      if (shippedPolicy != "together") {
        if (insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault == false) {
          if (insureDetail.value.TaxInvoiceDeliveryAddress) {
            if (
              insureDetail.value.TaxInvoiceDeliveryAddress.No.length > 0 &&
              insureDetail.value.TaxInvoiceDeliveryAddress.ProvinceID.length > 0 &&
              insureDetail.value.TaxInvoiceDeliveryAddress.DistrictID.length > 0 &&
              insureDetail.value.TaxInvoiceDeliveryAddress.SubDistrictID.length > 0 &&
              ShippingMethod != ""
            ) {
              validate[1] = true;
            } else {
              validate[1] = false;
            }
          } else {
            validate[1] = true;
          }
        } else {
          if (ShippingMethod != "") {
            validate[1] = true;
          } else {
            validate[1] = false;
          }
        }
      } else {
        validate[1] = true;
      }
    }
  } else {
    validate = [true, true];
  }

  if (validate.filter((x) => x).length == 2) {
    checklist.value[3].className = "current";
  } else {
    checklist.value[3].className = "";
  }
};
const handlerCheckSave = (check: boolean) => {
  checkSave.value = check;
};

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = true;
const showPageHeader = true;

// Define page meta
const pageTitle = "ข้อมูลสั่งซื้อ";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "Compulsory ข้อมูลสั่งซื้อ";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-placeholder",
  },
});
</script>
