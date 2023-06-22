<template>
  <NuxtLayout :name="layout">
    <FormKit
      type="form"
      @submit="submitOrder"
      :actions="false"
      id="form-order"
      form-class="form-order form-theme"
      #default="{ value }"
      v-model="values"
      :incomplete-message="false"
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
           v-if="prefix.length>0 && nationality.length>0 && addrProvince.length>0"
            @change-province="handlerChangeProvince"
            @change-district="handlerChangeDistrict"
            @change-sub-district="handlerChangeSubDistrict"
            @change-customer-type="handlerChangeCustomerType"
            @change-full-address="handlerChangeFullAddress"
            @change-insure-detail="handlerChangeInsureDetail"
            :prefix="prefix"
            :nationality="nationality"
            :addr-province="addrProvince"
            :addr-district="addrDistrict"
            :addr-sub-district="addrSubDistrict"
            :addr-zip-code="addrZipCode"
          ></OrderCompulsoryPlaceorderInsureDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # วิธีการรับกรมธรรม์ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsuranceRecieve
            v-if="prefix.length>0 && addrProvince.length>0"
            @change-province="handlerChangeProvince"
            @change-district="handlerChangeDistrict"
            @change-sub-district="handlerChangeSubDistrict"
            @check-insurance-recieve="handleCheckInsuranceRecieve"
            :insure-full-address="insureFullAddress"
            :prefix="prefix"
            :delivery="delivery"
            :addr-province="addrProvince"
            :addr-district="addrDistrict"
            :addr-sub-district="addrSubDistrict"
            :addr-zip-code="addrZipCode"
            :package-select="packageSelect"
          ></OrderCompulsoryPlaceorderInsuranceRecieve>

          <!-- # # # # # # # # # # # # # # # # # # # # # ใบกำกับภาษี # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderTaxInvoice
            v-if="packageSelect && prefix.length>0 && delivery.length>0 && addrProvince.length>0"
            @change-province="handlerChangeProvince"
            @change-district="handlerChangeDistrict"
            @change-sub-district="handlerChangeSubDistrict"
            :insure-full-address="insureFullAddress"
            :prefix="prefix"
            :delivery="delivery"
            :addr-province="addrProvince"
            :addr-district="addrDistrict"
            :addr-sub-district="addrSubDistrict"
            :addr-zip-code="addrZipCode"
            :is-include-tax="packageSelect.IsTaxInclude"
            :shipping-policy="insuranceRecieve ? insuranceRecieve.ShippingPolicy : ''"
          ></OrderCompulsoryPlaceorderTaxInvoice>
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
              <OrderCartInsure></OrderCartInsure>
            </div>

            <OrderChecklist :list="checklist" />
          </aside>

          <FormKit
            type="submit"
            label="ไปเลือกวิธีการชำระเงิน"
            name="order-submit"
            id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }"
            :disabled="!checkSave"
            :loading="isLoading"
          />

          <NuxtLink to="packages" class="btn btn-back">ย้อนกลับ</NuxtLink>
        </div>
      </div>
    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageRequest, IPackageResponse } from "~~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";
import {
  DistrictReq,
  ICarColorReq,
  ICarColorResponse,
  MasterResponse,
  PrefixReq,
  SubDistrictReq,
} from "~/shared/entities/master-entity";
import { SelectOption } from "~/shared/entities/select-option";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import {
  DefaultAddress,
  CarDetailsExtension,
  DeliveryAddress,
  InsuranceRecieveObject,
  OrderRequest,
  CustomerOrderRequest,
} from "~/shared/entities/placeorder-entity";

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
const nationality: globalThis.Ref<SelectOption[]> = ref([]);
const addrProvince: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCode = ref("");
const delivery: globalThis.Ref<SelectOption[]> = ref([]);
const insureFullAddress: globalThis.Ref<string> = ref("");
const isSelect: globalThis.Ref<Boolean> = ref(false);
const defaultAddress: globalThis.Ref<DefaultAddress | undefined> = ref();

const carDetailCache: globalThis.Ref<CarDetailsExtension | undefined> = ref();
const insuranceRecieveCache: globalThis.Ref<InsuranceRecieveObject | undefined> = ref();

const carDetail: globalThis.Ref<CarDetailsExtension | undefined> = ref();
const insuranceRecieve: globalThis.Ref<InsuranceRecieveObject | undefined> = ref();
const insureDetail: globalThis.Ref<CustomerOrderRequest> = ref({});

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

//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);

//define store
const storeInfo = useStoreInformation();
// define getter in store
const { CarInfo } = storeToRefs(storeInfo);

//define store
const storePackage = useStorePackage();
// define getter in store
const { PackageInfo } = storeToRefs(storePackage);

//define store
const storeOrder = useStorePlaceorder();
// define getter in store
const { OrderInfo } = storeToRefs(storeOrder);

const router = useRouter();

