<template>
  <NuxtLayout :name="layout">
    <!-- Content -->
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      :incomplete-message="false">
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
          <OrderCompulsoryPackagesList :is-loading="isLoading" :checklist="checklist" :is-error="isError"
            :message-error="messageError" :package-list="packageList" :pages="paging" @change-checklist="handlerCheckList"
            @change-select="handlerSelect" @change-page="handlerChangePage"></OrderCompulsoryPackagesList>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3">
          <aside class="card">
            <!-- <div class="card-header" v-show="packageSelect && packageSelect.CompanyName != ''"> -->
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">
              <OrderCartCar></OrderCartCar>
              <!-- <OrderCartPackage></OrderCartPackage> -->
              <OrderCartPackage v-if="packageSelect && packageSelect.CompanyName != ''" :package-select="packageSelect" />
            </div>

            <OrderChecklist :list="checklist" />
          </aside>

          <FormKit type="submit" label="ไปกรอกข้อมูลสั่งซื้อ" name="order-submit" id="order-submit" :classes="{
            input: 'btn-primary',
            outer: 'form-actions',
          }" :disabled="!isSelect" :loading="isLoading" />

          <NuxtLink to="information" class="btn btn-back">ย้อนกลับ</NuxtLink>
        </div>
      </div>
    </FormKit>
    <OrderCoverageDetail />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Define import
import { IInformation } from "~~/shared/entities/information-entity";
import {
  IPackageRequest,
  IPackageResponse,
  Paging,
} from "~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~/shared/entities/checklist-entity";

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
  Length: 2,
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
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
// init event
const onInit = async () => {
  isLoading.value = true
  // define parameter page
  const page = useUtility().getPaging(paging.value);
  paging.value = page;
  console.log(page);
  // check login
  if (AuthenInfo.value) {
    await showPackageList();
  } else {
    isLoading.value = false;

    router.push("/login");
  }
};
const showPackageList = async () => {
  isLoading.value = true
  if (AuthenInfo.value) {
    const json = sessionStorage.getItem("useStoreInformation") || "";
    if (json != "") {
      const info = JSON.parse(json) as IInformation | undefined;
      // check information package
      if (info) {
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
        console.log(request);
        const data = await store.getPackageList(request);

        if (data && data.Data) {
          isLoading.value = false;
          packageList.value = data.Data;
          // define parameter page
          if (data.Pagination) {
            const page = useUtility().getPaging(data.Pagination.Paging);
            paging.value = page;
          }
        } else if (data.ErrorMessage && data.ErrorMessage != "") {
          isLoading.value = false;
          console.log(data.ErrorMessage);
          isError.value = true;
          messageError.value = data.ErrorMessage ? data.ErrorMessage : "";
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
// onmounted loading page
const onLoad = onMounted(async () => {
  await onInit();
});
const handlerCheckList = (_checklist: IChecklist[]) => {
  checklist.value = _checklist;
};
const handlerSelect = (select: Boolean, item: IPackageResponse) => {
  console.log(select, item)
  isSelect.value = select;
  packageSelect.value = item
};
const handlerChangePage = async (page: number, lengthPage: number) => {
  console.log(page, lengthPage)
  if (page != -1) {
    const _page = useUtility().getPaging(paging.value);
    _page.Length = lengthPage
    _page.Page = page
    paging.value = _page
    await showPackageList();
  }

}
// Submit form event
const submitOrder = async (formData: any) => {
  console.log(
    "%cOrder%cformData",
    "color:#fffbackground:#ee6f57padding:3pxborder-radius:2px",
    "color:#fffbackground:#1f3c88padding:3pxborder-radius:2px",
    "color:#fffbackground:rgb(222, 125, 44)padding:3pxborder-radius:2px",
    formData
  );

  // const response = await useCallApi().get({
  //   URL: "/Agent/user/check",
  //   AgentCode: formData.username,
  //   IDCard: formData.idcard,
  // });

  // statusMessage.value = response.statusMessage;
  // statusMessageType.value = response.statusMessageType;
  submitted.value = false; // Form submitted status

  router.push("/order/compulsory/placeorder");
};
//watching check change paging
// watch(
//   () => route.query.currentPage, // Specify the query parameter to watch
//   async (newVal, oldVal) => {
//     // Handle the updated value
//     console.log("Query parameter updated:", newVal);

//     const page = useUtility().getPaging(paging.value);
//     paging.value = page;

//     await showPackageList();
//   }
// );
// Define layout
const layout = "monito";

// Define meta seo
useHead({
  title: "Compulsory เลือกแพ็คเกจ",
  meta: [{ name: "description", content: "Compulsory เลือกแพ็คเกจ" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-packages",
  },
});
</script>
