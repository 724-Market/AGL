<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
    <!-- Content -->
    <FormKit
      type="form"
      @submit="submitOrder"
      :actions="false"
      id="form-order"
      form-class="form-order form-theme"
      :incomplete-message="false"
    >
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <div class="card">
            <div class="card-body">
              <div class="summary-detail">
                <header class="topic">
                  <h5 class="label"><i class="fa-duotone fa-car"></i>ข้อมูลรถของท่าน:</h5>
                  <h6 class="detail">{{ carDetail }}</h6>
                </header>
                <div class="meta">
                  <NuxtLink class="edit fa-icon" to="information">แก้ไข</NuxtLink>
                  <div class="validate is-success">
                    <i class="fa-solid fa-circle-check"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OrderCompulsoryPackagesList
            :is-loading="isLoading"
            :checklist="checklist"
            :is-error="isError"
            :message-error="messageError"
            :package-list="packageList"
            :pages="paging"
            @change-checklist="handlerCheckList"
            @change-select="handlerSelect"
            @change-page="handlerChangePage"
          ></OrderCompulsoryPackagesList>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3">
          <aside class="card">
            <!-- <div class="card-header" v-show="packageSelect && packageSelect.CompanyName != ''"> -->
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">
              <OrderCartCar
                v-if="informationSelect"
                :car-detail="informationSelect.CarDetail"
                :car-use="informationSelect.CarUse"
                :is-car-red="false"
                :effective-date="informationSelect.EffectiveDate"
                :expire-date="informationSelect.ExpireDate"
                :insurance-day="informationSelect.InsuranceDay"
              ></OrderCartCar>
              <!-- <OrderCartPackage></OrderCartPackage> -->
              <OrderCartPackage
                v-if="packageSelect && packageSelect.CompanyName != ''"
                :package-select="packageSelect"
              />
            </div>

            <OrderChecklist :list="checklist" />
          </aside>

          <FormKit
            type="submit"
            label="ไปกรอกข้อมูลสั่งซื้อ"
            name="order-submit"
            id="order-submit"
            :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }"
            :disabled="!isSelect"
            :loading="isLoading"
          />

          <NuxtLink @click="backStep()" class="btn btn-back">ย้อนกลับ</NuxtLink>
        </div>
      </div>
    </FormKit>
    <OrderCoverageDetail />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Define import
import { IInformation } from "~~/shared/entities/information-entity";
import { IChecklist } from "~/shared/entities/checklist-entity";
import {
  IPackageRequest,
  IPackageResponse,
  PackageResult,
  Paging,
} from "~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStoreInformation } from "~/stores/order/storeInformation";

// using pinia
import { storeToRefs } from "pinia";
import { AgentInfo } from "~/shared/entities/agent-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(true);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

let carDetail = ref("");
const isError = ref(false);
const messageError = ref("");

const paging: globalThis.Ref<Paging> = ref({
  Length: 5,
  Page: 1,
  TotalRecord: 0,
  RedirectUrl: "/order/compulsory/packages",
});
const isSelect: globalThis.Ref<Boolean> = ref(false);
const router = useRouter();
const route = useRoute();
const values = reactive({});
const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "เลือกแพ็กเกจ",
  },
]);
const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
//define store
const storeAuth = useStoreUserAuth();
const storePackage = useStorePackage();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const {PackageInfo} = storeToRefs(storePackage);