watch(checklist, async (newValue) => {
  newValue.forEach((e: IChecklist) => {
    if(e.className == 'current') checkSave.value = true
    else checkSave.value = false
  })
});

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    console.log(PackageInfo.value, CarInfo.value);
    if (PackageInfo.value && CarInfo.value) {
      infomation.value = CarInfo.value
      SubCarModel.value = infomation.value.SubCarModel;

      packageSelect.value = PackageInfo.value

      isLoading.value = true;
      await loadProvince();
      await loadCarColor();
      await loadPrefix(true);
      await loadNationality();
      await loadDelivery();
      isLoading.value = false;
    } else {
      router.push("/order/compulsory/packages");
    }

    console.log('OrderInfo', OrderInfo.value)
    if(OrderInfo.value) {
      carDetailCache.value = OrderInfo.value.CarDetailsExtension

      let insuranceRecieve: InsuranceRecieveObject = {
        ShippingPolicy: OrderInfo.value.DeliveryType ?? '',
        Email: OrderInfo.value.DeliveryEmail ?? '',
        PostalDelivary: {
          IsDeliveryAddressSameAsDefault: true,
          ShippingMethod: '92AFE865AA2041B1AC01E3DB2330C9D8', //TODO: Mock up 
          ShippingFee: '50 บาท',  //TODO: Mock up
          DeliveryAddress: OrderInfo.value.Customer?.DeliveryAddress
        }
      }
    }
  } else {
    router.push("/login");
  }
});
// Submit form event
const submitOrder = async (formData: any) => {
  storeOrder.clearOrder();
  if(insuranceRecieve.value?.ShippingPolicy == 'postal'){
    if(insuranceRecieve.value?.PostalDelivary?.IsDeliveryAddressSameAsDefault){
      insureDetail.value.DeliveryAddress = {
        AddressID: insureDetail.value.DefaultAddress?.AddressID ?? '',
        ReferenceID: insureDetail.value.DefaultAddress?.ReferenceID ?? '',
        ReferenceType: insureDetail.value.DefaultAddress?.ReferenceType ?? '',
        ProvinceID: insureDetail.value.DefaultAddress?.ProvinceID ?? '',
        DistrictID: insureDetail.value.DefaultAddress?.DistrictID ?? '',
        SubDistrictID: insureDetail.value.DefaultAddress?.SubDistrictID ?? '',
        TaxID: insureDetail.value.DefaultAddress?.TaxID ?? '',
        FirstName: insureDetail.value.DefaultAddress?.FirstName ?? '',
        LastName: insureDetail.value.DefaultAddress?.LastName ?? '',
        PhoneNumber: insureDetail.value.DefaultAddress?.PhoneNumber ?? '',
        Email: insureDetail.value.DefaultAddress?.Email ?? '',
        Name: insureDetail.value.DefaultAddress?.Name ?? '',
        Type: insureDetail.value.DefaultAddress?.Type ?? '',
        AddressLine1: insureDetail.value.DefaultAddress?.AddressLine1 ?? '',
        AddressLine2: insureDetail.value.DefaultAddress?.AddressLine2 ?? '',
        AddressText: insureDetail.value.DefaultAddress?.AddressText ?? '',
        No: insureDetail.value.DefaultAddress?.No ?? '',
        Moo: insureDetail.value.DefaultAddress?.Moo ?? '',
        Place: insureDetail.value.DefaultAddress?.Place ?? '',
        Building: insureDetail.value.DefaultAddress?.Building ?? '',
        Floor: insureDetail.value.DefaultAddress?.Floor ?? '',
        Room: insureDetail.value.DefaultAddress?.Room ?? '',
        Branch: insureDetail.value.DefaultAddress?.Branch ?? '',
        Alley: insureDetail.value.DefaultAddress?.Alley ?? '',
        Road: insureDetail.value.DefaultAddress?.Road ?? '',
      }
    }
    else{
      insureDetail.value.DeliveryAddress = insuranceRecieve.value?.PostalDelivary?.DeliveryAddress 
    }
  }

  insureDetail.value.IsDeliveryAddressSameAsDefault = insuranceRecieve.value?.PostalDelivary?.IsDeliveryAddressSameAsDefault

  let orderReq: OrderRequest = {
    Package: {
      UseCarCode: infomation.value?.CarUse ?? "",
      CarTypeCode: infomation.value?.CarType ?? "",
      CarCategoryID: infomation.value?.CarSize ?? "",
      CarSalesYear: infomation.value?.CarYear ?? "",
      CarBrandID: infomation.value?.CarBrand ?? "",
      CarModelID: infomation.value?.CarModel ?? "",
      SubCarModelID: infomation.value?.SubCarModel ?? "",
      CompanyCode: packageSelect.value?.CompanyCode ?? "",
      AgentCode: "",
      EffectiveType: infomation.value?.EffectiveType ?? "",
      EffectiveDate: infomation.value?.EffectiveDate ?? "",
      ExpireDate: infomation.value?.ExpireDate ?? ""
    },
    CarDetailsExtension: carDetail.value,
    Customer: insureDetail.value, 
    DeliveryType: insuranceRecieve.value?.ShippingPolicy,
    DeliveryEmail: insuranceRecieve.value?.Email,
    IsTaxInvoice: packageSelect.value?.IsTaxInclude == '1' ? true : false
  }
  storeOrder.setOrder(orderReq);

  const response = await useRepository().order.create(orderReq);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    //TODO: Implement next step
  }
  // Add waiting time for debug
  // await new Promise((r) => setTimeout(r, 1000));
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
    } else {
      // data not found
    }
  } else {
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
  addrProvince.value = carProvince.value;
};
const loadDistrict = async (provId: string) => {
  const req: DistrictReq = {
    ProvinceID: provId,
  };
  const response = await useRepository().master.district(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      addrDistrict.value = response.apiResponse.Data.map((x) => {
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
const loadSubDistrict = async (distId: string) => {
  const req: SubDistrictReq = {
    DistrictID: distId,
  };
  const response = await useRepository().master.subDistrict(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      addrSubDistrict.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
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
};
const loadZipCode = async (subDistId: string) => {
  const filter = addrSubDistrict.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    addrZipCode.value = filter[0].option ?? "";
  }
};
const loadDelivery = async () => {
  const response = await useRepository().delivery.channel();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      delivery.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
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
      CompanyCode: PackageInfo.value.CompanyCode,
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
  console.log("handlerChangeCustomerType", e);
  if (e) {
    isLoading.value = true;
    await loadPrefix(e == "person");
    console.log(prefix);
    isLoading.value = false;
  }
};
const handlerChangeProvince = async (e: string) => {
  console.log("handlerChangeProvince", e);
  if (e) {
    isLoading.value = true;
    await loadDistrict(e);
    console.log(addrDistrict.value);
    isLoading.value = false;
  }
};
const handlerChangeDistrict = async (e: string) => {
  if (e) {
    isLoading.value = true;
    await loadSubDistrict(e);

    isLoading.value = false;
  }
};
const handlerChangeSubDistrict = async (e: string) => {
  if (e) {
    isLoading.value = true;
    await loadZipCode(e);
    isLoading.value = false;
  }
};
const handlerChangeFullAddress = (addr: string, ObjectAddress: DefaultAddress) => {
  if (ObjectAddress) {
    defaultAddress.value = ObjectAddress;
  }
  if (addr) {
    insureFullAddress.value = addr;
  }
};
const handleCheckCarDetail = async (objectCarDetail: CarDetailsExtension) => {
  if (objectCarDetail.License.length > 0 && objectCarDetail.LicenseProvinceID.length > 0 && objectCarDetail.ColorID.length > 0 && objectCarDetail.BodyNo.length > 0) {
    if(SubCarModel.value === 'unknown' || SubCarModel.value === 'other'){
      if(objectCarDetail.LicenseFileID.length > 0) checklist.value[0].className = 'current'
      else checklist.value[0].className = ''
    }
    else checklist.value[0].className = 'current'
  }
  else {
    checklist.value[0].className = ''
  }

  carDetail.value = objectCarDetail;
  // console.log('handleCheckCarDetail', carDetail.value)
};
const handleCheckInsuranceRecieve = async (RecieveObject: InsuranceRecieveObject) => {
  console.log('RecieveObject', RecieveObject)
  switch(RecieveObject.ShippingPolicy){
    case 'pdf':
      if(RecieveObject.Email.length > 0) checklist.value[2].className = 'current'
      else checklist.value[2].className = ''
      break
    case 'print':
      checklist.value[2].className = 'current'
      break
    case 'postal':
      if(RecieveObject.PostalDelivary?.IsDeliveryAddressSameAsDefault) {
        if(RecieveObject.PostalDelivary?.ShippingMethod.length > 0) checklist.value[2].className = 'current'
        else checklist.value[2].className = ''
      }
      else {
        let deliveryAddress = RecieveObject.PostalDelivary?.DeliveryAddress
        if(deliveryAddress && RecieveObject.PostalDelivary?.ShippingMethod != '') {
          if(deliveryAddress.AddressText.length > 0
            && deliveryAddress.PhoneNumber.length > 0
            && deliveryAddress.FirstName.length > 0
            && deliveryAddress.LastName.length > 0
            && deliveryAddress.No.length > 0
            && deliveryAddress.ProvinceID.length > 0
            && deliveryAddress.DistrictID.length > 0
            && deliveryAddress.SubDistrictID.length > 0) {
              checklist.value[2].className = 'current'
            }
            else checklist.value[2].className = ''
        }
        else checklist.value[2].className = ''
      }
      break
  }
  insuranceRecieve.value = RecieveObject;
};
const handlerChangeInsureDetail = (InsureDetail: CustomerOrderRequest) => {
  insureDetail.value = InsureDetail;
};
// Define layout
const layout = "monito";

// Define meta seo
useHead({
  title: "Compulsory ข้อมูลสั่งซื้อ",
  meta: [{ name: "description", content: "Compulsory ข้อมูลสั่งซื้อ" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-placeholder",
  },
});
</script>
