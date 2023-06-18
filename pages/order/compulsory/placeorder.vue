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
            :car-color="carColor"
            :car-province="carProvince"
            :info="infomation"
          ></OrderCompulsoryPlaceorderCarDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้เอาประกันภัย # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsureDetail
            @change-province="handlerChangeProvince"
            @change-district="handlerChangeDistrict"
            @change-sub-district="handlerChangeSubDistrict"
            @change-customer-type="handlerChangeCustomerType"
            :prefix="prefix"
            :addr-province="addrProvince"
            :addr-district="addrDistrict"
            :addr-sub-district="addrSubDistrict"
            :addr-zip-code="addrZipCode"
            :insure-full-address="insureFullAddress"
          ></OrderCompulsoryPlaceorderInsureDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # วิธีการรับกรมธรรม์ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsuranceRecieve @change-province="handlerChangeProvince"
            @change-district="handlerChangeDistrict"
            @change-sub-district="handlerChangeSubDistrict"
            :insure-full-address="insureFullAddress"
            :prefix="prefix"
            :addr-province="addrProvince"
            :addr-district="addrDistrict"
            :addr-sub-district="addrSubDistrict"
            :addr-zip-code="addrZipCode"></OrderCompulsoryPlaceorderInsuranceRecieve>

          <!-- # # # # # # # # # # # # # # # # # # # # # ใบกำกับภาษี # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderTaxInvoice></OrderCompulsoryPlaceorderTaxInvoice>
        </div>

        <!-- # # # # # # # # # # # # # # # # # # # # # Right Slide Bar # # # # # # # # # # # # # # # # # # # # #-->
        <div class="col-lg-4 col-xl-3">
          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">
              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลรถ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartCar></OrderCartCar>

              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลแพคเกจ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartPackage></OrderCartPackage>
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
            :disabled="submitted"
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

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const infomation: globalThis.Ref<IInformation | undefined> = ref();
const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const carProvince: globalThis.Ref<SelectOption[]> = ref([]);
const carColor: globalThis.Ref<SelectOption[]> = ref([]);
const prefix: globalThis.Ref<SelectOption[]> = ref([]);
const addrProvince: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCode = ref("");
const delivery: globalThis.Ref<SelectOption[]> = ref([]);
const insureFullAddress:globalThis.Ref<string> = ref('');
const isSelect: globalThis.Ref<Boolean> = ref(false);

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
const { InformationInfo } = storeToRefs(storeInfo);

//define store
const storePackage = useStorePackage();
// define getter in store
const { PackageInfo } = storeToRefs(storePackage);

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    const jsonInfo = sessionStorage.getItem("useStoreInformation") || "";
    if (jsonInfo != ""){
      infomation.value = JSON.parse(jsonInfo) as IInformation;
    }
    if (PackageInfo.value && InformationInfo.value) {
      isLoading.value = true;
      await loadProvince();
      await loadCarColor();
      await loadDelivery();
      await loadPrefix(true);
      isLoading.value = false;
    } else {
      router.push("/order/compulsory/packages");
    }
  } else {
    router.push("/login");
  }
});
// Submit form event
const submitOrder = async (formData: any) => {
  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000));
};
// handle loading api & set refs
const loadPrefix = async (isPerson:boolean) => {
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
const loadDelivery = async()=>{
  const response = await useRepository().delivery.channel();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      delivery.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
          option:x.Cost.toString()
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
}
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
const handlerChangeCustomerType = async (e: string)=>{
  console.log("handlerChangeCustomerType", e);
  if(e){
    isLoading.value = true
    await loadPrefix(e=="person")
    console.log(prefix)
    isLoading.value = false
  }
}
const handlerChangeProvince = async (e: string) => {
  console.log("handlerChangeProvince", e);
  if (e) {
    isLoading.value = true;
    await loadDistrict(e);
    console.log(addrDistrict.value)
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
const hnadlerChangeInsureFullAddress = async (addr:string)=>{
  if(addr){

  }
}
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