//define store
const storeInfo = useStoreInformation();
// define getter in store
const informationSelect: globalThis.Ref<IInformation | undefined> = ref();
// init event
const onInit = async () => {
  isLoading.value = true;
  // define parameter page
  const page = useUtility().getPaging(paging.value);
  paging.value = page;
  //console.log(InformationInfo.value)
  // check login
  if (AuthenInfo.value) {
    await showPackageList();
   
  if(PackageInfo && PackageInfo.value && PackageInfo.value.CompanyCode != ''){
    await handlerSelect(true, PackageInfo.value)
  }
    

  } else {
    isLoading.value = false;

    router.push("/login");
  }
};
const showPackageList = async () => {
  isLoading.value = true;
  if (AuthenInfo.value) {
    const json = sessionStorage.getItem("useStoreInformation") || "";
    if (json != "") {
      const info = JSON.parse(json) as IInformation | undefined;
      // check information package
      if (info) {
        informationSelect.value = info;
        // Get Package List
        const store = useStorePackageList();
        // set car detail
        isError.value = false;
        messageError.value = "";
        carDetail.value = info.CarDetail;

        const request: IPackageRequest = {
          AgentCode: AuthenInfo.value.userName,
          CarBrandID: info.CarBrand,
          CarCategoryID: info.CarSize,
          CarModelID: info.CarModel,
          CarSalesYear: info.CarYear,
          CarTypeCode: info.CarType,
          EffectiveDate: info.EffectiveDate,
          EffectiveType: info.EffectiveType,
          ExpireDate: info.ExpireDate.split("/").reverse().join("-"),
          SubCarModelID: info.SubCarModel.split("|")[0],
          UseCarCode: info.CarUse,
          Paging: paging.value,
        };
        
        const data = await store.getPackageList(request);

        if (data && data.Data) {
          // set default value
          const packages = useDefaulValue().setDefaultPackageListValue(data.Data);
          isLoading.value = false;
          packageList.value = packages;
          // define parameter page
          if (data.Pagination) {
            const page = useUtility().getPaging(data.Pagination.Paging);
            paging.value = page;
          }
        } else if (data.ErrorMessage && data.ErrorMessage != "") {
          isLoading.value = false;
          isError.value = true;
          messageError.value = data.ErrorMessage ? data.ErrorMessage : "";
          if(data.ErrorMessage.split(' ')[0] == 'Effective') router.push("/order/compulsory/information");
        }
      } else {
        isLoading.value = false;
        router.push("/order/compulsory/information");
      }
    } else {
      isLoading.value = false;
      router.push("/order/compulsory/information");
    }

    //isLoading.value = false
  }
};
const backStep = async () => {
    useStateMenu().setStateMenu(1);
    router.push('/order/compulsory/information');
}
// onmounted loading page
const onLoad = onMounted(async () => {
  await onInit();
});
const handlerCheckList = (_checklist: IChecklist[]) => {
  checklist.value = _checklist;
};
const handlerSelect = (select: Boolean, item: IPackageResponse) => {
  isSelect.value = select;
  packageSelect.value = item;
  checklist.value[0].className='current'
};
const handlerChangePage = async (page: number, lengthPage: number) => {
  if (page != -1) {
    const _page = useUtility().getPaging(paging.value);
    _page.Length = lengthPage;
    _page.Page = page;
    paging.value = _page;
    await showPackageList();
  }
};
// Submit form event
const submitOrder = async (formData: any) => {
  //define store
  const storePackage = useStorePackage();
  isLoading.value = true
  console.log(
    "%cOrder%cformData",
    "color:#fffbackground:#ee6f57padding:3pxborder-radius:2px",
    "color:#fffbackground:#1f3c88padding:3pxborder-radius:2px",
    "color:#fffbackground:rgb(222, 125, 44)padding:3pxborder-radius:2px",
    formData
  );

  if (packageSelect.value) {
    if(AuthenInfo.value){
      packageSelect.value.AgentCode = AuthenInfo.value.userName
    }
    
    let packageSelectT: IPackageResponse = {
      RefCompanyID: packageSelect.value.RefCompanyID,
      CompanyCode: packageSelect.value.CompanyCode,
      CompanyName: packageSelect.value.CompanyName,
      CarTypeName: packageSelect.value.CarTypeName,
      DayPolicy: packageSelect.value.DayPolicy,
      DayWholeYear: packageSelect.value.DayWholeYear,
      Rate: packageSelect.value.Rate,
      Cost: packageSelect.value.Cost,
      Vat: packageSelect.value.Vat,
      Duty: packageSelect.value.Duty,
      IsOnlineActive: packageSelect.value.IsOnlineActive,
      CountOfPolicy: packageSelect.value.CountOfPolicy,
      Price: packageSelect.value.Price,
      PackageResult: packageSelect.value.PackageResult,
      IsTaxInclude: packageSelect.value.IsTaxInclude,
      Paper: packageSelect.value.Paper,
      PaperBalance: packageSelect.value.PaperBalance,
      AgentCode: packageSelect.value.AgentCode
    }
    console.log('packageSelectT', packageSelectT)
    storePackage.setPackage(packageSelectT);

    submitted.value = false; // Form submitted status
    isLoading.value = false
      // set state menu
      useStateMenu().setStateMenu(3);

    router.push("/order/compulsory/placeorder");
  }
};
const loadAgentInfo = async (): Promise<AgentInfo[]> => {
  let data: AgentInfo[] = [];
  const response = await useRepository().agent.GetLicense();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      data = response.apiResponse.Data;
    } else {
      // data not found
    }
  } else {
  }
  return data;
};
// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = true
const showPageHeader = true

// Define page meta
const pageTitle = 'เลือกแพ็คเกจ'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = 'Compulsory เลือกแพ็คเกจ'
// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content:pageDescription  }],
  bodyAttrs: {
    class: "page-order category-compulsory single-packages",
  },
});
</script>
