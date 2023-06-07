<template>
  <NuxtLayout :name="layout">
    <!-- Content -->
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">
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

          <ElementsModalAlert v-if="isError" :message="messageError" />
          <div class="card" v-for="item in packageList" v-bind:key="item.RefCompanyID" v-else>
            <div class="card-body">
              <div class="package-item">
                <figure class="brand">
                  <img :src="getCompanyPath(item.PackageResult[0].CompanyImage)" alt="" />
                </figure>

                <div class="detail">
                  <h4 class="topic">
                    พ.ร.บ. สำหรับรถยนต์นั่ง{{ item.PackageResult[0].UseCarName }}
                  </h4>
                  <div class="tags">
                    <span class="badge">{{ item.CompanyName }}</span>
                    <span class="badge-bg-success" v-if="item.IsOnlineActive"><i
                        class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span>
                    <span class="badge-bg-orange" v-else><i class="fa-solid fa-clock-four"></i>ได้กรมธรรม์ 1-3
                      วันทำการ</span>
                    <span class="badge-secondary"><i class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span>
                  </div>
                  <div class="more">
                    <a class="fa-icon" href="#" data-bs-toggle="modal"
                      data-bs-target="#ModalCoverage">คลิกดูรายละเอียด</a>
                  </div>
                </div>

                <div class="price">
                  <span class="actual-price">{{
                    getCurrency(item.PackageResult[0].PriceACT)
                  }}</span>
                  <span class="promotion">ค่าส่งเสริมการขาย
                    {{ getCurrency(item.PackageResult[0].AgentComDiscount) }} บาท</span>
                </div>

                <div class="action">
                  <a class="btn-primary" @click="getPackageItem(item)">
                    เลือกแพ็กเกจนี้
                  </a>
                  <span v-show="item.CountOfPolicy > 0">ขายแล้ว {{ item.CountOfPolicy }} งาน</span>
                </div>
              </div>
            </div>
          </div>
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
              <OrderCartPackage></OrderCartPackage>
              <!-- <OrderCart v-if="packageSelect && packageSelect.CompanyName != ''" :is-online="packageSelect.IsOnlineActive"
                :company-name="packageSelect.CompanyName"
                :company-image="getCompanyPath(packageSelect.PackageResult[0].CompanyImage)"
                :price="getCurrency(packageSelect.PackageResult[0].PriceACT)" :price-discount="getCurrency(packageSelect.PackageResult[0].PriceACTDiscount)
                  " :car-name="packageSelect.PackageResult[0].UseCarName" /> -->

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
import { IPackageRequest, IPackageResponse } from "~~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

let carDetail = ref("");
const isError = ref(false);
const messageError = ref("");
const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const isSelect: globalThis.Ref<Boolean> = ref(false);

const router = useRouter();
const values = reactive({});
const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: '1',
    className: '',
    desc: 'เลือกแพ็กเกจ'
  },
])

// init event
const onInit = async () => {
  //define store
  const storeAuth = useStoreUserAuth();
  // define getter in store
  const { AuthenInfo } = storeToRefs(storeAuth);

  isSelect.value = false;

  // check login
  if (AuthenInfo.value) {
    const info = JSON.parse(sessionStorage.getItem("useStoreInformation") || "") as
      | IInformation
      | undefined;
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
      };
      const data = await store.getPackageList(request);

      if (data && data.Data) {
        packageList.value = data.Data;
      } else if (data.ErrorMessage && data.ErrorMessage != "") {
        console.log(data.ErrorMessage)
        isError.value = true;
        messageError.value = data.ErrorMessage ? data.ErrorMessage : "";
      }
    } else {
      router.push("/order/compulsory/information");
    }
  } else {
    router.push("/login");
  }
};
// onmounted loading page
const onLoad = onMounted(async () => {
  await onInit();
});

// company path function
const getCompanyPath = (CompanyImage: string): string => {
  const image = useUtility().getCompanyImage() + CompanyImage.replace("LOGO", "logo");
  console.log(image);
  return image;
};
const getCurrency = (currency: number): string => {
  const formatCurrency = useUtility().getCurrency(currency);
  console.log(formatCurrency);
  return formatCurrency;
};
const getPackageItem = (item: IPackageResponse) => {
  isSelect.value = true;
  packageSelect.value = item;

  if (!packageSelect.value) {
    checklist.value[0].className = ""
  }
  else {
    checklist.value[0].className = "current"
  }

};
// Submit form event
const submitOrder = async (formData: any) => {
  console.log(
    "%cOrder%cformData",
    "color:#fffbackground:#ee6f57padding:3pxborder-radius:2px",
    "color:#fffbackground:#1f3c88padding:3pxborder-radius:2px",
    "color:#fffbackground:rgb(222, 125, 44)padding:3pxborder-radius:2px",
    formData
  );

  const response = await useCallApi().get({
    URL: "/Agent/user/check",
    AgentCode: formData.username,
    IDCard: formData.idcard,
  });

  statusMessage.value = response.statusMessage;
  statusMessageType.value = response.statusMessageType;
  submitted.value = false; // Form submitted status

  const router = useRouter();
  router.push("/order/compulsory/placeorder");
};

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
